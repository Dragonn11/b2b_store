import React, { useState } from 'react';
import axios from 'axios';
import './RegisterModal.css';
import API_URL from '../config';

const RegisterModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/register`, { name, email, password });
      onRegisterSuccess();
      onClose();
    } catch (err) {
      console.error('Error registering user', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RegisterModal;
