// src/components/NavBar.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import '../styles/components/NavBar.scss';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
  const { cartCount } = useCart();
  const { user } = useAuth();

  console.log('NavBar cartCount:', cartCount); // Debugging line

  return (
    <Navbar fixed="top" bg="light" className="navbar-teashop">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-teashop__brand">
          高師獅手搖茶飲
        </Navbar.Brand>

        <Nav className="navbar-teashop__nav ms-auto">
          <Nav.Link as={Link} to="/">
            首頁
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            所有商品
          </Nav.Link>
          <Nav.Link as={Link} to="/order">
            訂購專區
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="nav-icon-link">
            <FaShoppingCart />
            購物車
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Nav.Link>

          {user ? (
            <Nav.Link as={Link} to="/profile" className="nav-icon-link">
              <FaUser />
              {user.name}
            </Nav.Link>
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
      </Container>
    </Navbar>
  );
}
