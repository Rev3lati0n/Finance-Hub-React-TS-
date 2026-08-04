import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function Profile() {
  const { user, logout } = useAuth();
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

  const transactions = expenses.length + incomes.length;

  const largestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => e.amount))
      : 0;

  const averageExpense =
    expenses.length > 0
      ? totalExpenses / expenses.length
      : 0;

  const favoriteCategory =
    expenses.length > 0
      ? Object.entries(
          expenses.reduce((acc, expense) => {
            acc[expense.category] =
              (acc[expense.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).sort((a, b) => b[1] - a[1])[0][0]
      : "None";

  return (
    <Layout>

      <h1>👤 Profile</h1>

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-info">

          <h2>
            {user?.username || "Guest User"}
          </h2>

          <p>
            {user?.email || "No email"}
          </p>

          <span>
            Welcome to Finance Hub!
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
          <h2>{transactions}</h2>
        </div>

      </div>

      <div className="dashboard-two-column">

        <div className="chart-card">

          <h2>📋 Account Information</h2>

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
              <strong>Status</strong>
              <span>Active</span>
            </div>

            <div className="profile-row">
              <strong>Version</strong>
              <span>Finance Hub 1.0</span>
            </div>

          </div>

        </div>

        <div className="chart-card">

          <h2>📈 Statistics</h2>

          <div className="profile-details">

            <div className="profile-row">
              <strong>Largest Expense</strong>
              <span>
                ${largestExpense.toFixed(2)}
              </span>
            </div>

            <div className="profile-row">
              <strong>Average Expense</strong>
              <span>
                ${averageExpense.toFixed(2)}
              </span>
            </div>

            <div className="profile-row">
              <strong>Favorite Category</strong>
              <span>{favoriteCategory}</span>
            </div>

            <div className="profile-row">
              <strong>Total Transactions</strong>
              <span>{transactions}</span>
            </div>

          </div>

        </div>

      </div>

      <div className="chart-card">

        <h2>🏆 Achievements</h2>

        <div className="stats-grid">

          <div className="stat-item">
            <h3>
              {transactions >= 1 ? "✅" : "⬜"}
            </h3>
            <span>First Transaction</span>
          </div>

          <div className="stat-item">
            <h3>
              {transactions >= 25 ? "🏅" : "⬜"}
            </h3>
            <span>25 Transactions</span>
          </div>

          <div className="stat-item">
            <h3>
              {savings > 0 ? "💰" : "⬜"}
            </h3>
            <span>Positive Savings</span>
          </div>

          <div className="stat-item">
            <h3>
              {expenses.length >= 10 ? "⭐" : "⬜"}
            </h3>
            <span>Expense Tracker</span>
          </div>

        </div>

      </div>

      <div className="chart-card">

        <h2>⚙️ Quick Actions</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <button className="primary-btn">
            ✏️ Edit Profile
          </button>

          <button className="primary-btn">
            📄 Export Data
          </button>

          <button
            className="delete-btn"
            onClick={logout}
          >
            🚪 Log Out
          </button>

        </div>

      </div>

    </Layout>
  );
}