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
        <div> 
            <p>SOL Balance: </p>
            <div> {balance !== null ? balance.toFixed(2) : "Loading.."}</div>
        </div>


    );
}