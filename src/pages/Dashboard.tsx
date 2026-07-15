import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import { useExpenses } from "../context/ExpenseContext";
import FinanceChart from "../components/FinanceChart";
import BudgetEditor from "../components/BudgetEditor";
import { useState } from "react";
import { useIncome } from "../context/IncomeContext";

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
      <h1>Dashboard</h1>

      <BudgetEditor
        budget={monthlyBudget}
        onSave={saveBudget}
      />

      <div className="summary-grid">

      <SummaryCard
        title="Monthly Income"
        value={`$${totalIncome.toFixed(2)}`}
      />

      <SummaryCard
        title="Total Expenses"
        value={`$${totalExpenses.toFixed(2)}`}
      />

      <SummaryCard
        title="Savings"
        value={`$${savings.toFixed(2)}`}
      />

      <SummaryCard
        title="Remaining Budget"
        value={`$${remaining.toFixed(2)}`}
      />

      <SummaryCard
        title="Transactions"
        value={(expenses.length + incomes.length).toString()}
      />

      </div>

      <FinanceChart />

      <div className="recent-section">
        <h2>Recent Expenses</h2>

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