import React from 'react';
import './AlertModal.css';

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="alert-modal">
      <div className="alert-modal-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default AlertModal;
