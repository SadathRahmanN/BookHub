import React, { useState } from 'react';
import './BookForm.css';

const BookForm = ({ onSubmit, initialData = {}, buttonText = 'Add Book' }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [genre, setGenre] = useState(initialData.genre || '');
  const [isbn, setIsbn] = useState(initialData.isbn || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, genre, isbn };
    onSubmit(newBook);
    setTitle('');
    setAuthor('');
    setGenre('');
    setIsbn('');
  };

  return (
    <div className="book-form-container">
      <h2>{buttonText}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default BookForm;
