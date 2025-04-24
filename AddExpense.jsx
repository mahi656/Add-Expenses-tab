"use client"

import { useState } from "react"
import "./AddExpense.css"

const AddExpense = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [currency, setCurrency] = useState("₹")
  const [showExpenseDetails, setShowExpenseDetails] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    date: "",
    time: "",
    description: "",
    paidBy: "",
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
    setTransactions((prev) => [
      ...prev,
      {
        purpose: expenseData.title,
        amount: expenseData.amount,
        currency: currency,
        date: expenseData.date,
        time: expenseData.time,
        description: expenseData.description,
        paidBy: expenseData.paidBy,
      },
    ])
    setExpenseData({
      title: "",
      amount: "",
      date: "",
      time: "",
      description: "",
      paidBy: "",
    })
  }

  const ExpenseDetailsModal = ({ expense, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="group-header">
            <div className="group-title">
              <h2>{expense.purpose}</h2>
            </div>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="group-info">
            <p>
              <strong>Amount:</strong> {expense.currency}
              {Number.parseFloat(expense.amount).toFixed(2)}
            </p>
            <p>
              <strong>Paid by:</strong> {expense.paidBy}
            </p>
            <p>
              <strong>Date:</strong> {expense.date} | {expense.time}
            </p>
            <p>
              <strong>Description:</strong> {expense.description || "No description"}
            </p>
          </div>
        </div>
      </div>
    )
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

            <div className="container">
              <div className="header">
                <button className="back-button">←</button>
                <h1 className="header-title">Create New Bill</h1>
                <div className="profile-section">

                </div>
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

              {showSuccessModal && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="success-icon">✓</div>
                    <h2>Expense added successfully!</h2>
                    <p>Your expense has been recorded.</p>
                    <button className="got-it-button" onClick={handleGotIt}>
                      Got it
                    </button>
                  </div>
                </div>
              )}
            </div>
          
        </>
      )}

      <div className="transactions-section">
        <div className="transactions-header">
          <h2>All Transactions</h2>
          <button className="view-all-button">View All</button>
        </div>
        <div className="transactions-list">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="transaction-item"
              onClick={() => {
                setSelectedExpense(transaction)
                setShowExpenseDetails(true)
              }}
            >
              <div className="transaction-details">
                <h3>{transaction.purpose}</h3>
                <p>
                  {transaction.date} | {transaction.time}
                </p>
                <p>
                  <strong>Paid by:</strong> {transaction.paidBy}
                </p>
              </div>
              <div className="transaction-amount">
                {transaction.currency}
                {Number.parseFloat(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showExpenseDetails && selectedExpense && (
        <ExpenseDetailsModal expense={selectedExpense} onClose={() => setShowExpenseDetails(false)} />
      )}
    </div>
  )
}

export default AddExpense
