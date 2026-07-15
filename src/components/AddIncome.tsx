import { useState } from "react";
import { useIncome } from "../context/IncomeContext";

export default function AddIncome() {
  const { addIncome } = useIncome();

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!source || !amount) return;

    addIncome({
      source,
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
    });

    setSource("");
    setAmount("");
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add Income</h2>

      <input
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

      <button type="submit">
        Add Income
      </button>
    </form>
  );
}