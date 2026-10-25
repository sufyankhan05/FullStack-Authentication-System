import { useEffect, useState } from "react";

function Dashboard({ accessToken, onLogout,loggingOut }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("Loading profile...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      setLoading(true);
      setMessage("");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        if (!cancelled) {
          setUser(data.user);
          setMessage("");
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(error.message || "Unable to connect to backend");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (accessToken) {
      fetchProfile();
    } else {
      setUser(null);
      setMessage("Please log in to continue.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  async function handleLogoutClick() {
    await onLogout();
  }

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>

      {loading && <p>Loading your profile...</p>}

      {!loading && message && <p>{message}</p>}

      {!loading && user && (
        <section>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </section>
      )}

      <button type="button" onClick={onLogout} disabled={!accessToken}>
        Logout
      </button>
    </main>
  );
}

export default Dashboard;



// function Dashboard({ user, onLogout, loggingOut }) {
//   if (!user) {
//     return (
//       <main className="dashboard">
//         <h1>Dashboard</h1>
//         <p>Please log in to continue.</p>
//       </main>
//     );
//   }

//   return (
//     <main className="dashboard">
//       <h1>Dashboard</h1>

//       <section className="dashboard-card">
//         <h2>Welcome, {user.name || "User"}!</h2>

//         <p>
//           <strong>Email:</strong> {user.email}
//         </p>

//         <p>
//           <strong>Role:</strong> {user.role || "user"}
//         </p>

//         <p>
//           <strong>Email verified:</strong>{" "}
//           {user.isEmailVerified ? "Yes" : "No"}
//         </p>

//         <button
//           type="button"
//           onClick={onLogout}
//           disabled={loggingOut}
//         >
//           {loggingOut ? "Logging out..." : "Logout"}
//         </button>
//       </section>
//     </main>
//   );
// }

// export default Dashboard;
