import { useEffect, useState } from "react";

type BudgetEditorProps = {
  budget: number;
  onSave: (value: number) => void;
};

export default function BudgetEditor({
  budget,
  onSave,
}: BudgetEditorProps) {
  const [value, setValue] = useState(budget);

  useEffect(() => {
    setValue(budget);
  }, [budget]);

  function handleSave() {
    if (value <= 0) {
      alert("Budget must be greater than 0.");
      return;
    }

    onSave(value);
  }

  return (
    <div className="chart-card">

      <h2>Monthly Budget</h2>

      <p>
        Set your monthly spending limit.
      </p>

      <div className="budget-row">

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(Number(e.target.value))
          }
        />

        <button onClick={handleSave}>
          Save Budget
        </button>

      </div>

    </div>
  );
}