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
import './App.css';

function App() {
  const [formType, setFormType] = useState('home');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books/')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

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
        {/* Navbar visible on all pages */}
        <Navbar setFormType={setFormType} />

        <Routes>
          {/* Home/Login page route */}
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

                {/* Books Section */}
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

                {/* About Section */}
                <div id="about" className="section">
                  <AboutUs />
                </div>

                {/* Contact Section */}
                <div id="contact" className="section">
                  <ContactUs />
                </div>
              </>
            }
          />

          {/* Dashboard routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/patron-dashboard" element={<PatronDashboard />} />
          <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

// About Us Component
const AboutUs = () => (
  <div className="about-us">
    <h2>About Us</h2>
    <p>
      Welcome to BookHub. We are an online platform that connects book lovers from around the world.
      Our mission is to foster a community where readers can share, explore, and discover new books.
    </p>
  </div>
);

// Contact Us Component
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
