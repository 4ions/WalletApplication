import React, { useState, useEffect } from 'react';
import './SendCrypto.css';

const SendCrypto = ({ handleShowPopup }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [coins, setCoins] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();

    const to = localStorage.getItem('address');
    try {
      const url = `http://localhost:3200/api/v1/transactions/${address}/${to}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, coin: selectedCrypto }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to send cryptocurrency.');
      }

      handleShowPopup('La transacción se realizó con éxito.');
    } catch (error) {
      console.error(error);
      handleShowPopup('Algo paso, intente de nuevo. Error: ' + error.message);
    }
  };

  useEffect(() => {
    // Get coins
    const fetchCoinData = async () => {
      try {
        const coinResponse = await fetch('http://localhost:3200/api/v1/coin');
        const coinData = await coinResponse.json();
        setCoins(coinData);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, []);

  return (
    <div className="send-crypto-container">
      <h2 className="send-crypto-heading">Send Cryptocurrency</h2>
      <form className="send-form" onSubmit={handleSend}>
        <select
          className="send-dropdown"
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
        >
          <option value="">Select Cryptocurrency</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.name}>
              {coin.name}
            </option>
          ))}
        </select>
        <input
          className="send-input"
          type="text"
          placeholder="Recipient Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="send-input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendCrypto;
