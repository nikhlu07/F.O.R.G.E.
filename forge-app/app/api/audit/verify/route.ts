import { NextResponse } from 'next/server';

const MIRROR_BASES: Record<string, string> = {
  mainnet: 'https://mainnet-public.mirrornode.hedera.com/api/v1',
  testnet: 'https://testnet.mirrornode.hedera.com/api/v1',
  previewnet: 'https://previewnet.mirrornode.hedera.com/api/v1',
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const transactionId = url.searchParams.get('transactionId');
    const topicId = url.searchParams.get('topicId') || process.env.HCS_TOPIC_ID;
    const network = process.env.HEDERA_NETWORK || 'testnet';

    if (!transactionId) {
      return NextResponse.json({ ok: false, error: 'Missing transactionId query param' }, { status: 400 });
    }
    if (!topicId) {
      return NextResponse.json({ ok: false, error: 'Missing topicId (query or env)' }, { status: 400 });
    }

    const base = MIRROR_BASES[network] || MIRROR_BASES['testnet'];
    const mirrorUrl = `${base}/topics/${topicId}/messages?transaction_id=${encodeURIComponent(transactionId)}`;

    const res = await fetch(mirrorUrl, { cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, error: `Mirror node error: ${res.status} ${text}` }, { status: 502 });
    }

    const data = await res.json();
    const message = Array.isArray(data?.messages) ? data.messages[0] : undefined;

    return NextResponse.json({
      ok: true,
      network,
      topicId,
      transactionId,
      mirrorUrl,
      verified: Boolean(message),
      consensusTimestamp: message?.consensus_timestamp,
      sequenceNumber: message?.sequence_number,
      runningHash: message?.running_hash,
      chunkInfo: message?.chunk_info,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
  }
}