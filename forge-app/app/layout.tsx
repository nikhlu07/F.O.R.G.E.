import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletStatus from "./components/WalletStatus";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F.O.R.G.E.",
  description: "Financial Oversight & Resource Governance Engine",
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="FORGE" width={24} height={24} />
            <span className="text-sm text-gray-400">F.O.R.G.E.</span>
          </div>
          <WalletStatus />
        </header>
        {children}
      </body>
    </html>
  );
}
