// src/components/LoginForm.js

import React from 'react';
import './LoginForm.css';  // Import the LoginForm-specific styles

const LoginForm = () => {
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
