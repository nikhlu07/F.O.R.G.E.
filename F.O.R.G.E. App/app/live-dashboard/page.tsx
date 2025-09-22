"use client";
import { Reveal } from "../components/Animations";

export default function LiveDashboard() {
  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <main>
        <section id="dashboard" className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
              <div className="text-center pb-16">
                <p className="section-title">LIVE DASHBOARD</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                  Transparency in Real-Time.
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  This is a simulated view of the F.O.R.G.E. interface,
                  tracking the flow of funds and project milestones for a live
                  initiative. Every transaction is verifiable on the public
                  ledger.
                </p>
              </div>

              <div className="max-w-6xl mx-auto bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-bold text-white text-xl">
                      Project: Kibera Solar Grid Initiative
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 sm:mt-0">
                      ID: <span className="font-mono">0x7A2b...dE9f</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-400 font-semibold">
                      LIVE
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3">
                  <div className="md:col-span-2 p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Financials Overview
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">
                          Total Allocated
                        </p>
                        <p className="text-2xl font-bold text-white mt-1">
                          $5,000,000
                        </p>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Disbursed</p>
                        <p className="text-2xl font-bold text-cyan-400 mt-1">
                          $1,850,000
                        </p>
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Remaining</p>
                        <p className="text-2xl font-bold text-white mt-1">
                          $3,150,000
                        </p>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-white mt-8 mb-4">
                      Milestone Progress
                    </h4>
                    <div>
                      <p className="text-sm text-gray-300 mb-2">
                        Current: Milestone 2/5 - Panel Installation
                      </p>
                      <div className="w-full bg-gray-800 rounded-full h-4">
                        <div
                          className="bg-cyan-500 h-4 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 p-6 border-t md:border-t-0 md:border-l border-gray-800">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Live Transaction Feed
                    </h4>
                    <div className="space-y-4 text-sm font-mono">
                      <div className="text-green-400">
                        <p>{"> Payment Confirmed: M2.1"}</p>
                        <p className="text-gray-500 text-xs">
                          {"> TX: 0x...a4f3 | -$150,000"}
                        </p>
                      </div>
                      <div className="text-green-400">
                        <p>{"> Payment Confirmed: M2.0"}</p>
                        <p className="text-gray-500 text-xs">
                          {"> TX: 0x...c8e1 | -$200,000"}
                        </p>
                      </div>
                      <div className="text-gray-400">
                        <p>{"> Milestone 1 Verified"}</p>
                        <p className="text-gray-500 text-xs">
                          {"> Oracle: Chainlink | DePIN: OK"}
                        </p>
                      </div>
                      <div className="text-green-400">
                        <p>{"> Payment Confirmed: M1.5"}</p>
                        <p className="text-gray-500 text-xs">
                          {"> TX: 0x...b9d2 | -$500,000"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
