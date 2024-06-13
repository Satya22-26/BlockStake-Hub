import React from 'react'
import { useContext,useEffect,useState} from 'react';
import Web3Context from '../Context/Web3Context';
import {ethers} from "ethers";
import { toast } from "react-hot-toast";
import "./Display.css";
import StakingContext from '../Context/StakingContext';


export default function StakedAmount() {

    const {stakingContract,selectedAccount}=useContext(Web3Context);
    const {isReload}=useContext(StakingContext);
    const [stakedAmount,setStakedAmount]=useState("0");

    useEffect(()=>{
        const fetchStakedBalance = async()=>{
           try{
              const amountStakedWei = await stakingContract.stakedBalance(selectedAccount)
              const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(),18);
              console.log(amountStakedEth);
              setStakedAmount(amountStakedEth)
           }catch(error){
            console.error(error.message)
           }
        }
        stakingContract && fetchStakedBalance()
      },[stakingContract,selectedAccount,isReload])

  return (
    <div className="staked-amount">
       <p>Staked Amount: </p> <span>{stakedAmount}</span>
    </div>
  )
}
