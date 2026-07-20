import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useExpenses } from "../context/ExpenseContext";

export default function MonthlyChart() {
  const { expenses } = useExpenses();

  const months: Record<string, number> = {};

  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    months[month] =
      (months[month] || 0) +
      Number(expense.amount);
  });

  const data = Object.entries(months).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return (
    <div className="chart-card">
      <h2>📈 Monthly Spending</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}