"use client";
import React, { useState } from "react";

export default function HederaAuditWidget() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [verify, setVerify] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const submitAudit = async () => {
    setSubmitting(true);
    setError(null);
    setResult(null);
    setVerify(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "fraud_challenge",
          project: "Kibera Solar Grid Initiative",
          message: "Suspected over-invoicing on milestone M2.1",
          evidenceHash: "ipfs://bafybeigdyrzt53demo",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Submission failed");
      setResult(data);

      // Attempt verification via mirror node
      const q = new URLSearchParams({ transactionId: data.transactionId, topicId: data.topicId }).toString();
      const vres = await fetch(`/api/audit/verify?${q}`);
      const vdata = await vres.json();
      setVerify(vdata);
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const hashscanTxUrl = () => {
    if (!result?.transactionId) return null;
    const net = process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet";
    return `https://${net}.hashscan.io/#/transaction/${encodeURIComponent(result.transactionId)}`;
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
      <h4 className="text-lg font-semibold text-white mb-2">Hedera Live Audit</h4>
      <p className="text-sm text-gray-400 mb-4">Submit a fraud challenge to HCS and verify via Mirror Node.</p>
      <button
        onClick={submitAudit}
        disabled={submitting}
        className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-sm font-semibold text-black disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Challenge to HCS"}
      </button>

      {error && <p className="mt-3 text-sm text-red-400">Error: {error}</p>}

      {result && (
        <div className="mt-4 text-sm">
          <p className="text-gray-300">Status: <span className="text-white font-mono">{result.status}</span></p>
          <p className="text-gray-300">Transaction ID: <span className="text-white font-mono break-all">{result.transactionId}</span></p>
          <p className="text-gray-300">Topic: <span className="text-white font-mono">{result.topicId}</span></p>
          {hashscanTxUrl() && (
            <a href={hashscanTxUrl()!} target="_blank" rel="noreferrer" className="text-cyan-400 underline">View on HashScan ↗</a>
          )}
        </div>
      )}

      {verify && (
        <div className="mt-3 text-sm">
          <p className="text-gray-300">Verified: <span className="text-white">{verify.verified ? "Yes" : "No"}</span></p>
          {verify.consensusTimestamp && (
            <p className="text-gray-300">Consensus: <span className="text-white font-mono">{verify.consensusTimestamp}</span></p>
          )}
          {verify.sequenceNumber && (
            <p className="text-gray-300">Sequence #: <span className="text-white font-mono">{verify.sequenceNumber}</span></p>
          )}
          {verify.mirrorUrl && (
            <a href={verify.mirrorUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline">Mirror Query ↗</a>
          )}
        </div>
      )}
    </div>
  );
}