"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Airdrop() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [amount, setAmount] = useState("1");
  const [status, setStatus] = useState("");

  const handleAirdrop = async () => {
  if (!publicKey) {
    setStatus("Wallet not connected!");
    return;
  }

  try {
    setStatus("Requesting airdrop...");
    const sig = await connection.requestAirdrop(
      publicKey,
      parseFloat(amount) * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(sig, "confirmed");
    setStatus(`✅ Airdropped ${amount} SOL! Tx: ${sig}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setStatus(`❌ Error: ${err.message}`);
    } else {
      setStatus("❌ Unknown error occurred");
    }
  }
};


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Solana Airdrop (Devnet)</h1>
      <WalletMultiButton className="mb-4" />
      {publicKey && (
        <div className="flex flex-col gap-3 items-center">
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded px-3 py-2"
            placeholder="Amount in SOL"
          />
          <button
            onClick={handleAirdrop}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Airdrop SOL
          </button>
          <p className="mt-2 text-sm">{status}</p>
        </div>
      )}
    </main>
  );
}
