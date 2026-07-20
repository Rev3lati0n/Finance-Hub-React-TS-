import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: ReactNode;
  icon?: string;
};

export default function SummaryCard({
  title,
  value,
  icon,
}: SummaryCardProps) {
  return (
    <div className="summary-card">
      <div className="summary-header">
        <span>{title}</span>

        <div className="summary-icon">
          {icon}
        </div>
      </div>

      <h2>{value}</h2>
    </div>
  );
}