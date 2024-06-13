import { ethers } from "ethers";
import Button from "../Button/Button";
import { useContext,useState,useRef } from "react";
import Web3Context from "../Context/Web3Context";
import React from 'react'
import StakingContext from "../Context/StakingContext";
import "./Withdraw.css";
import toast from "react-hot-toast";

export default function Withdraw() {

    const {stakingContract}=useContext(Web3Context);
    const {isReload,setIsReload}=useContext(StakingContext)
    const withdrawStakeAmountRef = useRef();

    const withdrawStakeToken=async(e)=>{
        e.preventDefault();
        const amount = withdrawStakeAmountRef.current.value.trim();
        console.log(amount)
        if(isNaN(amount) || amount<=0){
         console.error("Please enter a valid positive number");
         return;
        }
        const amountToWithdraw = ethers.parseUnits(amount,18).toString();
        try{
         const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw)
         await toast.promise(transaction.wait(),
         {
           loading: "Transaction is pending 😑",
           success: 'Transaction successful ✌️',
           error: 'Transaction failed 😴'
         });
         withdrawStakeAmountRef.current.value = "";
         setIsReload(!isReload);
        //  const receipt = await transaction.wait();
        //  if (receipt.status === 1) {
        //      setIsReload(!isReload);
        //      withdrawStakeAmountRef.current.value = "";
        //    } else {
        //        //toast.error("Transaction failed. Please try again.")
        //        console.log("Transaction Failed")
        //    }
         } catch (error) {
           toast.error("Withdrawal Failed");
           console.error(error.message)
         }
       };

  return (
    <form className="withdraw-form" onSubmit={withdrawStakeToken}>
    <label>Withdraw Token:</label>
    <input type="text" ref={withdrawStakeAmountRef} />
    <Button className="Wall"
    onClick={withdrawStakeToken} type="submit" label="Withdraw Staked Token" />
</form>
  )
}

