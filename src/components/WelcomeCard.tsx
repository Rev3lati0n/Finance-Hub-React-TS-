import { useAuth } from "../context/AuthContext";
import "./WelcomeCard.css";

export default function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="welcome-card">
      <div>
        <h1>
          Welcome back,
          <br />
          {user?.username ?? "User"} 👋
        </h1>

        <p>
          Here's an overview of your finances today.
        </p>
      </div>

      <div className="welcome-icon">
        💰
      </div>
    </div>
  );
}