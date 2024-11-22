// src/components/Navbar.js

import React from 'react';
import './Navbar.css';  // Import Navbar-specific styles

const Navbar = ({ setFormType }) => {
  return (
    <div className="top-navbar">
      {/* BookHub Heading and Icon */}
      <div className="logo">
        <span>📚 BookHub</span>
      </div>

      {/* Search bar and search icon */}
      <div className="search-container">
        <input type="text" placeholder="Search books or users..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="#home" className="nav-button" onClick={() => setFormType('home')}>Home</a>
        <a href="#books" className="nav-button">Books</a>
        <a href="#about" className="nav-button">About Us</a>
        <a href="#contact" className="nav-button">Contact Us</a>
      </div>

      {/* Admin, Login, Sign Up buttons */}
      <div className="auth-links">
        <button onClick={() => setFormType('admin')} className="auth-button admin-button">Admin</button>
        <button onClick={() => setFormType('login')} className="auth-button">Login</button>
        <button onClick={() => setFormType('signup')} className="auth-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
