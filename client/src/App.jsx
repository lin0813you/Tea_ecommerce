import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerMainPage from './pages/CustomerMainPage';
import ProductSearchPage from './pages/ProductSearchPage';
import NavBar from './components/NavBar';
import OrderPage from './pages/OrderPage';

export default function App() {
  // TODO: 之後從 Context 或 API 拿到真正的 user/cartCount
  const mockUser = { name: "小明" };
  const mockCartCount = 3;

  return (
    <>
      <NavBar user={mockUser} cartCount={mockCartCount} />
      <Routes>
        <Route path="/" element={<CustomerMainPage />} />
        <Route path="/products" element={<ProductSearchPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  )
}
