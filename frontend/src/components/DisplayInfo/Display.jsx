import React from 'react'
import StakedAmount from './StakedAmount'
import RewardRate from './RewardRate'
import EarnedReward from './EarnedReward'

export default function Display() {
  return (
    <div>
      <StakedAmount/>
      <RewardRate/>
      <EarnedReward/>
    </div>
  )
}
