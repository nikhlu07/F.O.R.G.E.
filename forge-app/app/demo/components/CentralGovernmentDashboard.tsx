"use client";

import React, { useState } from 'react';
import { DollarSign, Users, Shield, AlertTriangle, TrendingUp, Building } from 'lucide-react';
import { mockBudgets, mockClaims, mockVendors } from '../../data/mockData';
import { DonutChart } from '../../components/ui/DonutChart';

export function CentralGovernmentDashboard() {
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetPurpose, setBudgetPurpose] = useState('');

  const handleLockBudget = () => {
    if (!budgetAmount || !budgetPurpose) {
      alert('Please fill in all budget details');
      return;
    }
    alert(`Budget of $${budgetAmount} locked for ${budgetPurpose}`);
    setBudgetAmount('');
    setBudgetPurpose('');
  };

  const handleEmergencyPause = () => {
    alert('Emergency pause activated - All payments suspended');
  };

  const handleApproveVendor = (vendorId: string) => {
    alert('Vendor approved and added to registry');
  };

  const totalBudget = mockBudgets.reduce((sum, budget) => sum + budget.totalAmount, 0);
  const allocatedBudget = mockBudgets.reduce((sum, budget) => sum + budget.allocatedAmount, 0);
  const remainingBudget = totalBudget - allocatedBudget;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
          <h1 className="text-3xl font-bold text-white">Central Government Dashboard</h1>
          <p className="text-gray-400 mt-1">Oversee budgets, vendors, and claims.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-1 space-y-8">
            {/* Budget Control Panel */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-cyan-400" />
                  <span>Budget Control Panel</span>
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Budget Amount ($)
                  </label>
                  <input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="Enter amount..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={budgetPurpose}
                    onChange={(e) => setBudgetPurpose(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="e.g., Infrastructure Development 2047"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleLockBudget}
                    className="flex-1 px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                  >
                    Lock Budget
                  </button>
                  <button
                    onClick={handleEmergencyPause}
                    className="flex-1 px-6 py-3 text-base font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                  >
                    Emergency Pause
                  </button>
                </div>
              </div>
            </div>

            {/* Vendor Registry */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Building className="h-6 w-6 text-cyan-400" />
                  <span>Vendor Registry</span>
                </h2>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {mockVendors.map((vendor) => (
                    <div key={vendor.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white">{vendor.name}</h3>
                          <p className="text-sm text-gray-400">{vendor.businessType}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          vendor.status === 'approved' 
                            ? 'bg-green-900/50 text-green-400'
                            : vendor.status === 'pending'
                            ? 'bg-amber-900/50 text-amber-400'
                            : 'bg-red-900/50 text-red-400'
                        }`}>
                          {vendor.status.toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                        <div>Projects: {vendor.completedProjects}</div>
                        <div>Rating: {vendor.averageRating}/5</div>
                        <div>Risk Score: {vendor.riskScore}</div>
                        <div className="col-span-2">Email: {vendor.contactEmail}</div>
                      </div>

                      {vendor.status === 'pending' && (
                        <button
                          onClick={() => handleApproveVendor(vendor.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                        >
                          Approve Vendor
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Budget Overview */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <DonutChart
                    total={totalBudget}
                    disbursed={allocatedBudget}
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Total Budget</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {formatCurrency(totalBudget)}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Allocated Budget</p>
                    <p className="text-3xl font-bold text-cyan-400 mt-1">
                      {formatCurrency(allocatedBudget)}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg col-span-2">
                    <p className="text-gray-400 text-sm">Remaining</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {formatCurrency(remainingBudget)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Claims */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                  <span>Recent Claims & Corruption Alerts</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Claim ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Risk Level</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockClaims.map((claim) => (
                        <tr key={claim.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                          <td className="py-3 px-4 font-mono text-sm text-gray-300">{claim.id}</td>
                          <td className="py-3 px-4 font-semibold text-white">{formatCurrency(claim.amount)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              claim.riskLevel === 'critical' ? 'bg-red-900/50 text-red-400' :
                              claim.riskLevel === 'high' ? 'bg-orange-900/50 text-orange-400' :
                              claim.riskLevel === 'medium' ? 'bg-amber-900/50 text-amber-400' :
                              'bg-green-900/50 text-green-400'
                            }`}>
                              {claim.riskLevel.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              claim.status === 'approved' ? 'bg-green-900/50 text-green-400' :
                              claim.status === 'blocked' ? 'bg-red-900/50 text-red-400' :
                              claim.status === 'under-review' ? 'bg-amber-900/50 text-amber-400' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {claim.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
