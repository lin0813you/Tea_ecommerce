// client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import CustomerMainPage from './pages/CustomerMainPage';
import ProductSearchPage from './pages/ProductSearchPage';
import NavBar from './components/NavBar';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage'; // Import CartPage
import { CartProvider } from './context/CartContext';

export default function App() {
  const mockUser = { name: "小明" };

  return (
    <CartProvider>
      <NavBar user={mockUser} />
      <Routes>
        <Route path="/" element={<CustomerMainPage />} />
        <Route path="/products" element={<ProductSearchPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
      </Routes>
    </CartProvider>
  );
}
