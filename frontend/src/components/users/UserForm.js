import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

const UserForm =({ userToEdit, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('client');
  const navigate = useNavigate();

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username || '');
      setRole(userToEdit.role || 'client');
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, role };

    try {
      const response = await fetch(
        userToEdit ? `/api/users/${userToEdit.id}/` : '/api/users/',
        {
          method: userToEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit user data');
      }

      if (onSubmit) onSubmit(newUser); // Optional local state update

      setUsername('');
      setRole('client');
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  return (
    <div className="user-form-container">
      <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="patron">Patron</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{userToEdit ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
