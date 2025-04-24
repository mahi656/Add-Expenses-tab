"use client"

import { useState } from "react"
import "./AddExpense.css"

const AddExpense = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [currency, setCurrency] = useState("₹")
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    date: "",
    time: "",
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!expenseData.amount || !expenseData.title) {
      alert("Please fill in amount and title")
      return
    }
    setShowSuccessModal(true)
  }

  const handleGotIt = () => {
    setShowSuccessModal(false)
    setExpenseData({
      title: "",
      amount: "",
      date: "",
      time: "",
      description: "",
    })
  }

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
            <h2>Expense added successfully!</h2>
            <p>Your expense has been recorded.</p>
            <button className="got-it-button" onClick={handleGotIt}>
              Got it
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <button className="back-button">←</button>
            <h1 className="header-title">Create New Bill</h1>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-main-section">
              <div className="form-group title-group">
                <label className="label">Title</label>
                <input
                  className="input"
                  type="text"
                  value={expenseData.title}
                  onChange={(e) => setExpenseData({...expenseData, title: e.target.value})}
                  placeholder="Enter expense title"
                />
              </div>

              <div className="form-group amount-group">
                <label className="label">Enter Amount</label>
                <div className="expense-input-container">
                  <select 
                    className="currency-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="₹">₹ (INR)</option>
                    <option value="£">£ (GBP)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="¥">¥ (JPY)</option>
                  </select>
                  <input
                    className="input amount-input"
                    type="text"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="datetime-section">
                <div className="form-group">
                  <label className="label">Date</label>
                  <input
                    className="input"
                    type="date"
                    value={expenseData.date}
                    onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Time</label>
                  <input
                    className="input"
                    type="time"
                    value={expenseData.time}
                    onChange={(e) => setExpenseData({...expenseData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group description-group">
                <label className="label">Description</label>
                <input
                  className="input"
                  type="text"
                  value={expenseData.description}
                  onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                  placeholder="Add a description"
                />
              </div>
            </div>

            <button className="submit-button" type="submit">
              ADD
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddExpense;
