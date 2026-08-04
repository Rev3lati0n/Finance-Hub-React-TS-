import { useEffect, useState } from "react";

const DEFAULT_BUDGETS: Record<string, number> = {
  Food: 300,
  Transportation: 150,
  Housing: 1200,
  Utilities: 200,
  Shopping: 250,
  Entertainment: 150,
  Healthcare: 150,
  Education: 100,
  Other: 100,
};

type Props = {
  onChange?: (budgets: Record<string, number>) => void;
};

export default function CategoryBudgetEditor({
  onChange,
}: Props) {
  const [budgets, setBudgets] =
    useState<Record<string, number>>(() => {
      const saved = localStorage.getItem(
        "financehub-category-budgets"
      );

      return saved
        ? JSON.parse(saved)
        : DEFAULT_BUDGETS;
    });

  useEffect(() => {
    localStorage.setItem(
      "financehub-category-budgets",
      JSON.stringify(budgets)
    );

    onChange?.(budgets);
  }, [budgets, onChange]);

  function updateBudget(
    category: string,
    value: number
  ) {
    setBudgets((prev) => ({
      ...prev,
      [category]: value,
    }));
  }

  return (
    <div className="chart-card">
      <h2>Category Budgets</h2>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(budgets).map(
            ([category, value]) => (
              <tr key={category}>
                <td>{category}</td>

                <td>
                  <input
                    type="number"
                    value={value}
                    min={0}
                    onChange={(e) =>
                      updateBudget(
                        category,
                        Number(e.target.value)
                      )
                    }
                    style={{
                      width: "120px",
                    }}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}