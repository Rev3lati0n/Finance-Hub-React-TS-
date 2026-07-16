import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

const COLORS = [
  "#2563eb",
  "#ef4444",
  "#22c55e",
];

export default function FinanceChart() {
  const { expenses } = useExpenses();
  const { incomes } = useIncome();

  const totalIncome = incomes.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const savings = totalIncome - totalExpenses;

  const data = [
    {
      name: "Income",
      value: totalIncome,
    },
    {
      name: "Expenses",
      value: totalExpenses,
    },
    {
      name: "Savings",
      value: savings,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="chart-card">
      <h2>Financial Overview</h2>

      {data.length === 0 ? (
        <p>No financial data available yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}