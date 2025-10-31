"use client";

import { useState } from "react";

type TransferResult = {
  status: string;
  transactionId?: string;
  topicId?: string;
  hashscanUrl?: string;
  payload?: Record<string, unknown>;
  error?: string;
};

export default function FlowOrchestrator() {
  const [step, setStep] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const [vendorId, setVendorId] = useState("vendor-001");
  const [amount, setAmount] = useState<number>(1000);
  const [invoiceId, setInvoiceId] = useState("INV-001");
  const [fileRef, setFileRef] = useState<{ storage: "pinata" | "hfs"; cid?: string; fileId?: string; name?: string } | null>(null);
  const [findings, setFindings] = useState<{ decision: string; score: number; findings?: Array<{ rule: string; detail: string }> } | null>(null);

  const appendLog = (msg: string) => setLog((l) => [msg, ...l]);

  async function transfer(from: string, to: string, amt: number, memo?: string): Promise<TransferResult> {
    const res = await fetch("/api/flow/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, amount: amt, memo }),
    });
    const data = await res.json();
    if (data.hashscanUrl) appendLog(`Transfer intent recorded: ${data.hashscanUrl}`);
    else appendLog(`Transfer mocked: ${data.status}`);
    return data;
  }

  async function uploadFile(file: File, name: string, description: string) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("name", name);
    fd.append("description", description);
    const res = await fetch("/api/files/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.storage === "pinata") {
      appendLog(`Pinned to IPFS: ${data.cid}`);
      return { storage: "pinata" as const, cid: data.cid, name };
    }
    appendLog(`Stored on HFS: ${data.fileId}`);
    return { storage: "hfs" as const, fileId: data.fileId, name };
  }

  async function runFraudCheck() {
    const res = await fetch("/api/fraud/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendorId,
        amount,
        invoiceId,
        budget: 5000,
        registeredVendors: ["vendor-001", "vendor-002"],
        attachment: fileRef || undefined,
      }),
    });
    const data = await res.json();
    setFindings(data);
    appendLog(`Fraud decision: ${data.decision} (score ${data.score})`);
    return data;
  }

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-black/50 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-2xl font-bold text-white">Disbursement Flow</h3>
        <p className="text-gray-400">Central → State → District → Vendor</p>

        {/* Step 1: Central to State */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white">Step 1: Fund State</h4>
          <button
            onClick={async () => {
              await transfer("central", "state", 10000, "Fund State Budget");
              setStep(2);
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold"
          >
            Transfer 10,000 to State
          </button>
        </div>

        {/* Step 2: State to District */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white">Step 2: Fund District</h4>
          <button
            disabled={step < 2}
            onClick={async () => {
              await transfer("state", "district", 5000, "Fund District Operations");
              setStep(3);
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold disabled:opacity-50"
          >
            Transfer 5,000 to District
          </button>
        </div>

        {/* Step 3: Vendor selection & upload */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white">Step 3: Vendor Upload & Fraud Check</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400">Vendor</label>
              <select
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="vendor-001">Vendor 001</option>
                <option value="vendor-002">Vendor 002</option>
                <option value="vendor-XYZ">Vendor XYZ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Invoice ID</label>
              <input
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Attachment</label>
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const ref = await uploadFile(file, file.name, `Invoice ${invoiceId}`);
                  setFileRef(ref);
                }}
                className="w-full"
              />
              {fileRef && (
                <p className="text-xs text-gray-500 mt-1">
                  Stored via {fileRef.storage}: {fileRef.cid || fileRef.fileId}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={step < 3}
            onClick={async () => {
              await runFraudCheck();
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold disabled:opacity-50"
          >
            Run Fraud Check
          </button>

          {findings && (
            <div className="mt-4 border border-gray-800 rounded-lg p-3">
              <p className="text-white font-semibold">Decision: {findings.decision}</p>
              <p className="text-gray-400 text-sm">Score: {findings.score}</p>
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                {findings.findings?.map((f: { rule: string; detail: string }, idx: number) => (
                  <li key={idx}>{f.rule} – {f.detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Step 4: Release to Vendor */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white">Step 4: Release Funds to Vendor</h4>
          <button
            disabled={!findings || findings.decision === "reject"}
            onClick={async () => {
              await transfer("district", `vendor:${vendorId}`, amount, `Payment for ${invoiceId}`);
              appendLog(`Released to vendor: ${vendorId}`);
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-green-500 text-black font-semibold disabled:opacity-50"
          >
            Approve & Release
          </button>
        </div>
      </div>

      <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
        <h4 className="text-white font-semibold">Activity Log</h4>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          {log.map((l, i) => (
            <li key={i}>• {l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}