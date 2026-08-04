import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete every field.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.find(
      (u: any) => u.email === email
    );

    if (exists) {
      setError("Email already exists.");
      return;
    }

    users.push({
      username,
      email,
      password,
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    navigate("/login");
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
            Create your free account
          </p>

        </div>

        <form onSubmit={handleSignup}>

          {error && (
            <p className="error">{error}</p>
          )}

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="auth-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}