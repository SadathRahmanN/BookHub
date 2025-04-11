// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuoteSection from './components/QuoteSection';
import LoginForm from './components/LoginForm';
import AdminForm from './components/AdminForm';
import SignUpForm from './components/SignUpForm';
import AdminDashboard from './components/dashboards/AdminDashboard';
import ClientDashboard from './components/dashboards/ClientDashboard';
import PatronDashboard from './components/dashboards/PatronDashboard';
import LibrarianDashboard from './components/dashboards/LibrarianDashboard';
import BookForm from './components/books/BookForm';
import BorrowBook from './components/borrow/BorrowBook';
import BorrowHistory from './components/borrow/BorrowHistory';
import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';
import './App.css';

function App() {
  const [formType, setFormType] = useState('home');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    fetch('/api/books/')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (username) => {
    setUsers(users.filter(user => user.username !== username));
  };

  const renderForm = () => {
    switch (formType) {
      case 'login':
        return <LoginForm />;
      case 'admin':
        return <AdminForm />;
      case 'signup':
        return <SignUpForm />;
      case 'home':
      default:
        return <LoginForm />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar setFormType={setFormType} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div id="home" className="main-content">
                  <div className="left-center">
                    <QuoteSection />
                  </div>
                  <div className="right-center">{renderForm()}</div>
                </div>

                <div id="books" className="section">
                  <h2>Books Available</h2>
                  <div className="books-list">
                    {books.length > 0 ? (
                      books.map((book) => (
                        <div className="book-card" key={book.id}>
                          <img
                            src={book.image_url}
                            alt={book.title}
                            className="book-image"
                          />
                          <h3>{book.title}</h3>
                          <p>Author: {book.author}</p>
                          <p>Publication Date: {book.publication_date}</p>
                        </div>
                      ))
                    ) : (
                      <p>Loading books...</p>
                    )}
                  </div>
                </div>

                <div id="about" className="section">
                  <AboutUs />
                </div>

                <div id="contact" className="section">
                  <ContactUs />
                </div>
              </>
            }
          />

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard setBookToEdit={setBookToEdit} setUserToEdit={setUserToEdit} />}
          />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/patron-dashboard" element={<PatronDashboard />} />
          <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
          <Route path="/book-form" element={<BookForm bookToEdit={bookToEdit} />} />
          <Route path="/borrow-book" element={<BorrowBook />} />
          <Route path="/borrow-history" element={<BorrowHistory />} />
          <Route path="/user-form" element={<UserForm userToEdit={userToEdit} onSubmit={handleAddUser} />} />
          <Route
            path="/user-list"
            element={
              <UserList
                users={users}
                onDelete={handleDeleteUser}
                setUserToEdit={setUserToEdit}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const AboutUs = () => (
  <div className="about-us">
    <h2>About Us</h2>
    <p>
      Welcome to BookHub. We are an online platform that connects book lovers from around the world.
      Our mission is to foster a community where readers can share, explore, and discover new books.
    </p>
  </div>
);

const ContactUs = () => (
  <div className="contact-us">
    <h2>Contact Us</h2>
    <p>
      We would love to hear from you! If you have any questions or need support, feel free to reach out
      to us via the following methods:
    </p>
    <div className="contact-details">
      <p>Email: <a href="mailto:support@bookhub.com">support@bookhub.com</a></p>
      <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
      <p>Address: 123 BookHub Lane, Library City, Bookworld</p>
    </div>
    <p>We aim to respond to all inquiries within 24 hours. Thank you for being part of our community!</p>
  </div>
);

export default App;
