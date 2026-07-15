import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function FinanceChart() {
  const { expenses } = useExpenses();

  const categories: Record<string, number> = {};

  expenses.forEach((expense) => {
    categories[expense.category] =
      (categories[expense.category] || 0) +
      Number(expense.amount);
  });

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
  ];

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3>Spending by Category</h3>
        <p>No expense data yet.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>Spending by Category</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}