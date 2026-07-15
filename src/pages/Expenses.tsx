import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useExpenses } from '../context/ExpenseContext';

export default function Expenses() {
  const { expenses, addExpense } = useExpenses();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  function handleAddExpense() {
    if (!description || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    addExpense({
      description,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
      paymentMethod: 'Cash',
      notes: '',
    });

    setDescription('');
    setAmount('');
    setCategory('Food');
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>💸 Expenses</h1>

        <div className="expense-form">
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Transportation</option>
            <option>Housing</option>
            <option>Utilities</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Other</option>
          </select>

          <button onClick={handleAddExpense}>Add Expense</button>
        </div>

        <div className="expense-table">
          <h2>Recent Expenses</h2>

          {expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
