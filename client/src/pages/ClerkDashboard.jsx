// client/src/pages/ClerkDashboard.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge, Alert } from 'react-bootstrap';
import { useClerkOrders } from '../hooks/useClerkOrders';
import { useClerkInventory } from '../hooks/useClerkInventory';

export default function ClerkDashboard() {
  const { orders, updateOrderStatus } = useClerkOrders();
  const { inventory, lowStockAlertItems, requestStock } = useClerkInventory();

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleRequestStock = (itemId) => {
    requestStock(itemId);
  };

  return (
    <Container fluid className="p-3">
      <h1>店員工作台</h1>
      <hr />

      {lowStockAlertItems.length > 0 && (
        <Alert variant="warning" dismissible>
          <Alert.Heading>低庫存警示!</Alert.Heading>
          <p>
            以下品項庫存不足，請儘速補貨：
            <ul>
              {lowStockAlertItems.map(item => (
                <li key={item.id}>{item.name} (剩餘: {item.stock} {item.unit})</li>
              ))}
            </ul>
          </p>
        </Alert>
      )}

      <Row>
        {/* Order Management Section */}
        <Col md={8}>
          <Card>
            <Card.Header as="h2">即時訂單管理</Card.Header>
            <Card.Body>
              {orders.length === 0 ? (
                <p>目前沒有新訂單。</p>
              ) : (
                <ListGroup variant="flush">
                  {orders.map(order => (
                    <ListGroup.Item key={order.id}>
                      <Row>
                        <Col md={3}><strong>訂單編號:</strong> {order.id}</Col>
                        <Col md={3}><strong>顧客:</strong> {order.customerName}</Col>
                        <Col md={4}>
                          <strong>品項:</strong>
                          <ul>
                            {order.items.map(item => (
                              <li key={item.name}>{item.name} x {item.quantity}</li>
                            ))}
                          </ul>
                        </Col>
                        <Col md={2}>
                          <strong>狀態:</strong> <Badge bg={order.status === '新訂單' ? 'primary' : order.status === '製作中' ? 'warning' : 'success'}>{order.status}</Badge>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="text-end">
                          {order.status === '新訂單' && (
                            <Button variant="info" size="sm" onClick={() => handleUpdateOrderStatus(order.id, '製作中')}>
                              開始製作
                            </Button>
                          )}
                          {order.status === '製作中' && (
                            <Button variant="success" size="sm" onClick={() => handleUpdateOrderStatus(order.id, '已完成')}>
                              標記完成
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Inventory Management Section */}
        <Col md={4}>
          <Card>
            <Card.Header as="h2">庫存監控</Card.Header>
            <Card.Body>
              {inventory.length === 0 ? (
                <p>尚無庫存資料。</p>
              ) : (
                <ListGroup variant="flush">
                  {inventory.map(item => (
                    <ListGroup.Item key={item.id} className={item.stock < item.lowStockThreshold ? 'list-group-item-danger' : ''}>
                      <Row>
                        <Col><strong>{item.name}</strong></Col>
                        <Col className="text-end">{item.stock} {item.unit}</Col>
                      </Row>
                      {item.stock < item.lowStockThreshold && (
                        <Row className="mt-1">
                          <Col className="text-end">
                            <Button variant="outline-danger" size="sm" onClick={() => handleRequestStock(item.id)}>
                              向供應商叫貨
                            </Button>
                          </Col>
                        </Row>
                      )}
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
