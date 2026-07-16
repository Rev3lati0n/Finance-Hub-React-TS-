import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          💰 Finance Hub
        </h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">🏠 Dashboard</NavLink>

        <NavLink to="/expenses">💸 Expenses</NavLink>

        <NavLink to="/income">💰 Income</NavLink>

        <NavLink to="/budget">📅 Budget</NavLink>

        <NavLink to="/invoices">🧾 Invoices</NavLink>

        <NavLink to="/reports">📊 Reports</NavLink>

        <NavLink to="/profile">👤 Profile</NavLink>

        <NavLink to="/settings">⚙ Settings</NavLink>
      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        🚪 Logout
      </button>
    </aside>
  );
}