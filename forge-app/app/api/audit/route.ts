import { NextResponse } from 'next/server';
import { Client, TopicMessageSubmitTransaction, TopicId, PrivateKey, AccountId } from '@hashgraph/sdk';

function getClient() {
  const network = process.env.HEDERA_NETWORK || 'testnet';
  const accountId = process.env.HEDERA_ACCOUNT_ID;
  const privateKey = process.env.HEDERA_PRIVATE_KEY;

  if (!accountId || !privateKey) {
    throw new Error('Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY env vars');
  }

  const client = network === 'mainnet' ? Client.forMainnet() : Client.forTestnet();
  client.setOperator(AccountId.fromString(accountId), PrivateKey.fromString(privateKey));
  return client;
}

export async function POST(req: Request) {
  try {
    const client = getClient();
    const topicIdStr = process.env.HCS_TOPIC_ID;
    if (!topicIdStr) {
      return NextResponse.json({ error: 'Missing HCS_TOPIC_ID env var' }, { status: 500 });
    }

    const topicId = TopicId.fromString(topicIdStr);
    const body = await req.json().catch(() => ({}));

    const payload = {
      ...body,
      serverTimestamp: new Date().toISOString(),
    };

    const txResponse = await new TopicMessageSubmitTransaction()
      .setTopicId(topicId)
      .setMessage(JSON.stringify(payload))
      .execute(client);

    const receipt = await txResponse.getReceipt(client);
    const transactionId = txResponse.transactionId.toString();
    const topicSequenceNumber = receipt.topicSequenceNumber ? receipt.topicSequenceNumber.toString() : undefined;
    const status = receipt.status.toString();

    // Maintain backward-compatible keys for Python engine
    const record_id = topicSequenceNumber ? `hedera_seq_${topicSequenceNumber}` : `hedera_${transactionId}`;
    const transaction_hash = transactionId;

    return NextResponse.json({
      ok: true,
      status,
      topicId: topicId.toString(),
      transactionId,
      topicSequenceNumber,
      record_id,
      transaction_hash,
      payload,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}