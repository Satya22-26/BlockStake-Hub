import { useContext, useState } from "react";
import Button from "../Button/Button";
import Web3Context from "../Context/Web3Context";
import React from 'react'
import { toast } from "react-hot-toast";
import "./ClaimReward.css"


export default function ClaimReward() {

    const {stakingContract}=useContext(Web3Context);
   // const [transactionStatus,setTransactionStatus]=useState("");

    const claimReward = async()=>{
        try{
          const transaction = await stakingContract.getReward();
          await toast.promise(transaction.wait(),
          {
            loading: "Transaction is pending 😑",
            success: 'Transaction successful ✌️',
            error: 'Transaction failed 😴'
          });
        //      const receipt=transaction.wait()
        //   if(receipt.status === 1){
        //       setTransactionStatus("Transaction Is Successful")
        //       setTimeout(()=>{
        //         setTransactionStatus("")
        //       },5000) 
        //     } else{
        //       setTransactionStatus("Transaction failed. Please try again.");
        //     }
        }catch(error){
          console.error("Claim Reward Failed",error.message)
        }
       };


  return (
    <>
    <div className="claim-reward">
     <Button type="button" label="Claim Reward" onClick={claimReward}/>
     </div>
    </>
  )
}
