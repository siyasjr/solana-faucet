import React from 'react';
import Airdrop from './Airdrop';
import Showbalance from './showBalance'
import { SignMessage } from './SignMessage';
import { SendTokens } from './sendSolana';




const Home = () => {
  return (
    <>
  < Airdrop />
  < Showbalance />

  <SignMessage />

  <SendTokens />
  
  
  </>
  );
}  

export default Home  