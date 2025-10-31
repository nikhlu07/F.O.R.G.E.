import { NextResponse } from "next/server";
import {
  Client,
  TopicMessageSubmitTransaction,
} from "@hashgraph/sdk";

export const runtime = "nodejs";

interface TransferBody {
  from: string; // e.g., "central", "state", "district", "vendor:<id>"
  to: string;   // same format
  amount: number; // nominal units (e.g., ForgeUSD)
  tokenId?: string; // optional HTS token id if available
  memo?: string; // optional memo
}

function getClient() {
  const operatorId = process.env.HEDERA_ACCOUNT_ID;
  const operatorKey = process.env.HEDERA_PRIVATE_KEY;
  const network = process.env.HEDERA_NETWORK || "testnet";
  if (!operatorId || !operatorKey) return null;
  try {
    const client = Client.forName(network);
    client.setOperator(operatorId, operatorKey);
    return client;
  } catch {
    return null;
  }
}

async function submitHcs(message: string) {
  const topicId = process.env.HCS_TOPIC_ID;
  if (!topicId) throw new Error("HCS_TOPIC_ID not configured");
  const client = getClient();
  if (!client) throw new Error("Hedera client not available");
  const tx = await new TopicMessageSubmitTransaction({ topicId, message }).execute(client);
  const receipt = await tx.getReceipt(client);
  return { transactionId: tx.transactionId.toString(), topicId, status: receipt.status.toString() };
}

export async function POST(req: Request) {
  let body: TransferBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { from, to, amount, tokenId, memo } = body || {};
  if (!from || !to || typeof amount !== "number") {
    return NextResponse.json({ error: "missing required fields: from, to, amount" }, { status: 400 });
  }

  // For hackathon: record the intent on HCS for audit, with fallback if HTS not available
  const payload = {
    type: "fund_transfer_intent",
    from,
    to,
    amount,
    tokenId: tokenId || process.env.TOKEN_ID || null,
    memo: memo || "",
    timestamp: Date.now(),
  };

  try {
    const res = await submitHcs(JSON.stringify(payload));
    const hashscanUrl = `https://hashscan.io/${process.env.HEDERA_NETWORK || "testnet"}/topic/${res.topicId}`;
    return NextResponse.json({
      status: "recorded",
      transactionId: res.transactionId,
      topicId: res.topicId,
      hashscanUrl,
      payload,
    });
  } catch (err) {
    return NextResponse.json({
      status: "mocked",
      error: String(err),
      payload,
    }, { status: 200 });
  }
}