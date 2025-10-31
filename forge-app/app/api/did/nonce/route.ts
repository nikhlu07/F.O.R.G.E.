import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Global in-memory nonce store for demo purposes
// In production, replace with Redis or database-backed storage.
declare global {
  var __didNonceStore: Map<string, string> | undefined;
}

const nonceStore = (globalThis.__didNonceStore ||= new Map<string, string>());

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const did = searchParams.get("did");

  if (!did) {
    return NextResponse.json({ error: "missing 'did' query parameter" }, { status: 400 });
  }

  // Generate random nonce
  const nonce = crypto.randomUUID();
  nonceStore.set(did, nonce);

  return NextResponse.json({ did, nonce });
}