"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd check for a token or session here
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // In a real app, you'd clear the token and notify the server
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.svg" width={24} height={24} alt="F.O.R.G.E. Logo" />
          <span className="text-xl font-bold tracking-tight text-white">F.O.R.G.E.</span>
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
