import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function FinancialInsights() {
  const { expenses } = useExpenses();
  const { incomes } = useIncome();

  const totalIncome = incomes.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const savings = totalIncome - totalExpenses;

  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const biggestCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  return (
    <div className="chart-card">
      <h2>💡 Financial Insights</h2>

      <div className="insight-list">

        <div className="insight">
        {savings >= 0 ? (
            <>
            ✅ You saved <strong>${savings.toFixed(2)}</strong> this month.
            </>
        ) : (
            <>
            ⚠️ You spent{" "}
            <strong>${Math.abs(savings).toFixed(2)}</strong>{" "}
            more than you earned.
            </>
        )}
        </div>

        <div className="insight">
          📊 Total transactions:
          <strong>
            {" "}
            {expenses.length + incomes.length}
          </strong>
        </div>

        <div className="insight">
          💸 Largest expense category:
          <strong>
            {" "}
            {biggestCategory
              ? biggestCategory[0]
              : "None"}
          </strong>
        </div>

      </div>
    </div>
  );
}