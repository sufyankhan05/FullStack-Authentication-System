
import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { refreshAccessToken } from "./api";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const token = await refreshAccessToken();

        if (!cancelled) {
          setAccessToken(token);
        }
      } catch {
        // No valid refresh session; show login.
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (checkingSession) {
    return <p>Checking your session...</p>;
  }

  if (!accessToken) {
    return <Login onLoginSuccess={setAccessToken} />;
  }

  return (
    <Dashboard
      accessToken={accessToken}
      onLogout={() => setAccessToken("")}
    />
  );
}

export default App;
