// src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the LoginForm-specific styles

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Clear error before processing
    setError('');

    // Simulate role-based login logic
    let userRole = '';
    if (username.toLowerCase() === 'admin') {
      userRole = 'admin-dashboard';
    } else if (username.toLowerCase() === 'librarian') {
      userRole = 'librarian-dashboard';
    } else if (username.toLowerCase() === 'patron') {
      userRole = 'patron-dashboard';
    } else {
      userRole = 'client-dashboard';
    }

    // Navigate to the respective dashboard
    navigate(`/${userRole}`);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
