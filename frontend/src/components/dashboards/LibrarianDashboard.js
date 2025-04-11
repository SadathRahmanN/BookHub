// src/components/dashboards/LibrarianDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const LibrarianDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleAddBook = () => alert('Add Book clicked!');
  const handleEditBook = () => alert('Edit Book clicked!');
  const handleDeleteBook = () => alert('Delete Book clicked!');
  const handleViewInventory = () => alert('View Inventory clicked!');
  const handleApproveClientPatron = () => alert('Approve Client/Patron clicked!');

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
        <h2>📚 Librarian Dashboard</h2>
        <div className="button-grid">
          <button onClick={handleAddBook} className="dash-btn primary">📕 Add Book</button>
          <button onClick={handleEditBook} className="dash-btn info">📖 Edit Book</button>
          <button onClick={handleDeleteBook} className="dash-btn danger">📛 Delete Book</button>
          <button onClick={handleViewInventory} className="dash-btn warning">📚 View Inventory</button>
          <button onClick={handleApproveClientPatron} className="dash-btn success">✅ Approve Client/Patron</button>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;