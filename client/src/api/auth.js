export async function login(username, password) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    // Try to get error message from response body
    let errorMsg = "Invalid credentials";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      // Ignore if response is not JSON or other error
    }
    throw new Error(errorMsg);
  }
  const data = await res.json();
  return data; // Assuming the backend returns user data/token directly
}

export async function register(userData) {
  // Renamed 'data' to 'userData' for clarity
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    // Try to get error message from response body
    let errorMsg = "Registration failed";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      // Ignore if response is not JSON or other error
    }
    throw new Error(errorMsg);
  }
  const data = await res.json();
  return data; // Assuming the backend returns some data upon successful registration
}
