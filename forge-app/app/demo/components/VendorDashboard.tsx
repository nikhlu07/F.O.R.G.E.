"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./Card";
import { StatCard } from "./StatCard";

// Mock Data for Vendor (Stark Industries)
const vendorData = {
  name: "Stark Industries",
  activeContracts: 3,
  totalEarnings: 12550000,
  riskScore: 5,
};

const initialClaims = [
  { id: "0x8c...f9a1", amount: 150000, description: "Milestone 3 Payment", status: "approved" },
  { id: "0x5a...e1b9", amount: 400000, description: "Component Delivery", status: "approved" },
  { id: "0x9f...e4b2", amount: 75000, description: "Material Procurement", status: "pending" },
];

export default function VendorDashboard() {
  const [claims, setClaims] = useState(initialClaims);
  const [newClaim, setNewClaim] = useState({ amount: "", description: "" });

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newClaim.amount);
    if (!amount || !newClaim.description) {
      alert("Please fill in all fields.");
      return;
    }

    // AI-Powered Fraud Detection Simulation
    let fraudScore = 0;
    if (amount % 10000 === 0 && amount > 100000) fraudScore += 40;
    if (amount > 1000000) fraudScore += 40;
    if (newClaim.description.split(" ").length < 3) fraudScore += 20;

    const newClaimId = `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;

    if (fraudScore > 75) {
      alert(`AUTOMATIC ACTION: Claim REJECTED by AI. High Fraud Score: ${fraudScore}.`);
    } else if (fraudScore > 40) {
      alert(`AUTOMATIC ACTION: Claim FLAGGED by AI. Moderate Fraud Score: ${fraudScore}.`);
      setClaims([...claims, { id: newClaimId, amount, description: newClaim.description, status: "flagged" }]);
    } else {
      alert(`AUTOMATIC ACTION: Claim AUTO-APPROVED by AI. Low Fraud Score: ${fraudScore}.`);
      setClaims([...claims, { id: newClaimId, amount, description: newClaim.description, status: "approved" }]);
    }

    setNewClaim({ amount: "", description: "" });
  };

  return (
    <div>
        <h2 className="text-3xl font-bold text-white">Vendor Console: {vendorData.name}</h2>
        <p className="text-gray-400 mt-1">Submit claims and manage your on-chain activity.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>Automated Claim Submission</CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-400 -mt-2 mb-4">Submitting a claim initiates an automatic AI analysis and, if approved, triggers the payment smart contract.</p>
                        <form onSubmit={handleClaimSubmit} className="space-y-4">
                            <input type="number" placeholder="Claim Amount (USD)" value={newClaim.amount} onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" />
                            <textarea placeholder="Work Description & Proof of Delivery" value={newClaim.description} onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 h-24 focus:ring-cyan-500 focus:border-cyan-500 transition" />
                            <input type="file" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"/>
                            <button type="submit" className="w-full bg-cyan-500 text-black font-semibold py-2 rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">Submit Claim to Blockchain</button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>My Immutable Claim History</CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Claim ID (TX Hash)</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">Amount</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {claims.slice().reverse().map(claim => (
                                        <tr key={claim.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                            <td className="px-4 py-3 font-mono text-white">{claim.id}</td>
                                            <td className="px-4 py-3 text-white">{claim.description}</td>
                                            <td className="px-4 py-3 text-white">${claim.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${claim.status === 'approved' ? 'bg-green-500/20 text-green-400' : claim.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : claim.status === 'flagged' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>{claim.status}</span>
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
                    <StatCard title="Active Contracts" value={vendorData.activeContracts.toString()} />
                    <StatCard title="Total Earnings" value={`$${(vendorData.totalEarnings / 1_000_000).toFixed(2)}M`} />
                    <StatCard title="Pending Claims" value={claims.filter(c => c.status === 'pending').length.toString()} />
                    <StatCard title="AI Risk Score" value={`${vendorData.riskScore}%`} isRisk />
                </div>
                <Card>
                    <CardHeader>Automated Supply Chain Payments</CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xs text-gray-400 -mt-2">Initiate on-chain payments to your own suppliers.</p>
                        <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition">
                            <option>Select Sub-Supplier</option>
                            <option>Advanced Circuitry Inc.</option>
                            <option>Logistics & Transport Co.</option>
                        </select>
                        <input type="number" placeholder="Amount (USD)" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition" />
                        <button onClick={() => alert("AUTOMATIC ACTION: A transaction has been sent to pay your sub-supplier.")} className="w-full bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition-colors">Trigger Sub-Supplier Payment</button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
