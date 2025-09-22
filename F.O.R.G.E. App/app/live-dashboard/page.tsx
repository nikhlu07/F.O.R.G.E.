'use client';
import { Reveal } from '../components/Animations';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';
import { DonutChart } from '../components/ui/DonutChart';
import { useState, useEffect } from 'react';

// Define data structures
interface Transaction {
  id: string;
  description: string;
  tx: string;
  amount: number;
  timestamp: Date;
  status: 'Approved' | 'Pending' | 'Live';
}

interface Milestone {
  id: number;
  name: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  budget: number;
  transactions: Transaction[];
}

interface Financials {
  totalAllocated: number;
  disbursed: number;
  remaining: number;
}

interface Project {
  id: string;
  name: string;
  financials: Financials;
  milestones: Milestone[];
}

// Mock initial data
const initialProjectData: Project = {
  id: '0x7A2b...dE9f',
  name: 'Kibera Solar Grid Initiative',
  financials: {
    totalAllocated: 5000000,
    disbursed: 1850000,
    remaining: 3150000,
  },
  milestones: [
    {
      id: 1,
      name: 'Initial Funding & Setup',
      status: 'Completed',
      budget: 750000,
      transactions: [
        {
          id: '1',
          description: 'Team Salaries',
          tx: '0x...a4f3',
          amount: 250000,
          timestamp: new Date(Date.now() - 200000),
          status: 'Approved',
        },
        {
          id: '2',
          description: 'Equipment Purchase',
          tx: '0x...c8e1',
          amount: 500000,
          timestamp: new Date(Date.now() - 150000),
          status: 'Approved',
        },
      ],
    },
    {
      id: 2,
      name: 'Panel Installation',
      status: 'In Progress',
      budget: 2000000,
      transactions: [
        {
          id: '3',
          description: 'Contractor Payment 1',
          tx: '0x...b9d2',
          amount: 1000000,
          timestamp: new Date(Date.now() - 100000),
          status: 'Live',
        },
        {
          id: '4',
          description: 'Contractor Payment 2',
          tx: '0x...d4f1',
          amount: 1000000,
          timestamp: new Date(Date.now() - 50000),
          status: 'Pending',
        },
      ],
    },
    {
      id: 3,
      name: 'Community Training',
      status: 'Pending',
      budget: 250000,
      transactions: [],
    },
    {
      id: 4,
      name: 'Grid Connection & Testing',
      status: 'Pending',
      budget: 1000000,
      transactions: [],
    },
    {
      id: 5,
      name: 'Project Handover',
      status: 'Pending',
      budget: 1000000,
      transactions: [],
    },
  ],
};

export default function LiveDashboard() {
  const [project, setProject] = useState<Project>(initialProjectData);

  useEffect(() => {
    const interval = setInterval(() => {
      setProject(prevProject => {
        let totalDisbursed = 0;
        const updatedMilestones = prevProject.milestones.map(m => {
          let milestoneDisbursed = 0;
          m.transactions.forEach(t => {
            if (t.status === 'Approved' || t.status === 'Live') {
              milestoneDisbursed += t.amount;
            }
          });
          totalDisbursed += milestoneDisbursed;

          if (m.status === 'In Progress') {
            const updatedTransactions = m.transactions.map(t => {
              if (t.status === 'Pending' && Math.random() > 0.7) {
                return { ...t, status: 'Live' as const };
              }
              return t;
            });
            return { ...m, transactions: updatedTransactions };
          }
          return m;
        });

        return {
          ...prevProject,
          financials: {
            ...prevProject.financials,
            disbursed: totalDisbursed,
            remaining: prevProject.financials.totalAllocated - totalDisbursed,
          },
          milestones: updatedMilestones,
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400';
      case 'In Progress':
        return 'text-cyan-400';
      case 'Pending':
        return 'text-yellow-400';
      case 'Live':
        return 'text-green-400';
      case 'Approved':
        return 'text-gray-400';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <Header />
      <main className="pt-20">
        <section id="dashboard" className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
              <div className="text-center pb-16">
                <p className="section-title">LIVE DASHBOARD</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                  {project.name}
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  ID: <span className="font-mono">{project.id}</span>
                </p>
              </div>

              <div className="max-w-7xl mx-auto bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                <div className="p-6 border-b border-gray-800 grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <DonutChart
                      total={project.financials.totalAllocated}
                      disbursed={project.financials.disbursed}
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Total Allocated</p>
                      <p className="text-3xl font-bold text-white mt-1">
                        {formatCurrency(project.financials.totalAllocated)}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Disbursed</p>
                      <p className="text-3xl font-bold text-cyan-400 mt-1">
                        {formatCurrency(project.financials.disbursed)}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg col-span-2">
                      <p className="text-gray-400 text-sm">Remaining</p>
                      <p className="text-3xl font-bold text-white mt-1">
                        {formatCurrency(project.financials.remaining)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Project Plan & Budget
                  </h3>
                  <div className="space-y-6">
                    {project.milestones.map(milestone => {
                      const milestoneDisbursed = milestone.transactions.reduce(
                        (acc, tx) =>
                          tx.status === 'Approved' || tx.status === 'Live'
                            ? acc + tx.amount
                            : acc,
                        0,
                      );
                      const budgetSpentPercent = (
                        (milestoneDisbursed / milestone.budget) *
                        100
                      ).toFixed(0);

                      return (
                        <div
                          key={milestone.id}
                          className="bg-gray-900/50 p-4 rounded-lg border border-gray-800"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-white">
                              Milestone {milestone.id}: {milestone.name}
                            </h4>
                            <p
                              className={`text-sm font-semibold ${getStatusColor(
                                milestone.status,
                              )}`}
                            >
                              {milestone.status}
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>
                                Budget: {formatCurrency(milestone.budget)}
                              </span>
                              <span>Spent: {formatCurrency(milestoneDisbursed)}</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2.5">
                              <div
                                className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${budgetSpentPercent}%` }}
                              ></div>
                            </div>
                          </div>
                          {milestone.transactions.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-800">
                              <h5 className="text-sm font-semibold text-gray-300 mb-2">
                                Transactions
                              </h5>
                              <div className="space-y-2 text-sm font-mono">
                                {milestone.transactions.map(tx => (
                                  <div
                                    key={tx.id}
                                    className="flex justify-between items-center"
                                  >
                                    <p className="text-gray-400">
                                      {tx.description}
                                    </p>
                                    <div className="text-right">
                                      <p
                                        className={`font-semibold ${getStatusColor(
                                          tx.status,
                                        )}`}
                                      >
                                        {formatCurrency(tx.amount)} - {tx.status}
                                      </p>
                                      <p className="text-gray-500 text-xs">
                                        {tx.tx}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
