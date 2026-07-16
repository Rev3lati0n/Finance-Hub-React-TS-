import Layout from "../components/Layout";
import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function Reports() {
  const { expenses } = useExpenses();
  const { incomes } = useIncome();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalIncome = incomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  const savings = totalIncome - totalExpenses;

  return (
    <Layout>
      <h1>📊 Reports</h1>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Income</h3>
          <h2>${totalIncome.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Total Expenses</h3>
          <h2>${totalExpenses.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Savings</h3>
          <h2>${savings.toFixed(2)}</h2>
        </div>
      </div>

      <div className="chart-card">
        <h2>Reports Coming Soon</h2>
        <p>
          Charts, graphs, exports, and financial insights will appear here.
        </p>
      </div>
    </Layout>
  );
}