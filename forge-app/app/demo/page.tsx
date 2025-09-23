"use client";

import { useState } from "react";
import GovernmentDashboard from "./components/GovernmentDashboard";
import VendorDashboard from "./components/VendorDashboard";
import AuditorDashboard from "./components/AuditorDashboard";
import AIAuditorDashboard from "./components/AIAuditorDashboard";
import { ShieldCheckIcon, BuildingOffice2Icon, EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Imports from live-dashboard
import { Reveal } from '../components/Animations';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';

type Role = "government" | "vendor" | "auditor" | "ai_auditor";

export default function DemoPage() {
  const [activeRole, setActiveRole] = useState<Role>("government");

  const renderDashboard = () => {
    switch (activeRole) {
      case "government":
        return <GovernmentDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "auditor":
        return <AuditorDashboard />;
      case "ai_auditor":
        return <AIAuditorDashboard />;
      default:
        return <GovernmentDashboard />;
    }
  };

  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <Header />
      <main className="pt-20">
        <section id="demo" className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
              <div className="text-center pb-16">
                <p className="section-title">DEMO CONSOLE</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                  F.O.R.G.E. Role-Play Simulation
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  This is a demonstration of an automatic blockchain system where actions are immutable and trigger self-executing contracts. Select a role to see its perspective.
                </p>
              </div>

              {/* Role Switcher */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="flex justify-center gap-4 p-2 bg-gray-900/50 border border-gray-800 rounded-xl">
                    <RoleButton name="Government" icon={<ShieldCheckIcon className="w-6 h-6" />} role="government" activeRole={activeRole} onClick={setActiveRole} />
                    <RoleButton name="Vendor" icon={<BuildingOffice2Icon className="w-6 h-6" />} role="vendor" activeRole={activeRole} onClick={setActiveRole} />
                    <RoleButton name="Auditor" icon={<EyeIcon className="w-6 h-6" />} role="auditor" activeRole={activeRole} onClick={setActiveRole} />
                    <RoleButton name="AI Auditor" icon={<SparklesIcon className="w-6 h-6" />} role="ai_auditor" activeRole={activeRole} onClick={setActiveRole} />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="max-w-7xl mx-auto bg-black/50 border border-gray-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                {renderDashboard()}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const RoleButton = ({ name, icon, role, activeRole, onClick }: { name: string, icon: React.ReactNode, role: Role, activeRole: Role, onClick: (role: Role) => void }) => (
  <button
    onClick={() => onClick(role)}
    className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
      activeRole === role
        ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }`}
  >
    {icon}
    {name}
  </button>
);
