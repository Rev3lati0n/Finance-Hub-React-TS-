import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function Profile() {
  const { user } = useAuth();
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
    <Layout>
      <h1>👤 Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-info">
          <h2>{user?.username || "Guest User"}</h2>

          <p>{user?.email || "No email available"}</p>

          <span>
            Welcome to Finance Hub.
          </span>
        </div>
      </div>

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
          <h3>Total Savings</h3>
          <h2>${savings.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Transactions</h3>
          <h2>{expenses.length + incomes.length}</h2>
        </div>

      </div>

      <div className="chart-card">

        <h2>Account Information</h2>

        <div className="profile-details">

          <div className="profile-row">
            <strong>Username</strong>
            <span>{user?.username || "-"}</span>
          </div>

          <div className="profile-row">
            <strong>Email</strong>
            <span>{user?.email || "-"}</span>
          </div>

          <div className="profile-row">
            <strong>Member Status</strong>
            <span>Active</span>
          </div>

          <div className="profile-row">
            <strong>Finance Hub Version</strong>
            <span>1.0</span>
          </div>

        </div>

        <button className="primary-btn">
          ✏ Edit Profile
        </button>

      </div>
    </Layout>
  );
}