// src/pages/CustomerMainPage.jsx
import { useEffect, useState } from 'react'
import { fetchProducts }    from '../api/product'
import ProductCard          from '../components/ProductCard'
import SearchBar            from '../components/SearchBar'
import NavBar               from '../components/NavBar'
import './CustomerMainPage.scss'

export default function CustomerMainPage() {
  const [products, setProducts] = useState([])
  const [query,    setQuery]    = useState('')

  // TODO: 之後從 Context 或 API 拿到真正的 user/cartCount
  const mockUser      = { name: '小明' }
  const mockCartCount = 3

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.products)
      })
      .catch(err => console.error(err))
  }, [])

  const filtered = (products ?? []).filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      {/* 1. 導覽列放最上方 */}
      <NavBar user={mockUser} cartCount={mockCartCount} />

      {/* 2. 主內容容器 */}
      <div className="container py-4 main-container">

        {/* 3. 搜尋列 */}
        <SearchBar value={query} onChange={setQuery} />

        {/* 4. 商品列表 */}
        <div className="row g-4">
          {filtered.map(p => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
