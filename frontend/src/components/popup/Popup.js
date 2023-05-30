import React from 'react';
import './Popup.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <span className="close-icon">&times;</span>
        </button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Popup;
