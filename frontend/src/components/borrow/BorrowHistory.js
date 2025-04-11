import React from 'react';
import './BorrowHistory.css';

const BorrowHistory = ({ borrowList }) => {
  return (
    <div className="history-container">
      <h2>Borrow History</h2>
      {borrowList.length === 0 ? (
        <p>No borrow history available.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>User ID</th>
              <th>Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowList.map((entry, index) => (
              <tr key={index}>
                <td>{entry.bookId}</td>
                <td>{entry.userId}</td>
                <td>{new Date(entry.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowHistory;
