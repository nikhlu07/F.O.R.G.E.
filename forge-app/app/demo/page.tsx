"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {CentralGovernmentDashboard} from "./components/CentralGovernmentDashboard";
import StateGovernmentDashboard from "./components/StateGovernmentDashboard";
import {DeputyDashboard} from "./components/DeputyDashboard";
import VendorDashboard from "./components/VendorDashboard";
import AuditorDashboard from "./components/AuditorDashboard";
import AIAuditorDashboard from "./components/AIAuditorDashboard";
import { CitizenDashboard } from "./components/CitizenDashboard";
import HederaAuditWidget from "../components/HederaAuditWidget"; // <-- Import widget
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';
import FlowOrchestrator from "../components/FlowOrchestrator";

// Unifying Role type based on login page
type Role = "government" | "vendor" | "auditor" | "admin" | "citizen" | null;
type GovernmentType = "central" | "state" | "deputy" | null;

export default function DemoPage() {
  const [activeRole, setActiveRole] = useState<Role>(null);
  const [governmentType, setGovernmentType] = useState<GovernmentType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole") as Role;
    const govType = localStorage.getItem("governmentType") as GovernmentType;

    if (!token || !role) {
      // No auth: default to citizen for a smooth demo without a login channel
      setActiveRole("citizen");
      setIsLoading(false);
      return;
    }

    setActiveRole(role);
    if (role === "government") {
      setGovernmentType(govType);
    }
    setIsLoading(false);
  }, [router]);

  const renderDashboard = () => {
    if (isLoading) {
        return <div className="p-8 text-center">Loading Dashboard...</div>;
    }

    switch (activeRole) {
      case "government":
        switch (governmentType) {
          case "central":
            return <CentralGovernmentDashboard />;
          case "state":
            return <StateGovernmentDashboard />;
          case "deputy":
            return <DeputyDashboard />;
          default:
            // Fallback for government role if type is missing
            return <CentralGovernmentDashboard />;
        }
      case "vendor":
        return <VendorDashboard />;
      case "auditor":
        return <AuditorDashboard />;
      case "admin": // The "admin" role from login will see the AI Auditor dashboard
        return <AIAuditorDashboard />;
      case "citizen":
        return <CitizenDashboard />;
      default:
        // This case should ideally not be reached due to the useEffect check
        return <div className="p-8 text-center text-red-500">Error: Invalid user role.</div>;
    }
  };
  
  const getRoleTitle = () => {
    if (isLoading) return "F.O.R.G.E. Console";
    
    let title = "F.O.R.G.E. Console";
    switch(activeRole) {
        case 'government':
            const govTitle = governmentType ? governmentType.charAt(0).toUpperCase() + governmentType.slice(1) : '';
            title = `${govTitle} Government Dashboard`;
            break;
        case 'vendor':
            title = 'Vendor Dashboard';
            break;
        case 'auditor':
            title = 'Auditor Dashboard';
            break;
        case 'admin':
            title = 'AI Auditor & Admin Console';
            break;
        case 'citizen':
            title = 'Citizen Oversight Portal';
            break;
    }
    return title;
  }

  return (
    <div className="font-inter bg-[#000] text-[#EAEAEA]">
      <Header />
      <main className="pt-20">
        <section id="demo" className="py-16 lg:py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center pb-16">
              <p className="section-title">AUTHENTICATED SESSION</p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                {getRoleTitle()}
              </h2>
              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                This is a secure, role-based view of the F.O.R.G.E. system. All actions are recorded on an immutable ledger.
              </p>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto bg-black/50 rounded-2xl shadow-2xl overflow-hidden">
              {renderDashboard()}
            </div>

            {/* Hedera Audit Demo */}
            <div className="max-w-7xl mx-auto mt-10">
              <HederaAuditWidget />
              <FlowOrchestrator />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
