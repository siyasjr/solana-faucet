"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import React , { useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, } from "@solana/web3.js";


export function SendTokens(){

    const {publicKey, sendTransaction } = useWallet();
    const {connection} = useConnection();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    async function sendTokens() {
        if(!publicKey){
            alert("wallet not connected");
            return;
        }

        if(!to || !amount){
            alert("Please enter both recepient and amount");
            return;
        }

        try{

            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
            if(isNaN(lamports) || lamports <=0 ){
                alert("Invalid amount");
                return;
            }

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(to),
                    lamports,
                })
            )

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, "confirmed");

            alert(`✅ Sent ${amount} SOL to ${to}\nTx: ${signature}`);
        }

        catch(err){
            console.log(err);
            alert("❌Failed to send transaction");

        }

    }
     return (
    <main className="flex flex-col items-center justify-centerp-8 gap-3">
      <h1 className="text-2xl font-bold mb-6">Send Solana</h1>
      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="number"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        onClick={sendTokens}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </main>
  );


}