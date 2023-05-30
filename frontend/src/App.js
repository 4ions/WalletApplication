import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import SendCrypto from './components/SendCrypto/SendCrypto';
import ReceiveCrypto from './components/ReceiveCrypto/ReceiveCrypto';
import LiveCoinPrices from './components/LiveCoinPrices/LiveCointPrices';
import UserBar from './components/UserBar/UserBar';
import Popup from './components/popup/Popup'; // Importa el componente Popup
import './App.css';

const App = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const activeUserID = localStorage.getItem('activeUserName');
    if (activeUserID) {
      setActiveUser(activeUserID);
    }
  }, [setActiveUser]);

  const handleShowPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <Provider store={store}>
      <div className="App">
        <UserBar activeUser={activeUser} />
        <header className="App-header">
          <h1 className="App-title">Wallet App</h1>
        </header>
        <main className="App-content">
          <section className="App-section">
            <Dashboard />
          </section>
          <section className="App-section">
            <TransactionHistory />
          </section>
          <section className="App-section">
            <SendCrypto handleShowPopup={handleShowPopup} />
          </section>
          <section className="App-section">
            <ReceiveCrypto handleShowPopup={handleShowPopup} />
          </section>
          <section className="App-section">
            <LiveCoinPrices />
          </section>
        </main>
        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} Wallet App. All rights reserved.</p>
        </footer>
        {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
      </div>
    </Provider>
  );
};

export default App;
