// src/components/books/BorrowBook.js

import React, { useState } from 'react';
import './BorrowBook.css';

const BorrowBook = ({ onBorrow }) => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookId.trim() && userId.trim()) {
      onBorrow({ bookId, userId, date: new Date().toISOString() });
      setMessage('✅ Book borrowed successfully!');
      setBookId('');
      setUserId('');
    } else {
      setMessage('⚠️ Please fill in all fields.');
    }
  };

  return (
    <div className="borrow-form-container">
      <h2>📘 Borrow a Book</h2>
      {message && <p className="borrow-message">{message}</p>}
      <form onSubmit={handleSubmit} className="borrow-form">
        <input
          type="text"
          placeholder="📚 Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="👤 User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Borrow</button>
      </form>
    </div>
  );
};

export default BorrowBook;
