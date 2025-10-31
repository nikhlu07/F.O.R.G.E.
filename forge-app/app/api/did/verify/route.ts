import { NextResponse } from "next/server";
import { PublicKey } from "@hashgraph/sdk";

export const runtime = "nodejs";

// Shared in-memory nonce store from the nonce endpoint
declare global {
  var __didNonceStore: Map<string, string> | undefined;
}

const nonceStore = (globalThis.__didNonceStore ||= new Map<string, string>());

interface VerifyBody {
  did: string;                // e.g., did:pkh:hedera:testnet:0.0.12345 or did:key:...
  publicKey: string;          // Hedera public key in string form (DER-encoded for Ed25519)
  signatureBase64: string;    // Signature of the nonce in base64
}

export async function POST(req: Request) {
  let body: VerifyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { did, publicKey, signatureBase64 } = body || {};
  if (!did || !publicKey || !signatureBase64) {
    return NextResponse.json({ error: "missing required fields: did, publicKey, signatureBase64" }, { status: 400 });
  }

  const nonce = nonceStore.get(did);
  if (!nonce) {
    return NextResponse.json({ error: "nonce not found for DID; request a nonce first" }, { status: 400 });
  }

  try {
    const pk = PublicKey.fromString(publicKey);
    const message = new TextEncoder().encode(nonce);
    const signature = Buffer.from(signatureBase64, "base64");

    const verified = pk.verify(message, signature);
    if (!verified) {
      return NextResponse.json({ verified: false, error: "signature verification failed" }, { status: 401 });
    }

    // Clear the nonce after use
    nonceStore.delete(did);

    // Create a short-lived demo session token; in production issue a JWT
    const authToken = `did-session:${did}:${Date.now()}`;

    return NextResponse.json({ verified: true, did, authToken });
  } catch (err) {
    return NextResponse.json({ verified: false, error: String(err) }, { status: 500 });
  }
}