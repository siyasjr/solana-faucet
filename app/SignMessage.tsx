// Verify wallet ownership by asking the user to sign a message.
"use client";

import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React from "react";
import { useState } from "react";


export function SignMessage() {
    const { publicKey, signMessage} = useWallet();
    const [message , setMessage] = useState("");

    const onClick = async() => {
        if(!publicKey) {
            alert("Wallet not connected");
            return;
        }
        if(!signMessage){
            alert("Wallet does not support message signing");
            return;
        }

        if(!message.trim()){
            alert("Please enter a message");
            return;
        }

        try{
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBytes());

        if(!isValid){
            alert("Messgae signature invalid");
            return;
        }

        alert(`✅ Message Signature: ${bs58.encode(signature)}`);
        }

        catch (err){
            console.log(err);
            alert("❌ Error Signing Message")
        }

    }

    return (
    <main className="flex flex-col items-center justify-center p-8 gap-3">
      <h1 className="text-2xl font-bold mb-6">Sign Message</h1>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded px-3 py-2 "
      />
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Sign Message
      </button>
    </main>
  );

}