import { useState } from "react";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setMessage(data.message || "Email verified successfully");
    } catch (error) {
      setMessage(error.message || "Could not connect to backend");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="register">
      <h1>Verify your email</h1>
      <p>Enter the email address you registered with and your OTP.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="verify-email">Email</label>
        <input
          id="verify-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="otp">Email OTP</label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying" : "Verfiy Email"}
        </button>
      </form>
      {message && <p role="status">{message}</p>}
    </main>
  );
}
export default VerifyEmail;
