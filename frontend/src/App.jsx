import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import protectedRoute from "./ProtectedRoute";
import { refreshAccessToken } from "./api";

function AppPages() {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    if (!accessToken) {
      console.warn("No access token. Attempting to restore the session.");

      try {
        const token = await refreshAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Session restoration failed:", error);
        setAccessToken("");
        navigate("/login", { replace: true });
        return;
      }
    }
    setLoggingOut(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || `Logout failed (${response.status})`);
      }
      setAccessToken("");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert(error.message || "Unable to logout");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          accessToken ? (
            <Navigate to={"/dashboard"} replace />
          ) : (
            <Login onLoginSuccess={setAccessToken} />
          )
        }
      />

      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard accessToken={accessToken} onLogout={handleLogout} />
        }
      />
      <Route
        path="*"
        element={
          <Navigate to={accessToken ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppPages />
    </BrowserRouter>
  );
}
export default App;
