type Props = {
  budget: number;
  spent: number;
};

export default function BudgetProgress({
  budget,
  spent,
}: Props) {
  const percent =
    budget === 0
      ? 0
      : Math.min((spent / budget) * 100, 100);

  return (
    <div className="chart-card">
      <h2>🎯 Monthly Budget</h2>

      <h1>
        ${spent.toFixed(2)} / ${budget.toFixed(2)}
      </h1>

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

      <p>{percent.toFixed(0)}% Used</p>
    </div>
  );
}