"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "./Card";
import { StatCard } from "./StatCard";

// Mock Data
const allTransactions = [
  { id: "0x2d...b3c7", type: "Claim Payment", amount: 5000000, status: "flagged", riskLevel: "high" },
  { id: "0x4e...f1g5", type: "Claim Payment", amount: 1200000, status: "approved", riskLevel: "medium" },
  { id: "0x8c...f9a1", type: "Claim Payment", amount: 150000, status: "approved", riskLevel: "low" },
  { id: "0x1a...c4d8", type: "Budget Lock", amount: 25000000, status: "executed", riskLevel: "info" },
  { id: "0x3k...l8m9", type: "Claim Submission", amount: 950000, status: "pending", riskLevel: "medium" },
  { id: "0x7b...a9e3", type: "Vendor Approval", amount: 0, status: "executed", riskLevel: "info" },
  { id: "0x6h...i2j7", type: "Sub-supplier Pmt", amount: 50000, status: "approved", riskLevel: "low" },
  { id: "0x9f...e4b2", type: "Claim Payment", amount: 75000, status: "approved", riskLevel: "low" },
];

export default function AuditorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return allTransactions
      .filter(tx => {
        if (filter === "all") return true;
        if (filter === "high-risk") return tx.riskLevel === "high";
        if (filter === "flagged") return tx.status === "flagged";
        return true;
      })
      .filter(tx => 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, filter]);

  return (
    <div>
        <h2 className="text-3xl font-bold text-white">Auditor Console</h2>
        <p className="text-gray-400 mt-1">Monitor the real-time, immutable ledger of all on-chain activity.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <StatCard title="Total Transactions" value="1,482" />
            <StatCard title="Network Compliance" value="99.8%" />
            <StatCard title="AI High-Risk Flags" value={allTransactions.filter(tx => tx.riskLevel === 'high').length.toString()} isAlert />
            <StatCard title="Open Investigations" value="1" />
        </div>

        <Card className="mt-8">
            <CardHeader>Immutable Transaction Ledger</CardHeader>
            <CardContent>
                <p className="text-xs text-gray-400 -mt-2 mb-4">This is a direct feed from the blockchain. Use the controls below to search, filter, and investigate any transaction.</p>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input 
                        type="text"
                        placeholder="Search by TXID, type, amount..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:flex-grow bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full md:w-auto bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    >
                        <option value="all">Filter: All Transactions</option>
                        <option value="high-risk">Filter: High-Risk Only</option>
                        <option value="flagged">Filter: Flagged Only</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase">
                            <tr>
                                <th scope="col" className="px-4 py-3">Transaction Hash (TXID)</th>
                                <th scope="col" className="px-4 py-3">Type</th>
                                <th scope="col" className="px-4 py-3">Amount</th>
                                <th scope="col" className="px-4 py-3">Status</th>
                                <th scope="col" className="px-4 py-3">AI Risk Analysis</th>
                                <th scope="col" className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(tx => (
                                <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="px-4 py-3 font-mono text-white">{tx.id}</td>
                                    <td className="px-4 py-3 text-white">{tx.type}</td>
                                    <td className="px-4 py-3 text-white">{tx.amount > 0 ? `$${tx.amount.toLocaleString()}` : 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${tx.status === 'approved' || tx.status === 'executed' ? 'bg-green-500/20 text-green-400' : tx.status === 'flagged' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`font-semibold ${tx.riskLevel === 'high' ? 'text-red-500' : tx.riskLevel === 'medium' ? 'text-yellow-500' : tx.riskLevel === 'low' ? 'text-green-500' : 'text-cyan-400'}`}>
                                            {tx.riskLevel.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => alert("AUTOMATIC ACTION: An on-chain investigation has been logged.")} className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs">INVESTIGATE</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
