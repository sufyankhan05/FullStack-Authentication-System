
import { useEffect, useState } from "react";

function Dashboard({ accessToken, onLogout }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("Loading profile...");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load profile");
        }

        setUser(data.user);
        setMessage("");
      } catch (error) {
        setMessage(error.message || "Request failed");
      }
    }

    fetchProfile();
  }, [accessToken]);

  return (
    <main>
      <h1>Dashboard</h1>

      {message && <p>{message}</p>}

      {user && (
        <section>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </section>
      )}

      <button onClick={onLogout}>Logout</button>
    </main>
  );
}

export default Dashboard;
