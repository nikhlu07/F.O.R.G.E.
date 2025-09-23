"use client";

import GovernmentDashboard from "../demo/components/GovernmentDashboard";
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';
import { Reveal } from '../components/Animations';

export default function GovernmentPage() {
  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
              <div className="text-center pb-16">
                <p className="section-title">GOVERNMENT</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                  Government Dashboard
                </h2>
              </div>
              <div className="max-w-7xl mx-auto bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                <GovernmentDashboard />
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
