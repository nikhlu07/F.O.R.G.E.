"use client";

import React, { useState } from 'react';
import { DollarSign, Users, Shield, AlertTriangle, TrendingUp, Building, Truck, FileText, ArrowRight, MapPin, CheckCircle, Clock } from 'lucide-react';
import { mockBudgets, mockClaims, mockVendors, districtData, availableVendors, allocatedProjects, pendingClaims, communityReports } from '../../data/mockData';
import { DonutChart } from '../../components/ui/DonutChart';

export function DeputyDashboard() {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedAllocation, setSelectedAllocation] = useState('');
  const [claimRecommendation, setClaimRecommendation] = useState('');
  const [selectedClaim, setSelectedClaim] = useState('');

  const handleSelectVendor = () => {
    if (!selectedVendor || !selectedAllocation) {
      alert('Please select a vendor and project');
      return;
    }
    alert('Vendor assigned successfully');
  };

  const handleReviewClaim = (action: 'approve' | 'reject' | 'investigate') => {
    if (!selectedClaim) {
      alert('Please select a claim');
      return;
    }
    alert(`Claim ${action}d`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-white">Deputy Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome back, managing {districtData.districtName}.</p>
            </div>
            <div className="text-sm text-gray-400">
              Reporting to: <span className="font-semibold text-white">{districtData.stateHead}</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<DollarSign className="text-orange-400 h-6 w-6" />} title="District Budget" value={formatCurrency(districtData.allocatedBudget)} />
            <StatCard icon={<Truck className="text-blue-400 h-6 w-6" />} title="Active Projects" value={districtData.activeProjects.toString()} />
            <StatCard icon={<Clock className="text-amber-400 h-6 w-6" />} title="Pending Claims" value={districtData.pendingClaims.toString()} />
            <StatCard icon={<TrendingUp className="text-emerald-400 h-6 w-6" />} title="Budget Utilization" value={`${Math.round((districtData.spentBudget / districtData.allocatedBudget) * 100)}%`} />
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Vendor Selection */}
            <Card title="Vendor Selection & Assignment" icon={<Users className="text-cyan-400 h-6 w-6" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select id="project-allocation" label="Select Project Allocation" value={selectedAllocation} onChange={setSelectedAllocation} options={allocatedProjects.map(p => ({ value: p.id, label: `${p.project} - ${formatCurrency(p.amount)}` }))} />
                    <Select id="vendor-selection" label="Select Vendor" value={selectedVendor} onChange={setSelectedVendor} options={availableVendors.map(v => ({ value: v.id, label: `${v.name} (Rating: ${v.rating}★)` }))} />
                </div>
                <button onClick={handleSelectVendor} className="mt-4 w-full bg-cyan-400 text-black font-semibold py-3 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center">
                    Assign Vendor <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </Card>

            {/* Claim Processing */}
            <Card title="Claim Processing" icon={<FileText className="text-emerald-400 h-6 w-6" />}>
              <Select id="claim-review" label="Select Claim to Review" value={selectedClaim} onChange={setSelectedClaim} options={pendingClaims.map(c => ({ value: c.id, label: `${c.id} - ${formatCurrency(c.amount)} (Risk: ${c.riskScore})` }))} />
              {selectedClaim && (
                <div className="mt-4 bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <p className="font-semibold text-white">{pendingClaims.find(c => c.id === selectedClaim)?.vendor}</p>
                  <p className="text-sm text-gray-400">{pendingClaims.find(c => c.id === selectedClaim)?.project}</p>
                </div>
              )}
              <textarea value={claimRecommendation} onChange={(e) => setClaimRecommendation(e.target.value)} className="mt-4 w-full bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white p-3" rows={3} placeholder="Add review notes..."></textarea>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <button onClick={() => handleReviewClaim('approve')} className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors">Approve</button>
                <button onClick={() => handleReviewClaim('investigate')} className="bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 font-semibold transition-colors">Investigate</button>
                <button onClick={() => handleReviewClaim('reject')} className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold transition-colors">Reject</button>
              </div>
            </Card>

            {/* Project Management */}
            <Card title="District Project Management" icon={<Building className="text-purple-400 h-6 w-6" />}>
              <ProjectTable projects={allocatedProjects} />
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Pending Claims Overview */}
            <Card title="Pending Claims Overview" icon={<FileText className="text-amber-400 h-6 w-6" />}>
              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {pendingClaims.map(claim => (
                  <div key={claim.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{claim.vendor}</p>
                        <p className="text-sm text-gray-400">{formatCurrency(claim.amount)}</p>
                      </div>
                      <div className={`font-bold text-lg ${claim.riskScore > 60 ? 'text-red-500' : claim.riskScore > 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {claim.riskScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Reports */}
            <Card title="Community Reports" icon={<AlertTriangle className="text-red-400 h-6 w-6" />}>
              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {communityReports.map(report => (
                  <div key={report.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-white">{report.issue}</p>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${report.priority === 'high' ? 'bg-red-900/50 text-red-400' : 'bg-amber-900/50 text-amber-400'}`}>
                        {report.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{report.project}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components, styled to match the new design
const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
    <div className="bg-black/50 border border-gray-800 rounded-2xl p-5 flex items-center space-x-4">
      <div className="p-3 bg-gray-900/50 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
);
  
const Card = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
            {icon}
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="p-6">{children}</div>
    </div>
);

const Select = ({ id, label, value, onChange, options }: { id: string, label: string, value: string, onChange: (value: string) => void, options: { value: string, label: string }[] }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white">
            <option value="">Choose...</option>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    </div>
);

const ProjectTable = ({ projects }: { projects: { id: string, project: string, amount: number, status: string }[] }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-black/50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Project</th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(p => (
                    <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{p.project}</th>
                        <td className="px-6 py-4">{formatCurrency(p.amount)}</td>
                        <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            p.status === 'in-progress' ? 'bg-blue-900/50 text-blue-300' : 
                            p.status === 'vendor-selection' ? 'bg-amber-900/50 text-amber-300' : 
                            'bg-gray-700 text-gray-300'
                        }`}>
                            {p.status.replace('-', ' ')}
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
