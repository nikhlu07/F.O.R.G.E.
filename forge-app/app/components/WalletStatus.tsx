"use client";
import React, { useEffect, useState } from "react";

// Minimal wallet-connect placeholder.
// For HashPack/Blade integration, replace stubs with real SDK calls.

type WalletInfo = {
  accountId?: string;
  network?: string;
};

export default function WalletStatus() {
  const [wallet, setWallet] = useState<WalletInfo>({});
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Detect presence of a wallet SDK (placeholder)
    const hasWalletExtension = typeof (window as unknown as Record<string, unknown>).hashconnect !== "undefined" || typeof (window as unknown as Record<string, unknown>).blade !== "undefined";
    if (!hasWalletExtension) {
      setMessage("No Hedera wallet detected. Install HashPack or Blade.");
    } else {
      setMessage("Wallet extension detected. Click Connect to continue.");
    }
  }, []);

  const handleConnect = async () => {
    // Placeholder: In real flow, initialize wallet SDK and request accountId.
    // For now, prompt the user to input their Account ID for demo purposes.
    const input = prompt("Enter Hedera Account ID (e.g., 0.0.x) for demo:");
    if (input && input.trim().length > 0) {
      setWallet({ accountId: input.trim(), network: process.env.NEXT_PUBLIC_HEDERA_NETWORK || "testnet" });
      setConnected(true);
      setMessage("Connected (demo)");
    }
  };

  const handleDisconnect = () => {
    setWallet({});
    setConnected(false);
    setMessage("Disconnected");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-gray-400">
        {connected ? (
          <span>
            <span className="font-semibold text-cyan-400">{wallet.accountId}</span>
            {wallet.network ? <span className="ml-2 text-gray-500">({wallet.network})</span> : null}
          </span>
        ) : (
          <span>{message || "Not connected"}</span>
        )}
      </div>
      {connected ? (
        <button
          onClick={handleDisconnect}
          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}