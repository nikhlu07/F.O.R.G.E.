"use client";

import { useEffect, useState } from "react";
import { LoadUpAnimation } from "./components/Animations";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { Section, SectionTitle, SectionHeading, SectionDescription } from "./components/landing/Section";
import { CaseStudyCard, FeatureCard } from "./components/landing/Cards";
import { Footer } from "./components/landing/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      {loading ? (
        <LoadUpAnimation />
      ) : (
        <>
          <Header />

          <main>
            <Hero handleScroll={handleScroll} />

            <Section>
              <div className="container mx-auto px-6 text-center">
                <SectionTitle>MISSION BRIEFING</SectionTitle>
                <SectionHeading>Code, not corruption.</SectionHeading>
                <SectionDescription>
                  In 2047, development funds can no longer vanish. We built an autonomous system of smart contracts to ensure resources reach their destination, defended by cryptographic truth.
                </SectionDescription>
              </div>
            </Section>

            <Section id="case-studies">
              <div className="container mx-auto px-6">
                <div className="text-center pb-16">
                  <SectionTitle>CASE STUDIES: REAL-WORLD IMPACT</SectionTitle>
                  <SectionHeading>From Theory to Reality.</SectionHeading>
                  <SectionDescription>
                    Corruption isn&apos;t abstract. It has real victims. We start with NGOs—where transparency mandates and fast decision cycles enable rapid impact—then scale to government.
                  </SectionDescription>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                  <CaseStudyCard
                    title="The Ghost Highway Project"
                    description="A $50 million contract for a new highway is awarded. After an initial payment of $20 million, the contractor vanishes. The funds are gone, and not a single mile of road is built."
                    solutionTitle="The F.O.R.G.E. Solution"
                    solutionDescription="The contract is a milestone-based smart contract. Funds are only released as the Reality Anchoring System verifies construction progress via satellite imagery and DePIN sensors. The initial payment is locked until 10% of the road is verifiably complete, preventing the theft entirely."
                  />
                  <CaseStudyCard
                    title="Diverted Medical Supplies"
                    description="An international aid shipment of life-saving vaccines arrives in-country but never reaches the rural clinics it was destined for. The supplies are sold on the black market by corrupt officials."
                    solutionTitle="The F.O.R.G.E. Solution"
                    solutionDescription="Each vaccine vial is tracked on the Neural Transparency Grid. Payment to the logistics firm is only finalized when the clinic director provides biometric sign-off upon delivery, confirmed by the Reality Anchoring System. The entire supply chain is transparent and auditable."
                  />
                </div>
              </div>
            </Section>

            <Section id="dashboard">
              <div className="container mx-auto px-6">
                <div className="text-center pb-16">
                  <SectionTitle>LIVE DASHBOARD</SectionTitle>
                  <SectionHeading>Transparency in Real-Time.</SectionHeading>
                  <SectionDescription>
                    This is a simulated view of the F.O.R.G.E. interface, tracking the flow of funds and project milestones for a live initiative. Every transaction is verifiable on the public ledger.
                  </SectionDescription>
                </div>

                <div className="max-w-6xl mx-auto bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="font-bold text-white text-xl">Project: Kibera Solar Grid Initiative</h3>
                      <p className="text-sm text-gray-400 mt-1 sm:mt-0">ID: <span className="font-mono">0x7A2b...dE9f</span></p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-400 font-semibold">LIVE</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3">
                    <div className="md:col-span-2 p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Financials Overview</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Total Allocated</p>
                          <p className="text-2xl font-bold text-white mt-1">$5,000,000</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Disbursed</p>
                          <p className="text-2xl font-bold text-cyan-400 mt-1">$1,850,000</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <p className="text-gray-400 text-sm">Remaining</p>
                          <p className="text-2xl font-bold text-white mt-1">$3,150,000</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-white mt-8 mb-4">Milestone Progress</h4>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Current: Milestone 2/5 - Panel Installation</p>
                        <div className="w-full bg-gray-800 rounded-full h-4">
                          <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-1 p-6 border-t md:border-t-0 md:border-l border-gray-800">
                      <h4 className="text-lg font-semibold text-white mb-4">Live Transaction Feed</h4>
                      <div className="space-y-4 text-sm font-mono">
                        <div className="text-green-400">
                          <p>{"> Payment Confirmed: M2.1"}</p>
                          <p className="text-gray-500 text-xs">{"> TX: 0x...a4f3 | -$150,000"}</p>
                        </div>
                        <div className="text-green-400">
                          <p>{"> Payment Confirmed: M2.0"}</p>
                          <p className="text-gray-500 text-xs">{"> TX: 0x...c8e1 | -$200,000"}</p>
                        </div>
                        <div className="text-gray-400">
                          <p>{"> Milestone 1 Verified"}</p>
                          <p className="text-gray-500 text-xs">{"> Oracle: Chainlink | DePIN: OK"}</p>
                        </div>
                        <div className="text-green-400">
                          <p>{"> Payment Confirmed: M1.5"}</p>
                          <p className="text-gray-500 text-xs">{"> TX: 0x...b9d2 | -$500,000"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section>
              <div className="container mx-auto px-6 text-center">
                <div className="pb-16 lg:pb-24">
                  <SectionTitle>CORE SYSTEMS</SectionTitle>
                  <SectionHeading>An Unbreakable Chain of Accountability.</SectionHeading>
                  <SectionDescription>
                    F.O.R.G.E. operates on three interconnected systems, engineered to eliminate loopholes and enforce radical transparency.
                  </SectionDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>}
                    title="Fund Allocation Matrix"
                    description="Self-executing contracts that disburse funds based on verified milestones, eliminating middlemen and graft."
                  />
                  <FeatureCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639l4.43-4.44a.997.997 0 011.41 0l4.43 4.44a.997.997 0 010 1.41l-4.43 4.44a.997.997 0 01-1.41 0l-4.43-4.44zM12 2.036a1.012 1.012 0 01.639 0l4.43 4.44a.997.997 0 010 1.41l-4.43 4.44a.997.997 0 01-1.41 0l-4.43-4.44a.997.997 0 010-1.41l4.43-4.44zM12 12.036a1.012 1.012 0 01.639 0l4.43 4.44a.997.997 0 010 1.41l-4.43 4.44a.997.997 0 01-1.41 0l-4.43-4.44a.997.997 0 010-1.41l4.43-4.44z" /></svg>}
                    title="Neural Transparency Grid"
                    description="A public, immutable ledger where every transaction is broadcast for all to see, audited by AI for anomalies."
                  />
                  <FeatureCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>}
                    title="Reality Anchoring System"
                    description="Using oracles and DePIN, we connect smart contracts to real-world data to verify physical progress."
                  />
                </div>
              </div>
            </Section>

            <Section>
              <div className="container mx-auto px-6 text-center">
                <div className="pb-16">
                  <SectionTitle>TECHNICAL SPECIFICATIONS</SectionTitle>
                  <SectionHeading>Engineered for a revolution.</SectionHeading>
                  <SectionDescription>
                    Built on a foundation of speed, security, and quantum-resistant cryptography to stay ahead of the curve.
                  </SectionDescription>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Blockchain</p>
                      <p className="text-xl lg:text-2xl font-bold text-white mt-1">Hedera Hashgraph</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Consensus</p>
                      <p className="text-xl lg:text-2xl font-bold text-white mt-1">Asynchronous BFT</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Throughput</p>
                      <p className="text-xl lg:text-2xl font-bold text-white mt-1">10,000+ TPS</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Finality</p>
                      <p className="text-xl lg:text-2xl font-bold text-white mt-1">3-5 seconds</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl col-span-1 sm:col-span-2 lg:col-span-2">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Energy Consumption</p>
                      <p className="text-xl lg:text-2xl font-bold text-white mt-1">&lt;0.001 kWh / transaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section>
              <div className="container mx-auto px-6 text-center">
                <div className="pb-16 lg:pb-24">
                  <SectionTitle>DEPLOYMENT ZONES</SectionTitle>
                  <SectionHeading>Where code meets the ground.</SectionHeading>
                  <SectionDescription>
                    Our revolution is rolling out in strategic phases, targeting critical infrastructure where transparency matters most.
                  </SectionDescription>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-left p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <p className="text-sm font-semibold text-cyan-400">PHASE 01</p>
                    <h3 className="text-2xl font-bold text-white mt-2">The Awakening</h3>
                    <p className="text-gray-400 mt-3">Powering rural communities with transparent solar projects, ensuring every dollar funds a watt of power.</p>
                  </div>
                  <div className="text-left p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <p className="text-sm font-semibold text-cyan-400">PHASE 02</p>
                    <h3 className="text-2xl font-bold text-white mt-2">The Expansion</h3>
                    <p className="text-gray-400 mt-3">Rebuilding trust by ensuring integrity in healthcare and education infrastructure.</p>
                  </div>
                  <div className="text-left p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <p className="text-sm font-semibold text-cyan-400">PHASE 03</p>
                    <h3 className="text-2xl font-bold text-white mt-2">The Revolution</h3>
                    <p className="text-gray-400 mt-3">Integrating F.O.R.G.E. with national budgets for complete, verifiable fiscal transparency.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section>
              <div className="container mx-auto px-6 text-center">
                <SectionTitle>IMPACT METRICS</SectionTitle>
                <SectionHeading>The data doesn&apos;t lie.</SectionHeading>
                <SectionDescription>
                  Success is not a headline, it&apos;s a verifiable data point. This is the quantifiable impact of incorruptible governance.
                </SectionDescription>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-4xl lg:text-5xl font-bold text-cyan-400">70%</p>
                    <p className="mt-2 text-gray-400">Target Corruption Reduction</p>
                  </div>
                  <div>
                    <p className="text-4xl lg:text-5xl font-bold text-cyan-400">100%</p>
                    <p className="mt-2 text-gray-400">Transaction Visibility</p>
                  </div>
                  <div>
                    <p className="text-4xl lg:text-5xl font-bold text-cyan-400">90%</p>
                    <p className="mt-2 text-gray-400">Reduced Admin Overhead</p>
                  </div>
                  <div>
                    <p className="text-4xl lg:text-5xl font-bold text-cyan-400">High</p>
                    <p className="mt-2 text-gray-400">Project Completion Rate</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section>
              <div className="container mx-auto px-6 text-center">
                <SectionTitle>THE RESISTANCE</SectionTitle>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4 max-w-5xl mx-auto leading-tight">
                  “Corruption is just the way things work.”
                </h2>
                <p className="mt-6 text-3xl font-semibold text-white">Not anymore.</p>
                <div className="mt-12 code-block max-w-md mx-auto !text-cyan-400">FORGE_STATUS: OPERATIONAL
CORRUPTION_LEVEL: DECLINING
HOPE_INDEX: RISING
REVOLUTION_PROGRESS: 15% AND CLIMBING</div>
              </div>
            </Section>

            <Section id="contribute" className="border-t border-gray-800">
              <div className="container mx-auto px-6 text-center">
                <SectionTitle>CONTRIBUTING</SectionTitle>
                <SectionHeading>Help build the future.</SectionHeading>
                <SectionDescription>F.O.R.G.E. is open-source. Join the rebellion against corruption and contribute to a more transparent world.</SectionDescription>
                <div className="mt-12">
                  <a href="#" className="px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]">View on GitHub</a>
                </div>
              </div>
            </Section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
