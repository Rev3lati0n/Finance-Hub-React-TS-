import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";


export default function Invoices() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>Invoices</h1>
        <p>Create and manage invoices.</p>
      </main>
    </div>
  );
}