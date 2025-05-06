// src/components/NavBar.jsx
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FaShoppingCart, FaUser } from 'react-icons/fa'


export default function NavBar({ user, cartCount }) {
  return (
    <Navbar fixed="top" bg="light" className="navbar-teashop">
      <Container>
        {/* 品牌／標題 */}
        <Navbar.Brand href="/" className="navbar-teashop__brand">
          高師獅手搖茶飲
        </Navbar.Brand>

        {/* 永遠展開的水平選單 */}
        <Nav className="navbar-teashop__nav ms-auto">
          <Nav.Link href="/">首頁</Nav.Link>
          <Nav.Link href="/products">所有商品</Nav.Link>
          <Nav.Link href="/cart" className="nav-icon-link">
            <FaShoppingCart />
            購物車
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Nav.Link>

          {user ? (
            <Nav.Link href="/profile" className="nav-icon-link">
              <FaUser />
              {user.name}
            </Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login">登入</Nav.Link>
              <Nav.Link href="/register">註冊</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}
