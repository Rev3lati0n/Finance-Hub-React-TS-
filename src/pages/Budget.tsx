import Sidebar from "../components/Sidebar";

export default function Budget() {
  return ( 
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>Budget Planner</h1>
        <p>Set and manage your monthly budget.</p>
      </main>
    </div>
  );
}