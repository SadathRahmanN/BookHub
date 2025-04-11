// src/components/SignUpForm.js

import React, { useState } from 'react';
import './LoginForm.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    countryCode: '+91',
    phone: '',
    address: '',
    userType: 'Client',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, phone, address } = formData;

    if (!username || !email || !password || !phone || !address) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
    } else {
      setMessage({ type: 'success', text: 'Signup successful. Pending admin approval.' });

      // TODO: Send to backend or save in state/store
      console.log('Signup Data:', formData);
    }
  };

  return (
    <div className="login-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="phone-row">
          <select
            className="country-code-input"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            required
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+971">🇦🇪 +971</option>
          </select>
          <input
            type="tel"
            className="phone-number-input"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="Client">Client</option>
          <option value="Patron">Patron</option>
          <option value="Librarian">Librarian</option>
        </select>

        <button type="submit">Sign Up</button>

        {message.text && (
          <div className={message.type === 'error' ? 'error' : 'success'}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
