import { useState } from "react";
import Layout from "../components/Layout";
import BudgetEditor from "../components/BudgetEditor";
import CategoryBudgetEditor from "../components/CategoryBudgetEditor";
import { useExpenses } from "../context/ExpenseContext";

export default function Budget() {
  const { expenses } = useExpenses();

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("monthly-budget")) || 2000;
  });

  const [categoryBudgets, setCategoryBudgets] = useState<
    Record<string, number>
  >(() => {
    const saved = localStorage.getItem(
      "financehub-category-budgets"
    );

    return saved ? JSON.parse(saved) : {};
  });

  function saveBudget(value: number) {
    setBudget(value);

    localStorage.setItem(
      "monthly-budget",
      value.toString()
    );
  }

  const remaining = budget - totalSpent;

  const percent =
    budget === 0
      ? 0
      : Math.min((totalSpent / budget) * 100, 100);

  return (
    <Layout>

      <h1>📅 Budget Planner</h1>

      <div className="summary-grid">

        <div className="summary-card">
          <h3>Monthly Budget</h3>
          <h2>${budget.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Spent</h3>
          <h2>${totalSpent.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Remaining</h3>
          <h2>${remaining.toFixed(2)}</h2>
        </div>

        <div className="summary-card">
          <h3>Budget Used</h3>
          <h2>{percent.toFixed(1)}%</h2>
        </div>

      </div>

      <BudgetEditor
        budget={budget}
        onSave={saveBudget}
      />

      <div className="chart-card">

        <h2>Overall Budget Progress</h2>

        <div className="budget-progress">
          <div
            className="budget-progress-fill"
            style={{
              width: `${percent}%`,
            }}
          />
        </div>

        <p>
          ${totalSpent.toFixed(2)} of $
          {budget.toFixed(2)} spent
        </p>

      </div>

      <CategoryBudgetEditor
        onChange={setCategoryBudgets}
      />

      <div className="chart-card">

        <h2>Category Overview</h2>

        <table className="expense-table">

          <thead>

            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Remaining</th>
              <th>Progress</th>
            </tr>

          </thead>

          <tbody>

            {Object.entries(categoryBudgets).map(
              ([category, categoryBudget]) => {

                const spent = expenses
                  .filter(
                    (expense) =>
                      expense.category === category
                  )
                  .reduce(
                    (sum, expense) =>
                      sum + Number(expense.amount),
                    0
                  );

                const remaining =
                  categoryBudget - spent;

                const progress =
                  categoryBudget === 0
                    ? 0
                    : Math.min(
                        (spent / categoryBudget) * 100,
                        100
                      );

                return (
                  <tr key={category}>

                    <td>{category}</td>

                    <td>
                      ${categoryBudget.toFixed(2)}
                    </td>

                    <td>
                      ${spent.toFixed(2)}
                    </td>

                    <td>
                      ${remaining.toFixed(2)}
                    </td>

                    <td style={{ width: "220px" }}>

                      <div className="budget-progress">

                        <div
                          className="budget-progress-fill"
                          style={{
                            width: `${progress}%`,
                          }}
                        />

                      </div>

                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>

      <div className="chart-card">

        <h2>💡 Budget Insights</h2>

        {remaining >= 0 ? (
          <>
            <p>
              ✅ You're staying within your
              monthly budget.
            </p>

            <p>
              You still have{" "}
              <strong>
                ${remaining.toFixed(2)}
              </strong>{" "}
              remaining.
            </p>
          </>
        ) : (
          <>
            <p>
              ⚠️ You have exceeded your
              monthly budget.
            </p>

            <p>
              Over budget by{" "}
              <strong>
                ${Math.abs(remaining).toFixed(2)}
              </strong>
            </p>
          </>
        )}

      </div>

    </Layout>
  );
}