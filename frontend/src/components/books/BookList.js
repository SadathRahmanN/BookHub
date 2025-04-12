import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://127.0.0.1:8000/library/api/books/')
      .then(response => setBooks(response.data))
      .catch(error => console.error("There was an error fetching the books!", error));
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios.delete(`http://127.0.0.1:8000/library/api/books/${bookId}/`)
        .then(() => fetchBooks())
        .catch(error => console.error("Error deleting book:", error));
    }
  };

  const handleEdit = (book) => {
    navigate('/book-form', { state: { bookToEdit: book } });
  };

  const handleViewBook = (book) => {
    navigate('/book-details', { state: { book } });
  };

  return (
    <div className="book-list">
      <h2>📚 Books Available</h2>
      <div className="books-container">
        {books.length > 0 ? (
          books.map(book => (
            <div className="book-item" key={book.id}>
              {book.image_url && (
                <img src={book.image_url} alt={book.title} className="book-image" />
              )}
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>

              <div className="book-actions">
                <button className="edit-btn" onClick={() => handleEdit(book)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(book.id)}>🗑️ Delete</button>
                <button className="view-btn" onClick={() => handleViewBook(book)}>👁️ View</button>
              </div>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
