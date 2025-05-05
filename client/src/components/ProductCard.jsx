// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted flex-grow-1">
          ${product.price.toFixed(2)}
        </p>
        <button className="btn btn-success mt-2">加入購物車</button>
      </div>
    </div>
  );
}
