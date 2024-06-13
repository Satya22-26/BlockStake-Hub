import { useState,useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Button from "../Button/Button";
import Web3Context from "../Context/Web3Context";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import "./Wallet.css";
import {toast} from "react-hot-toast";
import { useContext } from "react";


const Wallet =({children})=>{
    const [state,setState]=useState({
       provider:null,
       account:null,
       stakingContract:null,
       stakeTokenContract:null,
       chianId:null
    })
    const [isLoading,setIsLoading]=useState(false);
    
    useEffect(()=>{
      window.ethereum.on('accountsChanged',()=>handleAccountChange(setState))
      window.ethereum.on('chainChanged',()=>handleChainChange(setState)) 
      
      return()=>{
       window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState))
       window.ethereum.removeListener('chainChanged',()=>handleChainChange(setState)) 
      }
   }, [])

    const handleWallet = async()=>{
       try{
           setIsLoading(true);
           const { provider,selectedAccount,stakingContract,stakeTokenContract,chainId} = await connectWallet();
           console.log(provider,selectedAccount,stakingContract,stakeTokenContract,chainId);
           setState({provider,selectedAccount,stakingContract,stakeTokenContract,chainId})
   
       }catch(error){
          toast.error("Error connecting wallet")
          console.error(error.message)
       }finally{
           setIsLoading(false)
       }
    }
    return (
        <div className="Connect-Wallet">
          <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
          {isLoading && <p>Loading...</p>}
          <button onClick={handleWallet} type="button" label="Connect Wallet"  style={{ // Use inline style for color and background color
        color: "white",
        backgroundColor: "var(--primary-color)",
        marginBottom: "20px",
      }}>Connect Wallet
    </button>
        </div>
      )

   }
   export default Wallet;