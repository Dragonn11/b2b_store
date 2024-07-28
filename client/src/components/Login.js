import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import RegisterModal from './RegisterModal';
import API_URL from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/products');
    } catch (err) {
      console.error('Error logging in', err);
    }
  };

  const handleRegisterSuccess = () => {
    alert('Registration successful! Please log in.');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setIsRegisterModalOpen(true)}>Register</button>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
};

export default Login;
