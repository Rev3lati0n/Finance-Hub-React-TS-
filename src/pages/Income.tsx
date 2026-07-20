import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { useIncome } from "../context/IncomeContext";
import type { Income } from "../types/Income";

export default function Income() {
  const {
    incomes,
    addIncome,
    deleteIncome,
    updateIncome,
  } = useIncome();

  const [description, setDescription] = useState("");
  const [source, setSource] = useState("Salary");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalIncome = incomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  function clearForm() {
    setDescription("");
    setSource("Salary");
    setAmount("");
    setDate("");
    setEditingId(null);
  }

  function handleSubmit() {
    if (!description || !amount || !date) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editingId) {
      const oldIncome = incomes.find(
        (income) => income.id === editingId
      );

      if (!oldIncome) return;

      const updatedIncome: Income = {
        ...oldIncome,
        description,
        source,
        amount: Number(amount),
        date,
      };

      updateIncome(updatedIncome);

      toast.success("Income updated!");
    } else {
      addIncome({
        description,
        source,
        amount: Number(amount),
        date,
      });

      toast.success("Income added!");
    }

    clearForm();
  }

  function startEditing(income: Income) {
    setEditingId(income.id);
    setDescription(income.description);
    setSource(income.source);
    setAmount(income.amount.toString());
    setDate(income.date);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this income?"
    );

    if (!confirmed) return;

    deleteIncome(id);

    toast.success("Income deleted!");
  }

  const filteredIncome = incomes.filter((income) =>
    income.description
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1>💰 Income</h1>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Income</h3>
          <h2>${totalIncome.toFixed(2)}</h2>
        </div>
      </div>

      <input
        className="search-box"
        placeholder="🔍 Search income..."
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

        <select
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
        >
          <option>Salary</option>
          <option>Business</option>
          <option>Investments</option>
          <option>Gift</option>
          <option>Bonus</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        {editingId ? (
          <>
            <button onClick={handleSubmit}>
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
          <button onClick={handleSubmit}>
            ➕ Add Income
          </button>
        )}
      </div>

      <div className="expense-table">
        <h2>Income History</h2>

        {filteredIncome.length === 0 ? (
          <p>No income found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Source</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredIncome.map((income) => (
                <tr key={income.id}>
                  <td>{income.description}</td>
                  <td>{income.source}</td>
                  <td>{income.date}</td>
                  <td>${income.amount.toFixed(2)}</td>

                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        startEditing(income)
                      }
                    >
                      ✏️ Edit
                    </button>
                  </td>

                  <td>
                    <button
                      className="action-btn delete-btn"
                      onClick={() =>
                        handleDelete(income.id)
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
    </Layout>
  );
}