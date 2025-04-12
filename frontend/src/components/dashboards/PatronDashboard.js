// src/components/dashboards/PatronDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const PatronDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleManageBooks = () => alert('Manage My Books clicked!');
  const handleReturnBook = () => alert('Return Book clicked!');
  const handleViewBorrowedBooks = () => navigate('/borrowed-books');
  const handleRequestBookReturn = () => navigate('/return-request');
  const handleRequestBookExtension = () => navigate('/extension-request');

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
        <h2>📘 Patron Dashboard</h2>
        <div className="button-grid">
          <button onClick={handleManageBooks} className="dash-btn primary">📘 Manage My Books</button>
          <button onClick={handleReturnBook} className="dash-btn danger">📤 Return Book</button>
          <button onClick={handleViewBorrowedBooks} className="dash-btn warning">📚 View Borrowed Books</button>
          <button onClick={handleRequestBookReturn} className="dash-btn success">🔄 Request Book Return</button>
          <button onClick={handleRequestBookExtension} className="dash-btn success">⏳ Request Book Extension</button>
        </div>
      </div>
    </div>
  );
};

export default PatronDashboard;
