import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookForm.css';

const BookForm = ({ bookToEdit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || '');
      setAuthor(bookToEdit.author || '');
      setGenre(bookToEdit.genre || '');
      setIsbn(bookToEdit.isbn || '');
      setImagePreview(bookToEdit.image || ''); // Assuming image URL is present in bookToEdit
    }
  }, [bookToEdit]);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Temporary URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, genre, isbn, image };

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('genre', genre);
      formData.append('isbn', isbn);
      if (image) formData.append('image', image);

      const response = await fetch(
        bookToEdit ? `/api/books/${bookToEdit.id}/` : '/api/books/',
        {
          method: bookToEdit ? 'PUT' : 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit book data');
      }

      // Clear form and redirect
      setTitle('');
      setAuthor('');
      setGenre('');
      setIsbn('');
      setImage(null);
      setImagePreview(null);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error submitting book:', error);
    }
  };

  return (
    <div className="book-form-container">
      <h2>{bookToEdit ? 'Edit Book' : 'Add Book'}</h2>
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
        
        <label htmlFor="image">Upload Book Image:</label>
        <input
          type="file"
          accept="image/*"
          id="image"
          onChange={handleImageChange}
        />
        {imagePreview && <img src={imagePreview} alt="Book Preview" className="book-image-preview" />}
        
        <button type="submit">{bookToEdit ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default BookForm;
