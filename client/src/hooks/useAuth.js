import { useState, useEffect } from 'react';

// This is a placeholder for actual authentication logic.
// You'll need to replace this with your actual authentication implementation,
// possibly fetching data from an API or checking a token.
const getCurrentUser = () => {
  // For now, let's return a mock user.
  // Replace this with logic to get the actual current user.
  return JSON.parse(localStorage.getItem('user')); // Example: { name: 'Guest' } or null if not logged in
};

export const useAuth = () => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    // Listen for custom event that might be dispatched when auth state changes
    window.addEventListener('authChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChanged', handleStorageChange);
    };
  }, []);

  return { user };
};
