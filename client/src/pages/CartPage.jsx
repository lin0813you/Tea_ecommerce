// client/src/pages/CartPage.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems } = useCart();

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 pt-5 text-center">
        <h2>您的購物車是空的</h2>
        <p>快去訂購專區看看吧！</p>
        <Button as={Link} to="/order" variant="primary">前往訂購專區</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">您的購物車</h2>
      <ListGroup className="mb-4">
        {cartItems.map((item) => (
          <ListGroup.Item key={item.cartItemId} className="mb-3">
            <Row className="align-items-center">
              <Col xs={3} md={2}>
                <Image src={item.imageUrl} alt={item.name} fluid rounded />
              </Col>
              <Col xs={9} md={10}>
                <Row>
                  <Col md={8}>
                    <h5>{item.name}</h5>
                    <p className="mb-1">
                      客製化: {item.size}, {item.ice}, {item.sugar}
                    </p>
                    <p className="mb-1">數量: {item.quantity}</p>
                  </Col>
                  <Col md={4} className="text-md-end">
                    <h6>小計: ${calculateSubtotal(item)}</h6>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card>
        <Card.Body className="text-end">
          <h4>總金額: ${calculateTotal()}</h4>
          {/* Checkout button can be added later */}
          {/* <Button variant="success">前往結帳</Button> */}
        </Card.Body>
      </Card>
    </Container>
  );
}
