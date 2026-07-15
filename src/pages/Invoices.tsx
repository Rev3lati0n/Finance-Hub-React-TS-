import Sidebar from "../components/Sidebar";

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