// client/src/App.jsx
import React, { useState } from 'react'; // Added useState
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import CustomerMainPage from './pages/CustomerMainPage';
import ProductSearchPage from './pages/ProductSearchPage';
import NavBar from './components/NavBar';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './pages/ClerkDashboard'; // Import ClerkDashboard

// import { CartProvider } from './context/CartContext'; // Removed CartProvider

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleUserAuthenticated = (user) => {
    console.log("App.jsx: User authenticated", user);
    setLoggedInUser(user);
  };

  // Function to handle logout (can be passed to NavBar or other components)
  const handleLogout = () => {
    setLoggedInUser(null);
    // Potentially clear any other user-related state or tokens here
    // Navigate to login page after logout
    // Note: Navigation might need to be handled differently if called from a component not directly in Routes
  };

  return (
    <>
      <NavBar user={loggedInUser} onLogout={handleLogout} /> {/* Pass user and logout handler to NavBar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Login Route - redirects if already logged in */}
        <Route
          path="/login"
          element={
            loggedInUser ? (
              // Navigate to the appropriate dashboard if already logged in
              <Navigate to={loggedInUser.role === 'clerk' ? "/clerk-dashboard" : "/"} />
            ) : (
              <LoginPage onUserAuthenticated={handleUserAuthenticated} />
            )
          }
        />

        {/* Protected Clerk Route */}
        <Route
          path="/clerk-dashboard"
          element={
            loggedInUser && loggedInUser.role === 'clerk' ? (
              <ClerkDashboard />
            ) : (
              <Navigate to="/login" state={{ message: "請先登入以存取店員介面" }} />
            )
          }
        />

        {/* Customer/General Routes - Assuming CustomerMainPage is the main public page */}
        {/* These might also become protected or have different versions based on loggedInUser.role === 'customer' */}
        <Route path="/" element={<CustomerMainPage />} />
        <Route path="/products" element={<ProductSearchPage />} />
        <Route path="/order" element={<OrderPage />} /> {/* Consider if this needs protection */}
        <Route path="/cart" element={<CartPage />} />   {/* Consider if this needs protection */}

        {/* Fallback for any other unmatched routes */}
        <Route path="*" element={<Navigate to={loggedInUser && loggedInUser.role === 'clerk' ? "/clerk-dashboard" : "/"} />} />
      </Routes>
    </>
  );
}
