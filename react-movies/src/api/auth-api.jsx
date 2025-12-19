const API_BASE = "http://localhost:8080/api";

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Login failed");
  return data;
};

export const signup = async (username, password) => {
  const res = await fetch(`${API_BASE}/users?action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Signup failed");
  return data;
};
