import Sidebar from "../components/Sidebar";

export default function Profile() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <h1>Profile</h1>
        <p>This is the user's account.</p>
      </main>
    </div>
  );
}