"use client";
import { useState } from 'react';
import { DollarSign, Users, BarChart3, Shield, UserPlus, Settings, AlertTriangle } from 'lucide-react';
import { stateData, deputies, pendingAllocations, regionalAlerts } from '../../data/mockData';

export default function StateGovernmentDashboard() {
  const [budgetAmount, setBudgetAmount] = useState('');
  const [projectArea, setProjectArea] = useState('');
  const [selectedDeputy, setSelectedDeputy] = useState('');
  const [newDeputyId, setNewDeputyId] = useState('');
  const [deputyToRemove, setDeputyToRemove] = useState('');

  const handleAllocateBudget = () => {
    if (!budgetAmount || !projectArea || !selectedDeputy) {
      alert('Please fill in all allocation details');
      return;
    }
    
    const amount = parseInt(budgetAmount);
    if (amount > stateData.remainingBudget) {
      alert('Allocation amount exceeds remaining budget');
      return;
    }

    alert(`₹${amount.toLocaleString()} allocated to ${projectArea} under ${selectedDeputy}`);
    setBudgetAmount('');
    setProjectArea('');
    setSelectedDeputy('');
  };

  const handleProposeDeputy = () => {
    if (!newDeputyId) {
      alert('Please enter deputy principal ID');
      return;
    }
    alert(`Deputy proposal submitted for: ${newDeputyId}`);
    setNewDeputyId('');
  };

  const handleRemoveDeputy = () => {
    if (!deputyToRemove) {
      alert('Please select deputy to remove');
      return;
    }
    alert(`Deputy removal initiated for: ${deputyToRemove}`);
    setDeputyToRemove('');
  };

  const handleApproveAllocation = (amount: number) => {
    alert(`Budget allocation of ₹${amount.toLocaleString()} approved`);
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

        {/* State Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total State Budget</p>
                <p className="text-2xl font-bold text-cyan-400">{formatCurrency(stateData.totalBudget)}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <DollarSign className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Deputies</p>
                <p className="text-2xl font-bold text-white">{stateData.deputiesCount}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Projects</p>
                <p className="text-2xl font-bold text-white">{stateData.activeProjects}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <BarChart3 className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg Risk Score</p>
                <p className="text-2xl font-bold text-orange-400">{stateData.averageRiskScore}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <Shield className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-1 space-y-8">
            {/* Budget Allocation */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-cyan-400" />
                  <span>Allocate State Budget</span>
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                  <div className="text-sm text-gray-300">
                    <strong>Available Budget:</strong> {formatCurrency(stateData.remainingBudget)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    Allocated: {formatCurrency(stateData.allocatedBudget)} / {formatCurrency(stateData.totalBudget)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Allocation Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="Enter allocation amount..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Project Area/Description
                  </label>
                  <input
                    type="text"
                    value={projectArea}
                    onChange={(e) => setProjectArea(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="e.g., Highway Development Phase 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Assign to Deputy
                  </label>
                  <select
                    value={selectedDeputy}
                    onChange={(e) => setSelectedDeputy(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  >
                    <option value="">Select Deputy...</option>
                    {deputies.map((deputy) => (
                      <option key={deputy.id} value={deputy.name}>
                        {deputy.name} - {deputy.district}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAllocateBudget}
                  className="w-full px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                >
                  Allocate Budget
                </button>
              </div>
            </div>

            {/* Deputy Management */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <UserPlus className="h-6 w-6 text-cyan-400" />
                  <span>Deputy Management</span>
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Propose New Deputy
                  </label>
                  <input
                    type="text"
                    value={newDeputyId}
                    onChange={(e) => setNewDeputyId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono text-sm"
                    placeholder="Enter deputy principal ID..."
                  />
                  <button
                    onClick={handleProposeDeputy}
                    className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Propose Deputy
                  </button>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Remove Deputy
                  </label>
                  <select
                    value={deputyToRemove}
                    onChange={(e) => setDeputyToRemove(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
                  >
                    <option value="">Select deputy to remove...</option>
                    {deputies.map((deputy) => (
                      <option key={deputy.id} value={deputy.name}>
                        {deputy.name} - {deputy.district}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleRemoveDeputy}
                    className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Remove Deputy
                  </button>
                </div>

                <div className="bg-amber-900/50 border border-amber-700 rounded-xl p-4">
                  <div className="text-sm text-amber-300">
                    <strong>Note:</strong> Deputy proposals require confirmation after 24-hour review period for security.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Deputy Performance Overview */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Users className="h-6 w-6 text-cyan-400" />
                  <span>Deputy Performance Dashboard</span>
                </h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Deputy</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">District</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Active Projects</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Performance</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Risk Score</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deputies.map((deputy) => (
                        <tr key={deputy.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                          <td className="py-3 px-4 font-semibold text-white">{deputy.name}</td>
                          <td className="py-3 px-4 text-gray-400">{deputy.district}</td>
                          <td className="py-3 px-4 text-center text-white">{deputy.projects}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1 text-white">
                              <span className="font-medium">{deputy.performance}</span>
                              <span className="text-amber-400">★</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              deputy.riskScore < 30 ? 'bg-green-900/50 text-green-400' :
                              deputy.riskScore < 50 ? 'bg-amber-900/50 text-amber-400' :
                              'bg-red-900/50 text-red-400'
                            }`}>
                              {deputy.riskScore}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pending Allocations */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-cyan-400" />
                  <span>Pending Budget Allocations</span>
                </h2>
              </div>
              <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {pendingAllocations.map((allocation) => (
                    <div key={allocation.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white">{allocation.project}</h3>
                          <p className="text-sm text-gray-400">Requested: {formatCurrency(allocation.requestedAmount)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            allocation.priority === 'high' ? 'bg-red-900/50 text-red-400' :
                            allocation.priority === 'medium' ? 'bg-amber-900/50 text-amber-400' :
                            'bg-green-900/50 text-green-400'
                          }`}>
                            {allocation.priority.toUpperCase()}
                          </span>
                          <button
                            onClick={() => handleApproveAllocation(allocation.requestedAmount)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional Alerts */}
            <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                  <span>Regional Corruption Alerts</span>
                </h2>
              </div>
              <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {regionalAlerts.map((alert) => (
                    <div key={alert.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{alert.description}</h4>
                          <p className="text-sm text-gray-400">Deputy: {alert.deputy}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'high' ? 'bg-red-900/50 text-red-400' :
                          alert.severity === 'medium' ? 'bg-amber-900/50 text-amber-400' :
                          'bg-blue-900/50 text-blue-400'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
