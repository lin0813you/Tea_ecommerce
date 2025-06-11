// client/src/pages/CartPage.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { useCart } from '../hooks/useCart'; // Updated import path
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createOrder } from '../api/order';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    updateQuantity(cartItemId, parseInt(newQuantity, 10));
  };

  const handleSubmitOrder = async () => {
    if (!user) return;
    try {
      await createOrder({
        customerName: user.name,
        items: cartItems.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          size: i.customization?.size,
          sugar: i.customization?.sugar,
          ice: i.customization?.ice,
        })),
      });
      clearCart();
      alert('訂單已經送出');
    } catch (err) {
      console.error(err);
      alert('送出訂單失敗');
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 pt-5 text-center" style={{ minHeight: '70vh' }}>
        <h2>您的購物車是空的</h2>
        <p>快去訂購專區看看吧！</p>
        <Button as={Link} to="/order" variant="primary">前往訂購專區</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 pt-5" style={{ minHeight: '70vh' }}>
      <h2 className="mb-4">您的購物車</h2>
      <Row>
        <Col lg={8}>
          <ListGroup className="mb-4">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.cartItemId} className="mb-3 p-3">
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <Image src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} fluid rounded />
                  </Col>
                  <Col xs={9} md={10}>
                    <Row>
                      <Col md={6}>
                        <h5>{item.name}</h5>
                        {item.customization && (
                          <p className="mb-1 text-muted">
                            客製化: {item.customization.size}, {item.customization.ice}, {item.customization.sugar}
                          </p>
                        )}
                         <Form.Group as={Row} className="mb-2 align-items-center">
                          <Form.Label column xs="auto" className="pe-2">數量:</Form.Label>
                          <Col xs="auto">
                            <Form.Control
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.cartItemId, e.target.value)}
                              min="1"
                              style={{ width: '70px' }}
                              size="sm"
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="text-md-end">
                        <h6>小計: NT${calculateSubtotal(item)}</h6>
                      </Col>
                      <Col md={2} className="text-md-end">
                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.cartItemId)}>
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <h4>訂單摘要</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>商品總計</span>
                <span>NT${calculateTotal()}</span>
              </div>
              {/* Add other summary details like shipping, tax if needed */}
              <div className="d-flex justify-content-between fw-bold mt-3">
                <span>總金額</span>
                <span>NT${calculateTotal()}</span>
              </div>
              {user ? (
                <Button variant="primary" className="w-100 mt-3" onClick={handleSubmitOrder}>
                  送出訂單
                </Button>
              ) : (
                <Button variant="primary" className="w-100 mt-3" as={Link} to="/login">
                  前往結帳
                </Button>
              )}
              <Button variant="outline-danger" className="w-100 mt-2" onClick={clearCart}>
                清空購物車
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
