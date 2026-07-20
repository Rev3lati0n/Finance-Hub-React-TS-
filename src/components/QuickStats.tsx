import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function QuickStats() {
  const { expenses } = useExpenses();
  const { incomes } = useIncome();

  const totalIncome = incomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const averageExpense =
    expenses.length > 0
      ? totalExpenses / expenses.length
      : 0;

  return (
    <div className="chart-card">
      <h2>📈 Quick Statistics</h2>

      <div className="stats-grid">

        <div className="stat-item">
          <span>Transactions</span>
          <h3>{expenses.length + incomes.length}</h3>
        </div>

        <div className="stat-item">
          <span>Average Expense</span>
          <h3>${averageExpense.toFixed(2)}</h3>
        </div>

        <div className="stat-item">
          <span>Total Income</span>
          <h3>${totalIncome.toFixed(2)}</h3>
        </div>

        <div className="stat-item">
          <span>Total Expenses</span>
          <h3>${totalExpenses.toFixed(2)}</h3>
        </div>

      </div>
    </div>
  );
}