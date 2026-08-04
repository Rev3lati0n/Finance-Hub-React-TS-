import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

export default function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(
      localStorage.getItem("financehub-notifications") || "true"
    );
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("financehub-currency") || "USD";
  });

  function toggleNotifications() {
    const newValue = !notifications;

    setNotifications(newValue);

    localStorage.setItem(
      "financehub-notifications",
      JSON.stringify(newValue)
    );

    if (newValue) {
      toast.success("Notifications enabled.");
    } else {
      toast("Notifications disabled.");
    }
  }

  function changeCurrency(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setCurrency(e.target.value);

    localStorage.setItem(
      "financehub-currency",
      e.target.value
    );

    if (notifications) {
      toast.success(
        `Currency changed to ${e.target.value}`
      );
    }
  }

  function exportData() {
    const data = {
      profile: JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      ),

      expenses: JSON.parse(
        localStorage.getItem("financehub-expenses") || "[]"
      ),

      income: JSON.parse(
        localStorage.getItem("financehub-income") || "[]"
      ),

      invoices: JSON.parse(
        localStorage.getItem("financehub-invoices") || "[]"
      ),

      budget: JSON.parse(
        localStorage.getItem("monthly-budget") || "0"
      ),

      settings: {
        notifications,
        currency,
      },

      exportedAt: new Date().toLocaleString(),
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "FinanceHub-Backup.json";

    link.click();

    URL.revokeObjectURL(url);

    if (notifications) {
      toast.success("Backup exported successfully!");
    }
  }

  function clearData() {
    const confirmed = window.confirm(
      "Delete ALL Finance Hub data? This cannot be undone."
    );

    if (!confirmed) return;

    localStorage.clear();

    toast.success("All data deleted.");

    window.location.reload();
  }

  return (
    <Layout>
      <h1>⚙️ Settings</h1>

      <div className="chart-card">
        <h2>👤 Account</h2>

        <div className="setting-row">
          <span>Profile</span>

          <button
            className="primary-btn"
            onClick={() => navigate("/profile")}
          >
            View Profile
          </button>
        </div>
      </div>

      <div className="chart-card">
        <h2>💵 Preferences</h2>

        <div className="setting-row">
          <span>Currency</span>

          <select
            value={currency}
            onChange={changeCurrency}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD ($)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>

        <div className="setting-row">
          <span>Theme</span>

          <span>🌙 Dark Mode Enabled</span>
        </div>

        <div className="setting-row">
          <span>Notifications</span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
          />
        </div>
      </div>

      <div className="chart-card">
        <h2>💾 Data</h2>

        <div className="setting-row">
          <span>Export Data</span>

          <button
            className="primary-btn"
            onClick={exportData}
          >
            Export Backup
          </button>
        </div>

        <div className="setting-row">
          <span>Clear All Data</span>

          <button
            className="settings-delete-btn"
            onClick={clearData}
          >
            Delete Everything
          </button>
        </div>
      </div>

      <div className="chart-card">
        <h2>ℹ️ About</h2>

        <p>
          <strong>Finance Hub</strong>
        </p>

        <p>Version 1.0</p>

        <p>
          Personal Finance Dashboard built with React +
          TypeScript.
        </p>
      </div>
    </Layout>
  );
}