import React, { useContext, useRef } from 'react';
import { ethers } from 'ethers';
import Web3Context from '../Context/Web3Context';
import Button from '../Button/Button';
import { toast } from 'react-hot-toast';
import "./Stake.css";

export default function TokenApproval() {
  const { stakeTokenContract, stakingContract } = useContext(Web3Context);
  const approvedTokenRef = useRef();

  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      console.error('Please enter a valid positive number');
      return;
    }
    const amountToSend = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend); //.target gives address of deployed contract

      await toast.promise(
        transaction.wait().then((receipt) => {
          console.log('Transaction successful:', receipt);
          return receipt;
        }),
        {
          loading: 'Transaction is pending 😑',
          success: 'Transaction successful ✌️',
          error: 'Transaction failed 😴',
        }
      );

      approvedTokenRef.current.value = '';
    } catch (error) {
      toast.error('Token Approval Failed');
      console.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={approveToken} className="token-amount-form">
        <label className="token-input-label">Token Approval:</label>
        <input type="text" ref={approvedTokenRef} />
        <Button type="submit" label="Token Approval" />
      </form>
    </div>
  );
}
