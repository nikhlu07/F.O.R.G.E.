
"use client";
import React, { useState } from 'react';
import { Search, MapPin, Camera, FileText, Shield, DollarSign, AlertTriangle, Users } from 'lucide-react';
import { mockClaims, mockChallenges, statistics } from '../../data/mockData';

export function CitizenDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [challengeReason, setChallengeReason] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedClaim, setSelectedClaim] = useState('');

  const handleStakeChallenge = () => {
    if (!selectedClaim || !challengeReason || !stakeAmount) {
      alert('Please fill in all challenge details');
      return;
    }
    alert(`Challenge submitted with ${stakeAmount} ICP stake`);
    setChallengeReason('');
    setStakeAmount('');
    setSelectedClaim('');
  };

  const handleReportProject = () => {
    alert('Project verification report submitted successfully');
  };

  const filteredClaims = mockClaims.filter(claim =>
    claim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <main className="mx-auto px-6 py-8">

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Corruption Prevented</p>
                <p className="text-2xl font-bold text-cyan-400">{formatCurrency(statistics.corruptionPrevented)}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Citizens</p>
                <p className="text-2xl font-bold text-white">1,240</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">My Reports</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <FileText className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-black/50 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Rewards Earned</p>
                <p className="text-2xl font-bold text-orange-400">50 ICP</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <DollarSign className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Public Spending Explorer */}
          <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Search className="h-6 w-6 text-cyan-400" />
                <span>Public Spending Explorer</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="Search government spending..."
                />
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {filteredClaims.map((claim) => (
                  <div key={claim.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:bg-gray-900">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{claim.description}</h3>
                        <p className="text-sm text-gray-400 font-mono">ID: {claim.id}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{formatCurrency(claim.amount)}</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          claim.riskLevel === 'critical' ? 'bg-red-900/50 text-red-400' :
                          claim.riskLevel === 'high' ? 'bg-orange-900/50 text-orange-400' :
                          claim.riskLevel === 'medium' ? 'bg-amber-900/50 text-amber-400' :
                          'bg-green-900/50 text-green-400'
                        }`}>
                          {claim.riskLevel.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Submitted: {claim.submittedAt.toLocaleDateString()}</span>
                      <button
                        onClick={() => setSelectedClaim(claim.id)}
                        className="text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        Challenge This Claim
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Corruption Reporting */}
          <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                <span>File Corruption Challenge</span>
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Select Claim to Challenge
                </label>
                <select
                  value={selectedClaim}
                  onChange={(e) => setSelectedClaim(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                >
                  <option value="">Choose a claim...</option>
                  {mockClaims.map((claim) => (
                    <option key={claim.id} value={claim.id}>
                      {claim.id} - {formatCurrency(claim.amount)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Reason for Challenge
                </label>
                <textarea
                  value={challengeReason}
                  onChange={(e) => setChallengeReason(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  rows={4}
                  placeholder="Describe why you believe this claim is fraudulent..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  ICP Stake Amount
                </label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="Enter ICP amount to stake..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum stake: 10 ICP. Stakes are returned if challenge is valid.
                </p>
              </div>

              <div className="bg-amber-900/50 border border-amber-700 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Camera className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-300 mb-1">Evidence Upload</h4>
                    <p className="text-sm text-amber-400 mb-3">
                      Upload photos, documents, or other evidence to support your challenge.
                    </p>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStakeChallenge}
                className="w-full px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              >
                Submit Challenge
              </button>
            </div>
          </div>
        </div>

        {/* My Challenges */}
        <div className="mt-8 bg-black/50 border border-gray-800 rounded-2xl shadow-2xl">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <FileText className="h-6 w-6 text-cyan-400" />
              <span>My Challenges</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {mockChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">Challenge #{challenge.id}</h3>
                      <p className="text-sm text-gray-400">{challenge.reason}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-orange-400">{challenge.stakeAmount} ICP</div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.status === 'resolved' ? 'bg-green-900/50 text-green-400' :
                        challenge.status === 'investigating' ? 'bg-amber-900/50 text-amber-400' :
                        challenge.status === 'rejected' ? 'bg-red-900/50 text-red-400' :
                        'bg-blue-900/50 text-blue-400'
                      }`}>
                        {challenge.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{challenge.location?.address}</span>
                    </div>
                    <span>Filed: {challenge.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Verification */}
        <div className="mt-8 bg-black/50 border border-cyan-500/20 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Community Verification Needed
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Help verify if these claimed projects actually exist at their specified locations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <h4 className="font-semibold text-white mb-2">Road Construction - Highway 47</h4>
                <p className="text-sm text-gray-400 mb-3">Mumbai-Pune Express Highway Extension</p>
                <button
                  onClick={handleReportProject}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Verify Project
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                <h4 className="font-semibold text-white mb-2">School Equipment Delivery</h4>
                <p className="text-sm text-gray-400 mb-3">Government Primary School, Bangalore</p>
                <button
                  onClick={handleReportProject}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Verify Delivery
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Earn ICP rewards for verified reports that help prevent corruption.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
