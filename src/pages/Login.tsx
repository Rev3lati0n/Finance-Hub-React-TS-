import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u: any) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    login({
      username: user.username,
      email: user.email,
    });

    navigate("/dashboard");
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="brand">

          <div className="logo">💰</div>

          <h1 className="brand-title">
            Finance Hub
          </h1>

          <p className="subtitle">
            Track • Budget • Grow
          </p>

        </div>

        <form onSubmit={handleLogin}>

          {error && (
            <p className="error">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Sign In
          </button>

        </form>

        <p className="auth-footer">

          Don't have an account?

          <Link to="/signup">
            Create one
          </Link>

        </p>

      </div>

    </div>
  );
}