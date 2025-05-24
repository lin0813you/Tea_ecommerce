// client/src/components/NavBar.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaTachometerAlt } from 'react-icons/fa'; // Added FaTachometerAlt for Dashboard icon
// import { useCart } from '../hooks/useCart';
const useCart = () => ({ cartCount: 0 }); // Mocking useCart for now

// Helper function to translate role to Chinese (kept for potential future use)
const getRoleDisplayName = (role) => {
  switch (role) {
    case 'clerk':
      return '店員';
    case 'customer':
      return '顧客';
    case 'admin':
      return '管理員';
    default:
      return role;
  }
};

export default function NavBar({ user, onLogout }) {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-teashop mb-3" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to={user && user.role === 'clerk' ? "/clerk-dashboard" : "/"} className="navbar-teashop__brand">
          <img src="/src/assets/images/oolongTea.png" alt="Tea Shop Logo" height="30" className="me-2" />
          高師獅手搖茶飲 {user && user.role === 'clerk' ? "- 店員系統" : ""}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-teashop__nav ms-auto align-items-center">
            {/* Conditional Links based on user role */}
            {user && user.role === 'clerk' ? (
              <>
                <Nav.Link as={Link} to="/clerk-dashboard">
                  <FaTachometerAlt className="me-1" />
                  主控台
                </Nav.Link>
                {/* Clerks might have other specific links here */}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  首頁
                </Nav.Link>
                <Nav.Link as={Link} to="/products">
                  所有商品
                </Nav.Link>
                {/* Show Order link only if user is a customer or not logged in */}
                {(!user || user.role === 'customer') && (
                  <Nav.Link as={Link} to="/order">
                    訂購專區
                  </Nav.Link>
                )}
                {/* Show Cart link only if user is a customer or not logged in */}
                {(!user || user.role === 'customer') && (
                  <Nav.Link as={Link} to="/cart" className="nav-icon-link">
                    <FaShoppingCart />
                    購物車
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Nav.Link>
                )}
              </>
            )}

            {/* User display and Login/Logout Buttons */}
            {user ? (
              <>
                <Nav.Item className="d-flex align-items-center me-3">
                  <FaUser className="me-1" /> 
                  {user.name}
                </Nav.Item>
                <Button variant="outline-secondary" size="sm" onClick={handleLogoutClick}>
                  登出
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  登入
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  註冊
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
