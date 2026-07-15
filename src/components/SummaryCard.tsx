type Props = {
  title: string;
  value: string;
  color?: string;
};

export default function SummaryCard({
  title,
  value,
  color = "#2563eb",
}: Props) {
  return (
    <div
      className="summary-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}