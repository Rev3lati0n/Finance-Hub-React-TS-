import { useExpenses } from "../context/ExpenseContext";

export default function TopCategories() {
  const { expenses } = useExpenses();

  const categories: Record<string, number> = {};

  expenses.forEach((expense) => {
    categories[expense.category] =
      (categories[expense.category] || 0) +
      Number(expense.amount);
  });

  const sorted = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="chart-card">
      <h2>🔥 Top Categories</h2>

      {sorted.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        sorted.map(([category, amount]) => (
          <div
            key={category}
            className="category-row"
          >
            <span className="category-name">
              {category}
            </span>

            <span className="category-amount">
              ${amount.toFixed(2)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}