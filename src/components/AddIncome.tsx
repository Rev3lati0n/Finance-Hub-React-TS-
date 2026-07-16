import { useState } from "react";
import { useIncome } from "../context/IncomeContext";

export default function AddIncome() {
  const { addIncome } = useIncome();

  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !source || !amount || !date) {
      return;
    }

    addIncome({
      description,
      source,
      amount: Number(amount),
      date,
    });

    setDescription("");
    setSource("");
    setAmount("");
    setDate("");
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add Income</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Income Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

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
  );
}