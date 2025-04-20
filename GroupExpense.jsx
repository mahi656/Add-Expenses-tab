import React, { useState } from 'react';
import './GroupExpense.css';

const GroupExpense = () => {
  const [expenseData, setExpenseData] = useState({
    purpose: '',
    groupTotal: '',
    memberCount: '',
    splitWith: [],  // Changed to array
    date: '',
    time: '',
    description: ''
  });
  
  // Add new state for member input
  const [memberName, setMemberName] = useState('');

  // Add function to handle adding members
  const handleAddMember = (e) => {
    e.preventDefault();
    if (memberName.trim()) {
      setExpenseData({
        ...expenseData,
        splitWith: [...expenseData.splitWith, memberName.trim()]
      });
      setMemberName('');
    }
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate member count
    if (!expenseData.memberCount || parseInt(expenseData.memberCount) <= 0) {
      alert('Number of members must be greater than 0');
      return;
    }

    console.log('Group Expense Data:', expenseData);
    setShowSuccessModal(true);
  };

  const handleGotIt = () => {
    setShowSuccessModal(false);
    setExpenseData({
      purpose: '',
      groupTotal: '',
      memberCount: '',
      splitWith: '',
      date: '',
      time: '',
      description: ''
    });
  };

  return (
    <div className="container">
      {showSuccessModal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <span className="sparkle-1">✦</span>
            <span className="sparkle-2">✦</span>
            <span className="sparkle-3">✦</span>
            <span className="sparkle-4">✦</span>
            <h2>Group expense added!</h2>
            <p>Your group has been notified and splits are processing.</p>
            <button className="got-it-button" onClick={handleGotIt}>Got it</button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <button className="back-button">←</button>
            <h1 className="header-title">Create Group Expense</h1>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">What's this for?</label>
              <input
                className="input"
                type="text"
                value={expenseData.purpose}
                onChange={(e) => setExpenseData({...expenseData, purpose: e.target.value})}
                placeholder="Enter purpose"
              />
            </div>

            <div className="form-group">
              <label className="label">Group total expense</label>
              <input
                className="input"
                type="number"
                value={expenseData.groupTotal}
                onChange={(e) => setExpenseData({...expenseData, groupTotal: e.target.value})}
                placeholder="£0.00"
              />
            </div>

            <div className="form-group">
              <label className="label">Number of members</label>
              <input
                className="input"
                type="number"
                min="1"
                value={expenseData.memberCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 0) {
                    setExpenseData({...expenseData, memberCount: value});
                  }
                }}
                placeholder="Enter number of members"
              />
            </div>

            <div className="form-group">
              <label className="label">Split with</label>
              <div className="members-container">
                {expenseData.splitWith.map((member, index) => (
                  <div key={index} className="member-item">
                    <div className="member-avatar">{member[0]}</div>
                    <span className="member-name">{member}</span>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-member-button"
                  onClick={handleAddMember}
                >
                  +
                </button>
              </div>
            </div>

            <div className="date-time-container">
              <div className="form-group" style={{ flex: 1, marginRight: '10px' }}>
                <label className="label">Date</label>
                <input
                  className="input"
                  type="date"
                  value={expenseData.date}
                  onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                />
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="label">Time</label>
                <input
                  className="input"
                  type="time"
                  value={expenseData.time}
                  onChange={(e) => setExpenseData({...expenseData, time: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Description</label>
              <input
                className="input"
                type="text"
                value={expenseData.description}
                onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                placeholder="Add a description"
              />
            </div>

            <button className="submit-button" type="submit">ADD GROUP EXPENSE</button>
          </form>
        </>
      )}
    </div>
  );
};

export default GroupExpense;