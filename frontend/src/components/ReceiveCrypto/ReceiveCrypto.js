import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateNewAddress } from '../../actions/walletActions';
import './ReceiveCrypto.css';

const ReceiveCrypto = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');

  const generateAddress = async () => {
    const generatedAddress = await dispatch(generateNewAddress());
    setAddress(generatedAddress);
  };

  return (
    <div className="receive-crypto-container">
      <h2 className="receive-crypto-heading">Receive Cryptocurrency</h2>
      <p>{address}</p>
      <button className="generate-button" onClick={generateAddress}>Show Address</button>
    </div>
  );
};

export default ReceiveCrypto;
