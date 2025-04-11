// src/components/dashboards/PatronDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const PatronDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleManageBooks = () => alert('Manage My Books clicked!');
  const handleReturnBook = () => alert('Return Book clicked!');
  const handleRequestExtension = () => alert('Request Extension clicked!');

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
        <h2>📘 Patron Dashboard</h2>
        <div className="button-grid">
          <button onClick={handleManageBooks} className="dash-btn primary">📘 Manage My Books</button>
          <button onClick={handleReturnBook} className="dash-btn danger">📤 Return Book</button>
          <button onClick={handleRequestExtension} className="dash-btn info">⏳ Request Extension</button>
        </div>
      </div>
    </div>
  );
};

export default PatronDashboard;