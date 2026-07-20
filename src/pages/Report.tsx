import Layout from "../components/Layout";
import FinanceChart from "../components/FinanceChart";
import MonthlyChart from "../components/MonthlyChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import TopCategories from "../components/TopCategories";

export default function Report() {
  return (
    <Layout>
      <h1>📊 Reports & Analytics</h1>

      <div className="dashboard-two-column">
        <MonthlyChart />
        <IncomeExpenseChart />
      </div>

      <div className="dashboard-two-column">
        <FinanceChart />
        <TopCategories />
      </div>
    </Layout>
  );
}