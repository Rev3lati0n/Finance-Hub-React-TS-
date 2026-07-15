import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>Settings</h1>
        <p>Manage your settings here.</p>
      </main>
    </div>
  );
}