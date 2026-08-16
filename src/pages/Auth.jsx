import { useState } from "react";
import { supabase } from "../services/supabase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp() {
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created. Check your email if confirmation is required."
    );
  }

  async function handleLogin() {
    setMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful.");
  }

  return (
    <div className="page">
      <div className="form-container">
        <h1>Study Rescue</h1>

        <p className="section-description">
          Sign in to manage your study plan.
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
        >
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="student@example.com"
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            required
          />

          <button
            className="primary-button"
            type="button"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <button
            className="secondary-button"
            type="button"
            onClick={handleSignUp}
          >
            Create Account
          </button>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Auth;