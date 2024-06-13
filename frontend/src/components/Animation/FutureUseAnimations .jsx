// FutureUseAnimations.js

import React from 'react';
import './FutureUseAnimations.css';
import image1 from '../../assets/ethereum.png';
import image2 from '../../assets/metamask.png';
import image3 from '../../assets/polygon.png';
import image4 from '../../assets/solidity.png';
import image5 from '../../assets/react.png';
import image6 from '../../assets/defi.png';

const FutureUseAnimations = () => {
  return (
    <div className="image-container">
      <img src={image1} alt="Image 1" className="image" />
      <img src={image2} alt="Image 2" className="image" />
      <img src={image3} alt="Image 3" className="image" />
      <img src={image4} alt="Image 4" className="image" />
      <img src={image5} alt="Image 5" className="image" />
      <img src={image6} alt="Image 6" className="image" />
    </div>
  );
};

export default FutureUseAnimations;
