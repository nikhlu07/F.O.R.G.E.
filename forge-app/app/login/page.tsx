"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "../components/Animations";
import { Header } from "../components/landing/Header";
import { Footer } from "../components/landing/Footer";

// Role and government type definitions
type Role = "government" | "vendor" | "auditor" | "admin" | "citizen" | null;
type GovernmentType = "central" | "state" | "deputy" | null;

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [govType, setGovType] = useState<GovernmentType>(null);

  const handleContinue = () => {
    if (!selectedRole) return;

    // Persist a simple demo-auth token and role info
    localStorage.setItem("authToken", "demo-token");
    localStorage.setItem("userRole", selectedRole);
    if (selectedRole === "government" && govType) {
      localStorage.setItem("governmentType", govType);
    } else {
      localStorage.removeItem("governmentType");
    }

    router.push("/demo");
  };

  const isContinueDisabled =
    !selectedRole || (selectedRole === "government" && !govType);

  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <Header />
      <main className="pt-20">
        <section id="login" className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
              <div className="text-center pb-12">
                <p className="section-title">ROLE-BASED ACCESS</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                  Choose Your Role
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  Select a role to access the appropriate dashboard. Government users can choose their unit.
                </p>
              </div>

              {/* Role selector */}
              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "government", label: "Government" },
                  { key: "vendor", label: "Vendor" },
                  { key: "auditor", label: "Auditor" },
                  { key: "admin", label: "Admin" },
                  { key: "citizen", label: "Citizen" },
                ].map((r) => (
                  <button
                    key={r.key}
                    onClick={() => {
                      setSelectedRole(r.key as Role);
                      if (r.key !== "government") setGovType(null);
                    }}
                    type="button"
                    aria-pressed={selectedRole === r.key}
                    title={`Select ${r.label} role`}
                    className={`px-5 py-4 rounded-xl border transition-all duration-200 text-left cursor-pointer hover:border-cyan-300 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      selectedRole === r.key
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-gray-700 bg-gray-900"
                    }`}
                  >
                    <span className="block text-white font-semibold">{r.label}</span>
                    <span className="block text-gray-400 text-sm">{r.key}</span>
                  </button>
                ))}
              </div>

              {/* Government sub-selection */}
              {selectedRole === "government" && (
                <div className="max-w-3xl mx-auto mt-8">
                  <p className="text-gray-300 mb-3">Select government type:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { key: "central", label: "Central" },
                      { key: "state", label: "State" },
                      { key: "deputy", label: "Deputy" },
                    ].map((g) => (
                      <button
                        key={g.key}
                        onClick={() => setGovType(g.key as GovernmentType)}
                        type="button"
                        aria-pressed={govType === g.key}
                        title={`Select ${g.label} government`}
                        className={`px-4 py-3 rounded-xl border transition-all duration-200 text-left cursor-pointer hover:border-cyan-300 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          govType === g.key
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-gray-700 bg-gray-900"
                        }`}
                      >
                        <span className="block text-white font-semibold">{g.label}</span>
                        <span className="block text-gray-400 text-sm">{g.key}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="max-w-3xl mx-auto mt-10">
                <button
                  onClick={handleContinue}
                  disabled={isContinueDisabled}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
                <p className="mt-4 text-sm text-gray-400 text-center">
                  Your selection sets a demo token and routes to the appropriate dashboard.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
