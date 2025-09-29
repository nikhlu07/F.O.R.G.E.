import { useState, useEffect, ReactNode } from 'react';
import { EyeIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { initialTransactions, vendorWatchlist, suspiciousKeywords, policyLimits } from '../../data/mockData';

// Mock data and helper functions

type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: string;
  vendor: string;
  employee: string;
  time: string;
  location: string;
};

const calculateRiskScore = (tx: Transaction) => {
  let score = 0;

  // 1. Amount Anomaly (simple version)
  if (tx.amount > 10000) score += 25;
  if (tx.amount > 15000) score += 20;

  // 2. Vendor Risk
  if (vendorWatchlist.includes(tx.vendor)) score += 40;

  // 3. Policy Violation
  if (policyLimits[tx.category] && tx.amount > policyLimits[tx.category]) score += 35;

  // 4. Pattern Deviation (simulated)
  if (new Date(tx.time).getHours() < 8 || new Date(tx.time).getHours() > 20) score += 15; // Off-hours

  // 5. Keyword Analysis
  if (suspiciousKeywords.some(keyword => tx.description.toLowerCase().includes(keyword))) score += 50;
  
  return Math.min(100, score);
};

interface RoleButtonProps {
  name: string;
  icon: ReactNode;
  role: string;
  activeRole: string;
  onClick: (role: string) => void;
}

const RoleButton = ({ name, icon, role, activeRole, onClick }: RoleButtonProps) => (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        activeRole === role
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={() => onClick(role)}
    >
      {icon}
      {name}
    </button>
  );

const AIAuditorDashboard = () => {
  const [transactions, setTransactions] = useState(() => 
    initialTransactions.map(tx => ({ ...tx, riskScore: calculateRiskScore(tx), status: 'Processed' }))
  );
  const [autonomyLevel, setAutonomyLevel] = useState('Monitor'); // Monitor, Flag & Notify, Auto-Block
  const [role, setRole] = useState('CFO'); // CFO, AP Clerk
  const [activeRole, setActiveRole] = useState('auditor');

  useEffect(() => {
    const interval = setInterval(() => {
      const newTxData: Transaction = {
        id: `TX${(transactions.length + 1).toString().padStart(3, '0')}`,
        description: 'Newly added transaction',
        amount: Math.floor(Math.random() * 20000),
        category: 'Operations',
        vendor: 'New Vendor Inc.',
        employee: 'Auto Bot',
        time: new Date().toISOString(),
        location: 'Cyberspace'
      };
      
      const riskScore = calculateRiskScore(newTxData);
      let status = 'Processed';

      switch (autonomyLevel) {
        case 'Flag & Notify':
          if (riskScore > 75) status = 'Flagged';
          break;
        case 'Auto-Block':
          if (riskScore > 95) status = 'Blocked';
          else if (riskScore > 75) status = 'Flagged';
          break;
        case 'Monitor':
        default:
          break;
      }

      setTransactions(prev => [...prev, { ...newTxData, riskScore, status }]);
    }, 5000);

    return () => clearInterval(interval);
  }, [transactions, autonomyLevel]);

  const insights = [
    "Detected a 35% increase in 'Maintenance' spending this month, concentrated under vendor 'RapidFix Inc.'. Recommend reviewing these invoices for legitimacy.",
    "Employee 'Jane Smith' has a high frequency of transactions just under the $2000 travel policy limit. Suggest a review of her recent expense reports.",
  ];

  const renderCFOView = () => (
    <div>
      <h3 className="text-xl font-semibold mb-2">CFO Summary</h3>
      <p>Total Spend: ${transactions.reduce((acc, tx) => acc + tx.amount, 0).toLocaleString()}</p>
      <p>Total Amount at Risk (Flagged/Blocked): ${transactions.filter(tx => tx.status !== 'Processed').reduce((acc, tx) => acc + tx.amount, 0).toLocaleString()}</p>
      <h4 className="font-bold mt-2">Key Insights:</h4>
      <ul className="list-disc list-inside">
        {insights.map((insight, i) => <li key={i}>{insight}</li>)}
      </ul>
    </div>
  );

  const renderAPClerkView = () => (
    <div>
      <h3 className="text-xl font-semibold mb-2">AP Clerk Action Items</h3>
      <p>The following transactions require manual review:</p>
      <ul className="list-disc list-inside">
        {transactions.filter(tx => tx.status === 'Flagged' || tx.status === 'Blocked').map(tx => (
          <li key={tx.id}>{tx.id} - {tx.description} (${tx.amount}) - Status: {tx.status}</li>
        ))}
      </ul>
    </div>
  );

  const renderAuditorView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Real-time Transactions</h3>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2">ID</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Risk Score</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id} className={`border-b border-gray-800 
                    ${tx.status === 'Flagged' ? 'bg-yellow-900/50' : ''}
                    ${tx.status === 'Blocked' ? 'bg-red-900/50' : ''}
                  `}>
                    <td className="p-2 font-mono">{tx.id}</td>
                    <td className="p-2">{tx.description}</td>
                    <td className="p-2">${tx.amount.toLocaleString()}</td>
                    <td className="p-2">{tx.riskScore}</td>
                    <td className={`p-2 font-semibold 
                      ${tx.status === 'Flagged' ? 'text-yellow-400' : ''}
                      ${tx.status === 'Blocked' ? 'text-red-400' : 'text-green-400'}
                    `}>
                      {tx.status}
                    </td>
                  </tr>
                )).reverse()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-xl font-semibold">Actionable Insights & Summaries</h3>
             <select value={role} onChange={e => setRole(e.target.value)} className="bg-gray-700 text-white p-1 rounded">
                <option>CFO</option>
                <option>AP Clerk</option>
             </select>
          </div>
          {role === 'CFO' ? renderCFOView() : renderAPClerkView()}
        </div>
      </div>
  );

  const renderAdminView = () => (
    <div className="bg-gray-800/50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
        <p>Admin-specific controls and overviews would go here.</p>
        <p>For example, user management or system-wide settings.</p>
    </div>
  );

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">AI Auditor Dashboard</h2>
        <div>
          <label htmlFor="autonomyLevel" className="mr-2">Autonomy Level:</label>
          <select id="autonomyLevel" value={autonomyLevel} onChange={e => setAutonomyLevel(e.target.value)} className="bg-gray-700 text-white p-1 rounded">
            <option>Monitor</option>
            <option>Flag & Notify</option>
            <option>Auto-Block</option>
          </select>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <div className="flex justify-center gap-1 p-1 border-gray-800 rounded-full">
              <RoleButton name="AI Auditor" icon={<EyeIcon className="w-5 h-5" />} role="auditor" activeRole={activeRole} onClick={setActiveRole} />
              <RoleButton name="Admin" icon={<UserCircleIcon className="w-5 h-5" />} role="admin" activeRole={activeRole} onClick={setActiveRole} />
          </div>
        </div>
      </div>

      {activeRole === 'auditor' ? renderAuditorView() : renderAdminView()}
    </div>
  );
};

export default AIAuditorDashboard;
