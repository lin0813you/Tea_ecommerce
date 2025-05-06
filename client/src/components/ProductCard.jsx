// src/components/ProductCard.jsx
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function ProductCard({ product, onAddCart }) {
  return (
    <Card className="product-card">
      <div className="product-card__image-wrapper">
        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <Card.Body className="product-card__body">
        <Card.Title className="product-card__title">
          {product.name}
        </Card.Title>
        <Card.Text className="product-card__description">
          {product.description}
        </Card.Text>
        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <Button
            className="product-card__button"
            onClick={() => onAddCart(product)}
          >
            加入購物車
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
