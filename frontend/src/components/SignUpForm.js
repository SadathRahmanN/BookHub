// src/components/SignUpForm.js

import React from 'react';
import './LoginForm.css';  // You can reuse LoginForm styles or create new ones if needed

const SignUpForm = () => {
  return (
    <div className="login-form">
      <h2>Sign Up</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
