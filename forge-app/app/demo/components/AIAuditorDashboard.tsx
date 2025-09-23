import { useState, useEffect } from 'react';

// Mock Transaction Data with added fraud risk
const initialTransactions = [
  { id: 'TX001', description: 'Payment for materials', amount: 5000, riskScore: 5, status: 'Processed' },
  { id: 'TX002', description: 'Consulting fee', amount: 12000, riskScore: 8, status: 'Processed' },
  { id: 'TX003', description: 'Software license', amount: 1500, riskScore: 3, status: 'Processed' },
  { id: 'TX004', description: 'Emergency repairs', amount: 8500, riskScore: 95, status: 'Flagged' },
  { id: 'TX005', description: 'Travel expenses', amount: 3200, riskScore: 30, status: 'Processed' },
  { id: 'TX006', description: 'Unknown equipment purchase', amount: 19500, riskScore: 98, status: 'Flagged' },
];

const AIAuditorDashboard = () => {
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates and fraud detection
      const newTransaction = {
        id: `TX${(transactions.length + 1).toString().padStart(3, '0')}`,
        description: 'Newly added transaction',
        amount: Math.floor(Math.random() * 20000),
        riskScore: Math.floor(Math.random() * 100),
        status: 'Processed',
      };

      if (newTransaction.riskScore > 90) {
        newTransaction.status = 'Flagged';
      }

      setTransactions(prev => [...prev, newTransaction]);
    }, 5000);

    return () => clearInterval(interval);
  }, [transactions]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">AI Fraud Detection</h2>
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">Transaction ID</th>
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Risk Score</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className={`border-b border-gray-800 ${tx.status === 'Flagged' ? 'bg-red-900/50' : ''}`}>
                <td className="p-2 font-mono">{tx.id}</td>
                <td className="p-2">{tx.description}</td>
                <td className="p-2">${tx.amount.toLocaleString()}</td>
                <td className="p-2">{tx.riskScore}</td>
                <td className={`p-2 font-semibold ${tx.status === 'Flagged' ? 'text-red-400' : 'text-green-400'}`}>
                  {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AIAuditorDashboard;