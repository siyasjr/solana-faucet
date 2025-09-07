"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect, use } from "react";


export default function Showbalance() {

    const {connection} = useConnection();
    const wallet = useWallet();
    const [balance , setBalance] = useState<number | null>(null);


    useEffect( ()=> {
        async function fetchBalance(){
            if(wallet.publicKey){
                const lamports = await connection.getBalance(wallet.publicKey);
                setBalance(lamports / LAMPORTS_PER_SOL);
            }
        }
        fetchBalance();

    }, [wallet.publicKey, connection]);

   
    return (

        <> 
        <main className="flex flex-col items-center justify-center  p-8">
          <h2 className="text-2xl font-bold mb-6">Balance</h2>
          
          
            <div className="flex flex-col gap-3 items-center">
             
              <button
                
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {balance !== null ? balance.toFixed(2) : "Connect to wallet first"}
              </button>
              
            </div>
         
        </main>
    
</>
    );
}