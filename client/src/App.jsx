import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerMainPage from './pages/CustomerMainPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerMainPage />} />
        {/* 未來可新增 /cart, /order-history 等路由 */}
      </Routes>
    </BrowserRouter>
  );
}
