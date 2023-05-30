import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [BTC, setBTC] = useState("");
  const [ETH, setETH] = useState("");
  const [ADA, setADA] = useState("");
  const [SOL, setSOL] = useState("");
  const [LTC, setLTC] = useState("");


  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const userId = localStorage.getItem('activeUserID');
        const trendingResponse = await fetch(`http://localhost:3200/api/v1/userCoins/${userId}`);
        const trendingData = await trendingResponse.json();

        for (let i = 0; i < trendingData.length; i++) {
          if (trendingData[i].coinId === 1) {
            setBTC(trendingData[i].amount);
          }
          if (trendingData[i].coinId === 2) {
            setETH(trendingData[i].amount);
          }
          if (trendingData[i].coinId === 3) {
            setADA(trendingData[i].amount);
          }
          if (trendingData[i].coinId === 4) {
            setSOL(trendingData[i].amount);
          }
          if (trendingData[i].coinId === 5) {
            setLTC(trendingData[i].amount);
          }
        }

        console.log(trendingData)
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, []);
  const balance = useSelector(state => state.balance);
  const cryptoBalances = [
    { name: 'Bitcoin', balance: BTC, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579' },
    { name: 'Ethereum', balance: ETH, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880' },
    { name: 'Cardano', balance: ADA, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860' },
    { name: 'Solana', balance: SOL, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422' },
    { name: 'Litecoin', balance: LTC, image: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' }
  ];
  
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <p className="balance">Balance: {balance}</p>
      <div className="crypto-balances">
        {cryptoBalances.map((crypto, index) => (
          <div key={index} className="crypto-balance">
            <img src={crypto.image} alt={crypto.name} />
            <div className="crypto-info">
              <span className="crypto-name">{crypto.name}</span>
              <span className="crypto-balance">{crypto.balance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
