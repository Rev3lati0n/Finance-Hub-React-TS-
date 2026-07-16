import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useExpenses } from "../context/ExpenseContext";
import type { Expense } from "../types/Expense";
import Layout from "../components/Layout";

export default function Expenses() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  } = useExpenses();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  function handleAddExpense() {
    if (!description || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    addExpense({
      description,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
      paymentMethod: "Cash",
      notes: "",
    });

    setDescription("");
    setAmount("");
    setCategory("Food");
  }

  function handleUpdateExpense() {
    if (!editingId) return;

    const oldExpense = expenses.find((e) => e.id === editingId);

    if (!oldExpense) return;

    const updatedExpense: Expense = {
      ...oldExpense,
      description,
      amount: Number(amount),
      category,
    };

    updateExpense(updatedExpense);

    setEditingId(null);
    setDescription("");
    setAmount("");
    setCategory("Food");
  }

  function startEditing(expense: Expense) {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
  }

  const filteredExpenses = expenses.filter((expense) =>
    expense.description
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>💸 Expenses</h1>

        <input
          className="search-box"
          placeholder="🔍 Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

          {editingId ? (
            <button onClick={handleUpdateExpense}>
              Save Changes
            </button>
          ) : (
            <button onClick={handleAddExpense}>
              Add Expense
            </button>
          )}
        </div>

        <div className="expense-table">
          <h2>Expenses</h2>

          {filteredExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.date}</td>

                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => startEditing(expense)}
                      >
                        ✏️ Edit
                      </button>
                    </td>

                    <td>
                      <button
                        className="action-btn delete-btn"
                        onClick={() =>
                          deleteExpense(expense.id)
                        }
                      >
                        🗑 Delete
                      </button>
                    </td>
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