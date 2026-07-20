import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import { useExpenses } from "../context/ExpenseContext";
import FinanceChart from "../components/FinanceChart";
import BudgetEditor from "../components/BudgetEditor";
import { useState } from "react";
import { useIncome } from "../context/IncomeContext";
import FinancialInsights from "../components/FinancialInsights";
import BudgetProgress from "../components/BudgetProgress";
import DashboardHero from "../components/DashboardHero";
import QuickActions from "../components/QuickActions";
import QuickStats from "../components/QuickStats";

export default function Dashboard() {
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const { incomes } = useIncome();

  const totalIncome = incomes.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const savings = totalIncome - totalExpenses;

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    return Number(localStorage.getItem("monthly-budget")) || 2000;
  });

  const remaining = monthlyBudget - totalExpenses;

  function saveBudget(value: number) {
    setMonthlyBudget(value);
    localStorage.setItem("monthly-budget", value.toString());
  }

  const recentExpenses = [...expenses]
    .reverse()
    .slice(0, 5);

  return (
    <Layout>

      <DashboardHero />

      <QuickActions />

      <h1>Dashboard</h1>

      <BudgetEditor
        budget={monthlyBudget}
        onSave={saveBudget}
      />

      <div className="summary-grid">

      <SummaryCard
        title="Monthly Income"
        value={`$${totalIncome.toFixed(2)}`}
        icon="💰"
      />

      <SummaryCard
        title="Total Expenses"
        value={`$${totalExpenses.toFixed(2)}`}
        icon="💸"
      />

      <SummaryCard
        title="Savings"
        value={`$${savings.toFixed(2)}`}
        icon="🏦"
      />

      <SummaryCard
        title="Remaining Budget"
        value={`$${remaining.toFixed(2)}`}
        icon="🎯"
      />

      <SummaryCard
        title="Transactions"
        value={(expenses.length + incomes.length).toString()}
        icon="📊"
      />

      </div>

      <div className="dashboard-two-column">

        <FinanceChart />

        <BudgetProgress
          budget={monthlyBudget}
          spent={totalExpenses}
        />

      </div>

      <div className="dashboard-two-column">

        <FinancialInsights />

        <QuickStats />

      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2>Expenses</h2>

          <span>
            {recentExpenses.length} transaction
            {recentExpenses.length !== 1 ? "s" : ""}
          </span>
        </div>

        {recentExpenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {recentExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>${expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}