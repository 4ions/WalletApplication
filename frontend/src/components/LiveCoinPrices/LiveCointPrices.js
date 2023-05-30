import React, { useEffect, useState } from 'react';
import './LiveCoinPrices.css';

const LiveCoinPrices = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const trendingResponse = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const trendingData = await trendingResponse.json();

        const coinIds = trendingData.coins.map(coin => coin.item.id).join(',');
        const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`);
        const priceData = await priceResponse.json();

        const updatedCoins = trendingData.coins.map(coin => {
          const coinId = coin.item.id;
          const currentPrice = priceData[coinId]?.usd;
          return { ...coin, currentPrice };
        });

        setCoins(updatedCoins);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, []);

  return (
    <div className="live-coin-prices-container">
      <h2 className="live-coin-prices-heading">Trending Coins</h2>
      <ul className="price-list">
        {coins.map((coin) => (
          <li key={coin.item.id} className="price-item">
            <div className="coin-container">
              <span className="coin-name">{coin.item.name}</span>
              <img src={coin.item.small} alt={coin.item.name} />
              <span className="coin-price">${coin.currentPrice}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveCoinPrices;
