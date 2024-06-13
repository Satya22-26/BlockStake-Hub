import React from 'react'
import { useEffect,useState,useContext } from 'react';
import {ethers} from "ethers";
import Web3Context from '../Context/Web3Context';
import { toast } from "react-hot-toast";
import "./Display.css";


export default function EarnedReward() {

  const {stakingContract,selectedAccount}=useContext(Web3Context);
  const [rewardVal,setRewardVal]=useState("0");

  useEffect(()=>{
    const fetchRewardVal=async()=>{
      try{
         const rewardValueWei = await stakingContract.earned(selectedAccount);
         const rewardValueEth = ethers.formatUnits(rewardValueWei,18).toString();
         const roundedReward = parseFloat(rewardValueEth).toFixed(3);
         setRewardVal(roundedReward)
      }catch(error){
        toast.error("Error fetching the reward:");
        console.error(error.message)
      }
    }
    const interval = setInterval(()=>{
      stakingContract && fetchRewardVal();
    },5000)
    return ()=> clearInterval(interval)
  },[stakingContract,selectedAccount])


  return (
    <div className="earned-reward">
    <p>Reward Earned:</p>
    <span>{rewardVal}</span>
</div>
  )
}
