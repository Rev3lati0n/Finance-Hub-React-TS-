import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function DashboardHero() {
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

  const savings = totalIncome - totalExpenses;

  return (
    <div className="hero-card">

      <div className="hero-left">

        <h1>👋 Welcome Back!</h1>

        <p>
          Here's your financial overview.
        </p>

      </div>

      <div className="hero-right">

        <div className="hero-stat">
          <span>💰 Income</span>
          <h2>${totalIncome.toFixed(2)}</h2>
        </div>

        <div className="hero-stat">
          <span>💸 Expenses</span>
          <h2>${totalExpenses.toFixed(2)}</h2>
        </div>

        <div className="hero-stat">
          <span>🏦 Savings</span>
          <h2>${savings.toFixed(2)}</h2>
        </div>

      </div>

    </div>
  );
}