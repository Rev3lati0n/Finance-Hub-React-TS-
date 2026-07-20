import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useExpenses } from "../context/ExpenseContext";
import { useIncome } from "../context/IncomeContext";

export default function IncomeExpenseChart() {
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

  const data = [
    {
      name: "Income",
      value: totalIncome,
    },
    {
      name: "Expenses",
      value: totalExpenses,
    },
  ];

  return (
    <div className="chart-card">
      <h2>💰 Income vs Expenses</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}