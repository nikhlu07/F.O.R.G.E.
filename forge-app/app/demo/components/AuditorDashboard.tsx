
"use client";
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Shield, FileText, AlertTriangle, Inbox, Clock, Check, X, ArrowRight } from 'lucide-react';
import { mockClaims, mockChallenges, statistics } from '../../data/mockData';
import { Claim, Challenge, RiskLevel } from '../../types';

export default function AuditorDashboard() {
  const [claims] = useState(mockClaims);
  const [investigations] = useState(mockChallenges);
  const [selectedItem, setSelectedItem] = useState<Claim | Challenge | null>(claims[1]); // Default to the high-risk claim

  const handleApprove = () => {
    if (selectedItem && "description" in selectedItem) {
      alert(`Claim ${selectedItem.id} approved`);
      // Here you would update the claim status in your backend
      setSelectedItem({ ...selectedItem, status: 'approved' });
    }
  };

  const handleReject = () => {
    if (selectedItem && "description" in selectedItem) {
      alert(`Claim ${selectedItem.id} rejected`);
      // Here you would update the claim status in your backend
      setSelectedItem({ ...selectedItem, status: 'rejected' });
    }
  };

  const handleEscalate = () => {
    if (selectedItem && "description" in selectedItem) {
      alert(`Claim ${selectedItem.id} escalated for further investigation`);
      // Here you would update the claim status in your backend
      setSelectedItem({ ...selectedItem, status: 'escalated' });
    }
  };

  const getRiskColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'critical': return 'border-red-500/80';
      case 'high': return 'border-orange-500/80';
      case 'medium': return 'border-amber-500/80';
      case 'low': return 'border-green-500/80';
      default: return 'border-gray-800';
    }
  };

  const getStatusPill = (status: Claim['status'] | Challenge['status']) => {
    switch (status) {
      case 'approved': return <span className="px-2 py-1 text-xs font-medium text-green-400 bg-green-900/50 rounded-full">{status}</span>;
      case 'rejected':
      case 'blocked':
        return <span className="px-2 py-1 text-xs font-medium text-red-400 bg-red-900/50 rounded-full">{status}</span>;
      case 'under-review':
      case 'investigating':
        return <span className="px-2 py-1 text-xs font-medium text-amber-400 bg-amber-900/50 rounded-full">{status}</span>;
      default: return <span className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-700 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="font-inter text-[#EAEAEA] min-h-screen">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4f4f4f;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #56e1f8;
        }
      `}</style>
      <main className="mx-auto px-6 py-6">

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Shield size={24} className="text-cyan-400" />} title="Taxpayer Money Saved" value={`$${(statistics.taxpayerMoneySaved / 1000000).toFixed(2)}M`} />
          <StatCard icon={<FileText size={24} className="text-cyan-400" />} title="Contracts Analyzed" value={statistics.contractsAnalyzed.toLocaleString()} />
          <StatCard icon={<AlertTriangle size={24} className="text-orange-400" />} title="Active Investigations" value={statistics.activeInvestigations} />
          <StatCard icon={<Check size={24} className="text-cyan-400" />} title="Detection Accuracy" value={`${statistics.detectionAccuracy}%`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Lists */}
          <div className="lg:col-span-1 space-y-8">
            {/* Claims to Verify */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center"><Inbox className="mr-3 text-cyan-400" />Claims to Verify</h2>
              </div>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {claims.filter(c => c.status === 'under-review' || c.status === 'blocked').map(claim => (
                  <div key={claim.id} onClick={() => setSelectedItem(claim)} className={`p-4 rounded-xl cursor-pointer border-2 ${selectedItem?.id === claim.id ? 'bg-gray-900/50 border-cyan-500' : 'hover:bg-gray-900/50 border-transparent'}`}>
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-white">{claim.description}</p>
                      <span className={`text-sm font-bold ${claim.riskLevel === 'critical' ? 'text-red-500' : 'text-orange-400'}`}>{claim.riskLevel}</span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-sm text-gray-400 font-mono">{claim.id}</span>
                      <span className="text-lg font-bold text-cyan-400">${claim.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Investigations */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center"><Clock className="mr-3 text-cyan-400" />Ongoing Investigations</h2>
              </div>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {investigations.map(inv => (
                  <div key={inv.id} onClick={() => setSelectedItem(inv)} className={`p-4 rounded-xl cursor-pointer border-2 ${selectedItem?.id === inv.id ? 'bg-gray-900/50 border-cyan-500' : 'hover:bg-gray-900/50 border-transparent'}`}>
                    <p className="font-semibold text-white">{inv.reason}</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-sm text-gray-400">Challenger: {inv.challengerId}</span>
                      {getStatusPill(inv.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detail View */}
          <div className="lg:col-span-2">
            <div className={`bg-black/50 border-2 rounded-2xl shadow-2xl sticky top-8 ${selectedItem && 'riskLevel' in selectedItem && selectedItem.riskLevel ? getRiskColor(selectedItem.riskLevel) : 'border-gray-800'}`}>
              <div className="p-6 border-b border-gray-800/80">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Verification Details</h2>
                  {selectedItem && getStatusPill(selectedItem.status)}
                </div>
              </div>
              
              {selectedItem ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">{'description' in selectedItem ? selectedItem.description : selectedItem.reason}</h3>
                    <p className="text-sm text-gray-400 font-mono">ID: {selectedItem.id}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
                    <div>
                      <p className="text-gray-400">Amount</p>
                      <p className="font-semibold text-white text-lg">${'amount' in selectedItem && selectedItem.amount ? selectedItem.amount.toLocaleString() : ('stakeAmount' in selectedItem && selectedItem.stakeAmount ? selectedItem.stakeAmount.toLocaleString() + ' (Stake)' : '')}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Risk / Fraud Score</p>
                      <p className={`font-semibold text-lg ${'riskLevel' in selectedItem && selectedItem.riskLevel === 'critical' ? 'text-red-500' : 'text-orange-400'}`}>
                        {'riskLevel' in selectedItem && selectedItem.riskLevel ? selectedItem.riskLevel.toUpperCase() : 'N/A'} ({'fraudScore' in selectedItem ? selectedItem.fraudScore : 'N/A'})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Submitted By</p>
                      <p className="font-semibold text-white font-mono">{'submittedBy' in selectedItem ? selectedItem.submittedBy : selectedItem.challengerId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Submission Date</p>
                      <p className="font-semibold text-white">{new Date('submittedAt' in selectedItem ? selectedItem.submittedAt : selectedItem.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {'reviewNotes' in selectedItem && selectedItem.reviewNotes && (
                    <div className="bg-amber-900/50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                      <h4 className="font-bold text-amber-300">AI Review Notes</h4>
                      <p className="text-amber-400 text-sm">{selectedItem.reviewNotes}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Attached Documents</h4>
                    <div className="space-y-2">
                      {'documents' in selectedItem && selectedItem.documents?.map(doc => (
                        <a href="#" key={doc} className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-800 transition">
                          <span className="text-gray-300 font-medium">{doc}</span>
                          <ArrowRight className="text-gray-500" size={18} />
                        </a>
                      ))}
                       {'evidence' in selectedItem && selectedItem.evidence?.map(doc => (
                        <a href="#" key={doc} className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-800 transition">
                          <span className="text-gray-300 font-medium">{doc}</span>
                          <ArrowRight className="text-gray-500" size={18} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {selectedItem && "description" in selectedItem && (
                    <div className="pt-6 border-t border-gray-800">
                      <h3 className="font-bold text-lg text-white mb-4">Auditor Actions</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                          <Check size={20} />Approve Claim
                        </button>
                        <button onClick={handleReject} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                          <X size={20} />Reject Claim
                        </button>
                        <button onClick={handleEscalate} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
                          <AlertTriangle size={20} />Escalate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-10 text-center">
                  <Inbox size={48} className="mx-auto text-gray-700" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-400">Select an item to review</h3>
                  <p className="text-gray-500 mt-1">Choose a claim or investigation from the list to see its details here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// A simple StatCard component to avoid repetition
const StatCard = ({ icon, title, value }: { icon: ReactNode, title: string, value: string | number }) => (
    <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-xl">
                {icon}
            </div>
        </div>
    </div>
);
