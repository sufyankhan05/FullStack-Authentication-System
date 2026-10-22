//This component prevents logged-out users from viewing the dashboard.

import { Navigate, Outlet } from "react-router-dom";

function protectedRoute({ accessToken }) {
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
export default protectedRoute;

//Outlet renders the protected page when a token exists. Otherwise, Navigate sends the user to the login page.
