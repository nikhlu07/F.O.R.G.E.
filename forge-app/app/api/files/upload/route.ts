import { NextResponse } from "next/server";
import { Client, FileCreateTransaction } from "@hashgraph/sdk";

export const runtime = "nodejs";

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

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  const isMultipart = contentType.includes("multipart/form-data");
  if (!isMultipart) {
    return NextResponse.json({ error: "content-type must be multipart/form-data" }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const name = String(formData.get("name") || "file");
  const description = String(formData.get("description") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const size = arrayBuffer.byteLength;

  // Try Pinata first if configured
  const pinataJwt = process.env.PINATA_JWT;
  if (pinataJwt) {
    try {
      const pinForm = new FormData();
      pinForm.append("file", new Blob([arrayBuffer]), name);
      pinForm.append("pinataMetadata", new Blob([JSON.stringify({ name, keyvalues: { description } })], { type: "application/json" }));
      pinForm.append("pinataOptions", new Blob([JSON.stringify({ cidVersion: 1 })], { type: "application/json" }));

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: { Authorization: `Bearer ${pinataJwt}` },
        body: pinForm,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Pinata upload failed");
      return NextResponse.json({ storage: "pinata", cid: data.IpfsHash, size, name, description, url: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}` });
    } catch (err) {
      // fall through to API key/secret or HFS
    }
  }

  // Support Pinata API key/secret auth as a fallback
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataApiSecret = process.env.PINATA_SECRET_API_KEY;
  if (pinataApiKey && pinataApiSecret) {
    try {
      const pinForm = new FormData();
      pinForm.append("file", new Blob([arrayBuffer]), name);
      pinForm.append("pinataMetadata", new Blob([JSON.stringify({ name, keyvalues: { description } })], { type: "application/json" }));
      pinForm.append("pinataOptions", new Blob([JSON.stringify({ cidVersion: 1 })], { type: "application/json" }));

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret,
        },
        body: pinForm,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Pinata upload failed");
      return NextResponse.json({ storage: "pinata", cid: data.IpfsHash, size, name, description, url: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}` });
    } catch (err) {
      // fall through to HFS
    }
  }

  // Fallback: store small files on HFS
  if (size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "file too large and Pinata not configured" }, { status: 400 });
  }

  const client = getClient();
  if (!client) {
    return NextResponse.json({ error: "Hedera client not configured and Pinata not available" }, { status: 500 });
  }

  const tx = await new FileCreateTransaction()
    .setKeys([]) // public file
    .setContents(Buffer.from(arrayBuffer))
    .freezeWith(client)
    .execute(client);
  const receipt = await tx.getReceipt(client);
  const fileId = receipt.fileId?.toString();

  return NextResponse.json({ storage: "hfs", fileId, size, name, description });
}