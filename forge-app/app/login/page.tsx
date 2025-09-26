"use client";

import { useState } from "react";
import { ShieldCheckIcon, BuildingOffice2Icon, EyeIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Reveal } from '../components/Animations';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';
import { useRouter } from 'next/navigation';

type Role = "government" | "vendor" | "auditor" | "admin" | "citizen";
type GovernmentType = "central" | "state" | "deputy";

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<Role>("government");
  const [governmentType, setGovernmentType] = useState<GovernmentType>("central");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password, role: activeRole, ...(activeRole === "government" && { governmentType }) });

    // Simulate a successful login by setting a token and role
    localStorage.setItem("authToken", "dummy-token-for-demo");
    localStorage.setItem("userRole", activeRole);
    if (activeRole === "government") {
      localStorage.setItem("governmentType", governmentType);
    } else {
      localStorage.removeItem("governmentType");
    }


    router.push('/demo');

  };

  return (
    <div className="font-inter bg-[#0A0A0A] text-[#EAEAEA]">
      <Header />
      <main className="pt-20">
        <section id="login" className="py-16 lg:py-24 bg-black">
          <Reveal>
            <div className="container mx-auto px-6">
              <div className="text-center pb-16">
                <p className="section-title">LOGIN</p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mt-4">
                  Access Your Dashboard
                </h2>
                <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  Please enter your credentials and select your role to continue.
                </p>
              </div>

              <div className="max-w-lg mx-auto">
                {/* Role Switcher */}
                <div className="mb-8">
                  <div className="flex justify-center gap-1 p-1 border-gray-800 rounded-full">
                      <RoleButton name="Government" icon={<ShieldCheckIcon className="w-5 h-5" />} role="government" activeRole={activeRole} onClick={setActiveRole} />
                      <RoleButton name="Vendor" icon={<BuildingOffice2Icon className="w-5 h-5" />} role="vendor" activeRole={activeRole} onClick={setActiveRole} />
                      <RoleButton name="Auditor" icon={<EyeIcon className="w-5 h-5" />} role="auditor" activeRole={activeRole} onClick={setActiveRole} />
                      <RoleButton name="Admin" icon={<UserCircleIcon className="w-5 h-5" />} role="admin" activeRole={activeRole} onClick={setActiveRole} />
                      <RoleButton name="Citizen" icon={<UserGroupIcon className="w-5 h-5" />} role="citizen" activeRole={activeRole} onClick={setActiveRole} />
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6 bg-black/50 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
                  {activeRole === 'government' && (
                    <div>
                      <label htmlFor="governmentType" className="block text-sm font-medium text-gray-300">
                        Government Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="governmentType"
                          name="governmentType"
                          required
                          value={governmentType}
                          onChange={(e) => setGovernmentType(e.target.value as GovernmentType)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
                        >
                          <option value="central">Central</option>
                          <option value="state">State</option>
                          <option value="deputy">Deputy</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                    >
                      Login
                    </button>
                  </div>
                </form>
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
    type="button"
    onClick={() => onClick(role)}
    className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
      activeRole === role
        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]"
        : "text-gray-300 hover:bg-white/10"
    }`}
  >
    {icon}
    <span>{name}</span>
  </button>
);
