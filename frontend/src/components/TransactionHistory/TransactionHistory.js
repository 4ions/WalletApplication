import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../actions/walletActions';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const transactions = useSelector((state) => state.wallet.transactions);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(fetchTransactions(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(transactions.totalPages));
  }, [transactions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="transaction-history-container">
      <h2 className="transaction-history-heading">Transaction History</h2>
      <ul className="transaction-list">
        {transactions.transactions?.map((transaction, index) => (
          <li
            key={index}
            className={`transaction-item ${transaction.type.toLowerCase()}`}
          >
            {transaction.type === 'Send' && (
              <div className="arrow-up"></div>
            )}
            <div className="transaction-type">{transaction.type}</div>
            <div className="transaction-details">
              <div className="transaction-detail">
                <span className="detail-label">From:</span>
                <span className="detail-value">{transaction.details.addressFrom}</span>
              </div>
              <div className="transaction-detail">
                <span className="detail-label">To:</span>
                <span className="detail-value">{transaction.details.addressTo}</span>
              </div>
              <div className="transaction-detail">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">{transaction.details.amount}</span>
              </div>
              <div className="transaction-detail">
                <span className="detail-label">Coin:</span>
                <span className="detail-value">{transaction.details.coin}</span>
              </div>
            {transaction.type === 'Receive' && (
              <div className="arrow-down"></div>
            )}
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
