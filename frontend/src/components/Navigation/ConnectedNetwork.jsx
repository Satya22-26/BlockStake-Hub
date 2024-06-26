import { useContext } from "react";
import Web3Context from "../Context/Web3Context";
import React from 'react'

const ConnectedNetwork = ()=>{
   const {chainId}=useContext(Web3Context);
   if(chainId===null){
      return <p className="network">Not connected</p>;
   }
   else if (chainId === 80002) {
      return <p className="network">Amoy Testnet</p>;
    } else {
      return <p className="network"> Network Not Detected</p>;
    }
}
export default ConnectedNetwork