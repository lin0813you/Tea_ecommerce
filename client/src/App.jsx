import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerMainPage from './pages/CustomerMainPage';
import ProductSearchPage from './pages/ProductSearchPage';

export default function App() {
  return (
    <>
      <NavBar user={mockUser} cartCount={mockCartCount} />
      <Routes>
        <Route path="/" element={<CustomerMainPage />} />
        {/* 未來可新增 /cart, /order-history 等路由 */}
        <Route path="/products" element={<ProductSearchPage />} />
      </Routes>
    </>
  )
}

export default App

