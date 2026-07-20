import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "➕ Add Expense",
      path: "/expenses",
    },
    {
      title: "💰 Add Income",
      path: "/income",
    },
    {
      title: "📅 Budget",
      path: "/budget",
    },
    {
      title: "📊 Reports",
      path: "/reports",
    },
    {
      title: "🧾 Invoices",
      path: "/invoices",
    },
    {
      title: "⚙ Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="quick-actions">

      {actions.map((action) => (
        <button
          key={action.path}
          className="quick-btn"
          onClick={() => navigate(action.path)}
        >
          {action.title}
        </button>
      ))}

    </div>
  );
}