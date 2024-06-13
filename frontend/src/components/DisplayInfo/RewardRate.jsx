import React from 'react'
import { useContext,useState,useEffect } from 'react';
import Web3Context from '../Context/Web3Context';
import { toast } from "react-hot-toast";
import {ethers} from "ethers";
import "./Display.css";


export default function RewardRate() {

  const {stakingContract,selectedAccount}=useContext(Web3Context);
  const [rewardRate,setRewardRate]=useState("0");

  useEffect(()=>{
    const fetchRewardRate = async()=>{
       try{
          const rewardRateWei = await stakingContract.REWARD_RATE();
          const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(),18);
          setRewardRate(rewardRateEth)
        }catch(error){
          toast.error("Error fetching reward rate");
          console.error(error.message)
       }
    }
    stakingContract && fetchRewardRate()
  },[stakingContract,selectedAccount])

  return (
    <div className="reward-rate">
      <p>Reward Rate:</p>
      <span>{rewardRate} tokens/sec </span>
  </div>
  )
}
