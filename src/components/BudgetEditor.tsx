import { useState, useEffect } from "react";

type Props = {
  budget: number;
  onSave: (value: number) => void;
};

export default function BudgetEditor({
  budget,
  onSave,
}: Props) {
  const [value, setValue] = useState(budget);

  useEffect(() => {
    setValue(budget);
  }, [budget]);

  return (
    <div className="card">
      <h3>Monthly Budget</h3>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <button
        onClick={() => onSave(value)}
        style={{ marginTop: "12px" }}
      >
        Save Budget
      </button>
    </div>
  );
}