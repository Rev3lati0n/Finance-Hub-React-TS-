import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h2>Finance Hub</h2>
        <p>Manage your personal finances</p>
      </div>

      <div className="navbar-user">
        <div className="avatar">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <strong>{user?.username}</strong>
          <p>{user?.email}</p>
        </div>
      </div>
    </header>
  );
}