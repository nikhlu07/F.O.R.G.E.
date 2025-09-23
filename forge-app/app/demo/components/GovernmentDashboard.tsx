"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./Card";
import { StatCard } from "./StatCard";

// Mock Data
const initialBudgets = {
  totalAmount: 100000000,
  allocatedAmount: 45000000,
};

const initialVendors = [
  { id: 1, name: "Stark Industries", status: "approved" },
  { id: 2, name: "Wayne Enterprises", status: "pending" },
  { id: 3, name: "Cyberdyne Systems", status: "suspended" },
  { id: 4, name: "Omni Consumer Products", status: "approved" },
];

const initialClaims = [
  { id: "0x2d...b3c7", amount: 5000000, riskLevel: "high", status: "flagged" },
  { id: "0x8c...f9a1", amount: 150000, riskLevel: "low", status: "approved" },
  { id: "0x9f...e4b2", amount: 75000, riskLevel: "low", status: "approved" },
];

const initialAlerts = [
  { id: 1, type: 'shell-company', severity: "high", amount: 5000000 },
];

export default function GovernmentDashboard() {
  const [vendors, setVendors] = useState(initialVendors);
  const [systemPaused, setSystemPaused] = useState(false);

  const approveVendor = (vendorId: number) => {
    setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: "approved" } : v));
    alert("AUTOMATIC ACTION: A transaction has been sent to the blockchain to approve the vendor.");
  };

  const toggleSystemPause = () => {
    setSystemPaused(!systemPaused);
    alert(systemPaused ? "AUTOMATIC ACTION: The 'Resume' command has been broadcast to the network." : "AUTOMATIC ACTION: The 'Emergency Pause' command has been broadcast.");
  };

  return (
    <div>
        <h2 className="text-3xl font-bold text-white">Government Official Console</h2>
        <p className="text-gray-400 mt-1">Oversee budgets, manage vendors, and review AI-flagged transactions.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>AI-Generated Alerts & Claim Oversight</CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-400 -mt-2 mb-4">The system's AI auditor automatically flags suspicious transactions for your review.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Identifier</th>
                                        <th scope="col" className="px-4 py-3">Amount</th>
                                        <th scope="col" className="px-4 py-3">AI Risk</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {initialClaims.map(claim => (
                                        <tr key={claim.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                            <td className="px-4 py-3 font-mono text-white">{claim.id}</td>
                                            <td className="px-4 py-3 text-white">${claim.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`font-semibold ${claim.riskLevel === 'high' ? 'text-red-500' : claim.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>{claim.riskLevel.toUpperCase()}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${claim.status === 'approved' ? 'bg-green-500/20 text-green-400' : claim.status === 'flagged' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>{claim.status}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => alert("This action would trigger a multi-sig vote or a secondary review process.")} className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs">REVIEW</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>Automated Vendor Onboarding</CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-400 -mt-2 mb-4">Approving a vendor is an on-chain action that whitelists their address.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Vendor</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                        <th scope="col" className="px-4 py-3 text-right">Trigger Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendors.map(vendor => (
                                        <tr key={vendor.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                            <td className="px-4 py-3 font-medium text-white">{vendor.name}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${vendor.status === 'approved' ? 'bg-green-500/20 text-green-400' : vendor.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{vendor.status}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {vendor.status === 'pending' && (
                                                    <button onClick={() => approveVendor(vendor.id)} className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs">APPROVE</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <StatCard title="Total Budget" value={`$${(initialBudgets.totalAmount / 1_000_000).toFixed(0)}M`} />
                    <StatCard title="Allocated" value={`$${(initialBudgets.allocatedAmount / 1_000_000).toFixed(0)}M`} />
                    <StatCard title="AI Alerts" value={initialAlerts.length.toString()} isAlert />
                    <StatCard title="Pending" value={vendors.filter(v => v.status === "pending").length.toString()} />
                </div>
                <Card>
                    <CardHeader>Autonomous Budget Controls</CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xs text-gray-400 -mt-2">Deploy or modify smart contracts that manage public funds.</p>
                        <input type="number" placeholder="Budget Amount (USD)" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" />
                        <input type="text" placeholder="Purpose / Initiative" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" />
                        <button onClick={() => alert("AUTOMATIC ACTION: A new smart contract has been deployed to manage this budget.")} className="w-full bg-cyan-500 text-black font-semibold py-2 rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">Deploy Budget Contract</button>
                        <button onClick={toggleSystemPause} className={`w-full font-semibold py-2 rounded-lg transition-colors ${systemPaused ? "bg-green-600 hover:bg-green-500 text-white" : "bg-red-600 hover:bg-red-500 text-white"}`}>
                            {systemPaused ? "Resume Protocol" : "Emergency Pause Protocol"}
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
