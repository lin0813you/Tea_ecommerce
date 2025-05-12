import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerMainPage from './pages/CustomerMainPage';
import ProductSearchPage from './pages/ProductSearchPage';
import NavBar from './components/NavBar';

export default function App() {
  // TODO: 之後從 Context 或 API 拿到真正的 user/cartCount
  const mockUser = { name: "小明" };
  const mockCartCount = 3;

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
