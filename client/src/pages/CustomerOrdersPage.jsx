import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { useCustomerOrders } from '../hooks/useCustomerOrders';

export default function CustomerOrdersPage() {
  const { orders, cancelOrder } = useCustomerOrders();

  const inProgress = orders.filter(o => ['新訂單', '製作中'].includes(o.status));
  const history = orders.filter(o => !['新訂單', '製作中'].includes(o.status));

  const renderItems = (order) => (
    <ul className="mt-2 mb-0 list-unstyled">
      {order.items.map((item, idx) => (
        <li key={idx}>{item.name} x {item.quantity}</li>
      ))}
    </ul>
  );

  return (
    <Container className="mt-5 pt-5">
      <h1 className="mb-4">訂單查詢</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header as="h2" className="h5">進行中訂單</Card.Header>
            <Card.Body>
              {inProgress.length === 0 ? (
                <p>沒有進行中的訂單</p>
              ) : (
                <ListGroup variant="flush">
                  {inProgress.map(order => (
                    <ListGroup.Item key={order.id} className="mb-3 border rounded p-3">
                      <Row className="align-items-center">
                        <Col xs={5}><strong>訂單號:</strong> {order.id}</Col>
                        <Col xs={4}><Badge bg={order.status === '新訂單' ? 'info' : 'warning'}>{order.status}</Badge></Col>
                        <Col xs={3} className="text-end">
                          <Button variant="outline-danger" size="sm" onClick={() => cancelOrder(order.id)}>
                            取消
                          </Button>
                        </Col>
                      </Row>
                      {renderItems(order)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header as="h2" className="h5">歷史訂單</Card.Header>
            <Card.Body>
              {history.length === 0 ? (
                <p>沒有歷史訂單</p>
              ) : (
                <ListGroup variant="flush">
                  {history.map(order => (
                    <ListGroup.Item key={order.id} className="mb-3 border rounded p-3">
                      <Row className="align-items-center">
                        <Col xs={6}><strong>訂單號:</strong> {order.id}</Col>
                        <Col xs={6} className="text-end">
                          <Badge bg={order.status === '已取消' ? 'secondary' : 'success'}>{order.status}</Badge>
                        </Col>
                      </Row>
                      {renderItems(order)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
