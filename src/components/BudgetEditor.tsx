import { useState } from "react";

type BudgetEditorProps = {
  budget: number;
  onSave: (value: number) => void;
};

export default function BudgetEditor({
  budget,
  onSave,
}: BudgetEditorProps) {
  const [value, setValue] = useState(budget);

  function handleSave() {
    onSave(value);
  }

  return (
    <div className="budget-card">
      <h2>Monthly Budget</h2>

      <div className="budget-row">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <button onClick={handleSave}>
          Save Budget
        </button>
      </div>
    </div>
  );
}