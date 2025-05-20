// src/pages/OrderPage.jsx
import React from 'react';
import OrderProductList from '../components/OrderProductList';
import Container from 'react-bootstrap/Container';

export default function OrderPage() {
  return (
    <Container className="mt-5 pt-5">
      <h1 className="mb-4">訂購專區</h1>
      <OrderProductList />
    </Container>
  );
}
