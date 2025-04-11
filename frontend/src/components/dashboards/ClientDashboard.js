// src/components/dashboards/ClientDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleViewBooks = () => alert('View Books clicked!');
  const handleSearchBooks = () => alert('Search Books clicked!');
  const handleUpdateProfile = () => alert('Update Profile clicked!');

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
        <h2>📖 Client Dashboard</h2>
        <div className="button-grid">
          <button onClick={handleViewBooks} className="dash-btn primary">📚 View Books</button>
          <button onClick={handleSearchBooks} className="dash-btn info">🔍 Search Books</button>
          <button onClick={handleUpdateProfile} className="dash-btn warning">👤 Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
