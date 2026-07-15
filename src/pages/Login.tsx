import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (user: any) =>
        user.email === email && user.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    login({
      username: foundUser.username,
      email: foundUser.email,
    });

    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
  
      <div className="brand">
  <div className="logo">💰</div>

  <h1 className="brand-title">
    Finance Hub
  </h1>

  <p className="subtitle">
    Track • Budget • Grow
  </p>
</div>
  
        {error && <p className="error">{error}</p>}
  
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
        <button type="submit">
          Sign In
        </button>
  
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Create one
          </Link>
        </p>
  
      </form>
    </div>
  );
}