import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-logo">💰 Finance Hub</h2>

        <p className="welcome">
          Welcome back,
          <br />
          <strong>{user?.username}</strong>
        </p>

        <nav className="sidebar-nav">
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/expenses">💸 Expenses</Link>
          <Link to="/budget">📊 Budget Planner</Link>
          <Link to="/invoices">🧾 Invoices</Link>
          <Link to="/profile">👤 Profile</Link>
          <Link to="/settings">⚙️ Settings</Link>
        </nav>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}