import { useState } from "react";
import Layout from "../components/Layout";
import { useIncome } from "../context/IncomeContext";

export default function Income() {
  const { incomes, addIncome, deleteIncome } = useIncome();
  
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("Salary");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !amount || !date) return;

    addIncome({
      description,
      source,
      amount: Number(amount),
      date,
    });

    setDescription("");
    setSource("Salary");
    setAmount("");
    setDate("");
  }

  const totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );

  return (
    <Layout>
      <h1>Income</h1>

      <div className="tableCard">
        <h2>Add Income</h2>

        <div className="summary-card">
          <h2>Total Income</h2>
          <h1>${totalIncome.toFixed(2)}</h1>
        </div>

        <form onSubmit={handleSubmit} className="expenseForm">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option>Salary</option>
            <option>Freelance</option>
            <option>Business</option>
            <option>Gift</option>
            <option>Investment</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="submit">
            Add Income
          </button>
        </form>
      </div>

      <div className="tableCard">
        <h2>Total Income: ${totalIncome.toFixed(2)}</h2>

        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Source</th>
              <th>Date</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {incomes.length === 0 ? (
              <tr>
                <td colSpan={5}>No income yet.</td>
              </tr>
            ) : (
              incomes.map((income) => (
                <tr key={income.id}>
                  <td>{income.description}</td>
                  <td>{income.source}</td>
                  <td>{income.date}</td>
                  <td>${income.amount.toFixed(2)}</td>
                  <td>
                    <button
                      className="deleteBtn"
                      onClick={() => deleteIncome(income.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}