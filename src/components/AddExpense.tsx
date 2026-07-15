import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function AddExpense() {
  const { addExpense } = useExpenses();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [notes, setNotes] = useState("");

  function submit() {
    if (!description || !category || !amount) return;

    addExpense({
      description,
      category,
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
      paymentMethod,
      notes,
    });

    setDescription("");
    setCategory("");
    setAmount("");
  }

  return (
    <div className="tableCard">
      <h2>Add Expense</h2>

      <input
        placeholder="Expense"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option>Cash</option>
        <option>Debit Card</option>
        <option>Credit Card</option>
        <option>Bank Transfer</option>
      </select>

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={submit}>Add Expense</button>
    </div>
  );
}