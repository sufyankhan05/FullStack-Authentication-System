
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setAccessToken("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.accessToken) {
        throw new Error("Login succeeded, but no access token was returned");
      }

      setAccessToken(data.accessToken);
      setMessage("Login successful!");
      setPassword("");
    } catch (error) {
      setMessage(error.message || "Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
{/* submit-Tells the browser to submit the form when the button is clicked. */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      {accessToken && (
        <p>Access token received. You can now request protected APIs.</p>
      )}
    </main>
  );
}

export default Login;
