
// import { useEffect, useState } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// }from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import {ProtectedRoute} from"./ProtectedRoute";
// import { refreshAccessToken } from "./api";

// const API_URL = import.meta.env.VITE.API_URL || "http://localhost:5000";
// function AppPages() {
//   const [accessToken, setAccessToken] = useState("");
//   const [checkingSession, setCheckingSession] = useState(true);
//   const [loggingOut, setLoggingOut] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let cancelled = false;

//     async function restoreSession() {
//       try {
//         const token = await refreshAccessToken();

//         if (!cancelled) {
//           setAccessToken(token);
//         }
//       } catch {
//         // No valid refresh session; show login.
//       } finally {
//         if (!cancelled) {
//           setCheckingSession(false);
//         }
//       }
//     }

//     restoreSession();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   async function handleLogout() {
//     if(loggingOut) return;

//     setLoggingOut(true);

//     try {
//       const response = await fetch(
//         `${API_URL}/api/auth/logout`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           credentials: "include",
//         }
//       );
//       const data = await response.json().catch(() =>({}))

//       if(!response.ok) {
//         throw new Error(data.message || "Logout failed");
//       }

//       setAccessToken("");
//       navigate("/login",{ replace: true});
//     } catch (error) {
//       alert(error.message || "Could not log out. please try again.");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   if (checkingSession) {
//     return <p>Checking your session...</p>;
//   }

//   if (!accessToken) {
//     return <Login onLoginSuccess={setAccessToken} />;
//   }

//   return (
//     <Dashboard
//       accessToken={accessToken}
//       onLogout={() => setAccessToken("")}
//     />
//   );
// }

// export default AppPages;



import Register from "./Register";
import "./App.css";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
function App() {
  return <Login />;
}

export default App;
