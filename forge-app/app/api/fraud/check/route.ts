import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple in-memory store for demo duplicate detection
declare global {
  // eslint-disable-next-line no-var
  var __seenInvoices: Set<string> | undefined;
}
const seenInvoices = (globalThis.__seenInvoices ||= new Set<string>());

interface CheckBody {
  vendorId: string;
  amount: number;
  invoiceId: string;
  budget?: number; // allowed max
  registeredVendors?: string[]; // list of known vendor IDs
  attachment?: { storage: "pinata" | "hfs"; cid?: string; fileId?: string; name?: string };
}

export async function POST(req: Request) {
  let body: CheckBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { vendorId, amount, invoiceId, budget = 100000, registeredVendors = [], attachment } = body || {};
  const findings: { rule: string; severity: "info" | "warn" | "error"; detail: string }[] = [];

  // Rule 1: Amount exceeds budget
  if (typeof amount === "number" && typeof budget === "number" && amount > budget) {
    findings.push({ rule: "amount_exceeds_budget", severity: "error", detail: `amount ${amount} > budget ${budget}` });
  }

  // Rule 2: Duplicate invoice ID
  if (invoiceId) {
    if (seenInvoices.has(invoiceId)) {
      findings.push({ rule: "duplicate_invoice_id", severity: "error", detail: `invoice ${invoiceId} seen before` });
    } else {
      seenInvoices.add(invoiceId);
    }
  }

  // Rule 3: Vendor not registered
  if (vendorId && registeredVendors.length > 0 && !registeredVendors.includes(vendorId)) {
    findings.push({ rule: "unregistered_vendor", severity: "warn", detail: `vendor ${vendorId} not found in registry` });
  }

  // Rule 4: Attachment presence
  if (!attachment || !(attachment.cid || attachment.fileId)) {
    findings.push({ rule: "missing_attachment", severity: "warn", detail: "no file uploaded or reference missing" });
  }

  const score = findings.reduce((acc, f) => acc + (f.severity === "error" ? 50 : f.severity === "warn" ? 25 : 0), 0);
  const decision = score >= 50 ? "reject" : score >= 25 ? "review" : "approve";

  return NextResponse.json({ decision, score, findings });
}