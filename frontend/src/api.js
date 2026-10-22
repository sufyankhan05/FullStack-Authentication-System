const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function checkBackend() {
  const response = await fetch(`${API_URL}/`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Backend request failed");
  }

  return data;
}

export async function refreshAccessToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Session expired");
  }

  if (!data.accessToken) {
    throw new Error("No access token returned by the server");
  }

  return data.accessToken;
}
