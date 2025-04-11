// src/components/books/BookList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';  // Import BookList-specific styles

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/library/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the books!", error);
      });
  }, []);

  return (
    <div className="book-list">
      <h2>Books Available</h2>
      <div className="books-container">
        {books.map(book => (
          <div className="book-item" key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
