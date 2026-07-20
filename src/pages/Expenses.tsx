import { useState } from "react";
import toast from "react-hot-toast";
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

  function clearForm() {
    setDescription("");
    setAmount("");
    setCategory("Food");
    setEditingId(null);
  }

  function handleAddExpense() {
    if (!description || !amount) {
      toast.error("Please fill in all fields.");
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

    toast.success("Expense added!");

    clearForm();
  }

  function handleUpdateExpense() {
    if (!editingId) return;

    const oldExpense = expenses.find(
      (expense) => expense.id === editingId
    );

    if (!oldExpense) return;

    const updatedExpense: Expense = {
      ...oldExpense,
      description,
      amount: Number(amount),
      category,
    };

    updateExpense(updatedExpense);

    toast.success("Expense updated!");

    clearForm();
  }

  function startEditing(expense: Expense) {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setCategory(expense.category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    deleteExpense(id);

    toast.success("Expense deleted!");
  }

  const filteredExpenses = expenses.filter((expense) =>
    expense.description
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
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
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
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
          <>
            <button
              onClick={handleUpdateExpense}
            >
              💾 Save Changes
            </button>

            <button
              className="action-btn"
              onClick={clearForm}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleAddExpense}
          >
            ➕ Add Expense
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
              {filteredExpenses.map(
                (expense) => (
                  <tr key={expense.id}>
                    <td>
                      {expense.description}
                    </td>

                    <td>
                      {expense.category}
                    </td>

                    <td>
                      $
                      {expense.amount.toFixed(
                        2
                      )}
                    </td>

                    <td>{expense.date}</td>

                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() =>
                          startEditing(
                            expense
                          )
                        }
                      >
                        ✏️ Edit
                      </button>
                    </td>

                    <td>
                      <button
                        className="action-btn delete-btn"
                        onClick={() =>
                          handleDelete(
                            expense.id
                          )
                        }
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}