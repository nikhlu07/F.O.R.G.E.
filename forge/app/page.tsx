"use client";

import { useEffect } from "react";
import { LoadUpAnimation, Reveal } from "./components/Animations";

export default function Home() {
  useEffect(() => {
    // Hero canvas animation
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number, particles: Particle[];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.5)";
        ctx.fill();
      }
    }

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      particles = [];
      for (let i = 0; i < 50; i++) particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${1 - dist / 100})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <LoadUpAnimation />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" className="h-6" alt="F.O.R.G.E. Logo" />
            <span className="text-xl font-bold tracking-tight text-white">F.O.R.G.E.</span>
          </div>
          <a
            href="#contribute"
            className="px-5 py-2.5 text-sm font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]"
          >
            Join the Resistance
          </a>
        </nav>
      </header>

      {/* Main */}
      <main>
        {/* Hero Section */}
        <section className="text-center hero-section h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <canvas id="hero-canvas" className="absolute top-0 left-0 w-full h-full z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white">
              Governance,<br />Immutable.
            </h1>
            <p className="mt-8 text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
              The Financial Oversight & Resource Governance Engine. <br />Corruption is now a legacy bug.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#dashboard" className="px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]">Launch Live Dashboard</a>
              <a href="#case-studies" className="px-6 py-3 text-base font-semibold text-white bg-transparent border border-gray-600 rounded-full hover:bg-gray-800 hover:border-gray-500 transition-colors">See Real-World Impact</a>
            </div>
          </div>
        </section>

        {/* Mission Briefing */}
        <section className="py-24 lg:py-40 bg-black">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
              <p className="section-title">MISSION BRIEFING</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">Code, not corruption.</h2>
              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                In 2047, development funds can no longer vanish. We built an autonomous system of smart contracts to ensure resources reach their destination, defended by cryptographic truth.
              </p>
            </div>
          </Reveal>
        </section>

        <section id="case-studies" className="py-16 lg:py-24">
          <Reveal>
            <div className="container mx-auto px-6">
                <div className="text-center pb-16">
                    <p className="section-title">CASE STUDIES: REAL-WORLD IMPACT</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">From Theory to Reality.</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Corruption isn't abstract. It has real victims. Here’s how F.O.R.G.E. would rewrite the story in common scenarios of graft.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="feature-card text-left !p-0 overflow-hidden">
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white">The Ghost Highway Project</h3>
                            <p className="mt-3 text-gray-400">A $50 million contract for a new highway is awarded. After an initial payment of $20 million, the contractor vanishes. The funds are gone, and not a single mile of road is built.</p>
                        </div>
                        <div className="bg-black/40 p-8 border-t border-gray-800">
                             <h4 className="font-semibold text-cyan-400">The F.O.R.G.E. Solution</h4>
                             <p className="mt-3 text-gray-300">The contract is a milestone-based smart contract. Funds are only released as the Reality Anchoring System verifies construction progress via satellite imagery and DePIN sensors. The initial payment is locked until 10% of the road is verifiably complete, preventing the theft entirely.</p>
                        </div>
                    </div>
                    <div className="feature-card text-left !p-0 overflow-hidden">
                        <div className="p-8">
                             <h3 className="text-xl font-bold text-white">Diverted Medical Supplies</h3>
                             <p className="mt-3 text-gray-400">An international aid shipment of life-saving vaccines arrives in-country but never reaches the rural clinics it was destined for. The supplies are sold on the black market by corrupt officials.</p>
                        </div>
                        <div className="bg-black/40 p-8 border-t border-gray-800">
                             <h4 className="font-semibold text-cyan-400">The F.O.R.G.E. Solution</h4>
                             <p className="mt-3 text-gray-300">Each vaccine vial is tracked on the Neural Transparency Grid. Payment to the logistics firm is only finalized when the clinic director provides biometric sign-off upon delivery, confirmed by the Reality Anchoring System. The entire supply chain is transparent and auditable.</p>
                        </div>
                    </div>
                </div>
            </div>
          </Reveal>
        </section>

        <section id="dashboard" className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
                <div className="text-center pb-16">
                    <p className="section-title">LIVE DASHBOARD</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">Transparency in Real-Time.</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        This is a simulated view of the F.O.R.G.E. interface, tracking the flow of funds and project milestones for a live initiative. Every transaction is verifiable on the public ledger.
                    </p>
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
                                    <div className="bg-cyan-500 h-4 rounded-full width: 40%"></div>
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
          </Reveal>
        </section>

        <section className="py-16 lg:py-24 bg-black/50">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
                <div className="pb-16 lg:pb-24">
                    <p className="section-title">CORE SYSTEMS</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">An Unbreakable Chain of Accountability.</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        F.O.R.G.E. operates on three interconnected systems, engineered to eliminate loopholes and enforce radical transparency.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature-card text-left">
                        <div className="bg-cyan-900/50 text-cyan-400 rounded-lg w-12 h-12 flex items-center justify-center border border-cyan-400/30">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mt-6 text-white">Fund Allocation Matrix</h3>
                        <p className="mt-2 text-gray-400">Self-executing contracts that disburse funds based on verified milestones, eliminating middlemen and graft.</p>
                    </div>
                    <div className="feature-card text-left">
                         <div className="bg-cyan-900/50 text-cyan-400 rounded-lg w-12 h-12 flex items-center justify-center border border-cyan-400/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639l4.43-4.44a.997.997 0 011.41 0l4.43 4.44a.997.997 0 010 1.41l-4.43 4.44a.997.997 0 01-1.41 0l-4.43-4.44zM12 2.036a1.012 1.012 0 01.639 0l4.43 4.44a.997.997 0 010 1.41l-4.43 4.44a.997.997 0 01-1.41 0l-4.43-4.44a.997.997 0 010-1.41l4.43-4.44zM12 12.036a1.012 1.012 0 01.639 0l4.43 4.44a.997.997 0 010 1.41l-4.43 4.44a.997.997 0 01-1.41 0l-4.43-4.44a.997.997 0 010-1.41l4.43-4.44z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mt-6 text-white">Neural Transparency Grid</h3>
                         <p className="mt-2 text-gray-400">A public, immutable ledger where every transaction is broadcast for all to see, audited by AI for anomalies.</p>
                    </div>
                    <div className="feature-card text-left">
                        <div className="bg-cyan-900/50 text-cyan-400 rounded-lg w-12 h-12 flex items-center justify-center border border-cyan-400/30">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold mt-6 text-white">Reality Anchoring System</h3>
                         <p className="mt-2 text-gray-400">Using oracles and DePIN, we connect smart contracts to real-world data to verify physical progress.</p>
                    </div>
                </div>
            </div>
          </Reveal>
        </section>

        <section className="py-16 lg:py-24 bg-black/50">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
                <div className="pb-16">
                    <p className="section-title">TECHNICAL SPECIFICATIONS</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">Engineered for a revolution.</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Built on a foundation of speed, security, and quantum-resistant cryptography to stay ahead of the curve.
                    </p>
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
          </Reveal>
        </section>

        <section className="py-16 lg:py-24">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
                <div className="pb-16 lg:pb-24">
                    <p className="section-title">DEPLOYMENT ZONES</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">Where code meets the ground.</h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Our revolution is rolling out in strategic phases, targeting critical infrastructure where transparency matters most.
                    </p>
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
          </Reveal>
        </section>

        <section className="py-24 lg:py-32 text-white bg-black/50">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
                 <p className="section-title">IMPACT METRICS</p>
                 <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">The data doesn't lie.</h2>
                 <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                    Success is not a headline, it's a verifiable data point. This is the quantifiable impact of incorruptible governance.
                 </p>
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
          </Reveal>
        </section>

        <section className="py-24 lg:py-40">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
                 <p className="section-title">THE RESISTANCE</p>
                 <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4 max-w-5xl mx-auto leading-tight">
                    "Corruption is just the way things work."
                 </h2>
                 <p className="mt-6 text-3xl font-semibold text-white">Not anymore.</p>
                 <div className="mt-12 code-block max-w-md mx-auto !text-cyan-400">FORGE_STATUS: OPERATIONAL
CORRUPTION_LEVEL: DECLINING
HOPE_INDEX: RISING
REVOLUTION_PROGRESS: 15% AND CLIMBING</div>
            </div>
          </Reveal>
        </section>

        <section id="contribute" className="py-16 lg:py-24 bg-black/50 border-t border-gray-800">
          <Reveal>
            <div className="container mx-auto px-6 text-center">
                <p className="section-title">CONTRIBUTING</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">Help build the future.</h2>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">F.O.R.G.E. is open-source. Join the rebellion against corruption and contribute to a more transparent world.</p>
                <div className="mt-12">
                     <a href="#" className="px-6 py-3 text-base font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]">View on GitHub</a>
                </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-500">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-white tracking-wide">Acknowledgments</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Hedera Hashgraph</li>
                <li>OpenZeppelin</li>
                <li>The African Development Community</li>
                <li>All contributors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white tracking-wide">Links</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Demo</a></li>
                <li><a href="#">Discord</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white tracking-wide">License</h4>
              <p className="mt-4 text-sm">This project is licensed under the MIT License.</p>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>Built with ⚡ by rebels who believe code is law, and law should serve the people.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
