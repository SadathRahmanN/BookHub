// src/components/dashboards/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleAddUser = () => alert('Add User clicked!');
  const handleEditUser = () => alert('Edit User clicked!');
  const handleDeleteUser = () => alert('Delete User clicked!');
  const handleViewUsers = () => alert('View All Users clicked!');
  const handleApproveLibrarian = () => alert('Approve Librarian clicked!');
  const handleApproveClientPatron = () => alert('Approve Client/Patron clicked!');

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
        <h2>👑 Admin Dashboard</h2>
        <div className="button-grid">
          <button onClick={handleAddUser} className="dash-btn primary">➕ Add User</button>
          <button onClick={handleEditUser} className="dash-btn info">📝 Edit User</button>
          <button onClick={handleDeleteUser} className="dash-btn danger">❌ Delete User</button>
          <button onClick={handleViewUsers} className="dash-btn warning">📜 View All Users</button>
          <button onClick={handleApproveLibrarian} className="dash-btn success">✅ Approve Librarian</button>
          <button onClick={handleApproveClientPatron} className="dash-btn success">🧾 Approve Client/Patron</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;