// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar           from './components/NavBar'
import HomePage         from './pages/HomePage'
import ProductsPage     from './pages/ProductsPage'


function App() {
  const mockUser      = { name: '小明' }
  const mockCartCount = 3

  return (
    <>
      <NavBar user={mockUser} cartCount={mockCartCount} />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* 其他路由像 /cart, /profile… */}
      </Routes>
    </>
  )
}

export default App

