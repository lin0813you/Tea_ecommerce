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
    <Container fluid className="p-3 clerk-dashboard">
      <h1 className="mb-4">店員工作台</h1>

      {lowStockAlertItems.length > 0 && (
        <Alert variant="warning" dismissible className="mb-4">
          <Alert.Heading>低庫存警示!</Alert.Heading>
          <p className="mb-1">
            以下品項庫存不足，請儘速補貨：
          </p>
          <ul>
            {lowStockAlertItems.map(item => (
              <li key={item.id}>{item.name} (剩餘: {item.stock} {item.unit})</li>
            ))}
          </ul>
        </Alert>
      )}

      <Row>
        {/* Order Management Section */}
        <Col md={8} className="mb-3 mb-md-0">
          <Card className="shadow-sm">
            <Card.Header as="h2" className="h5 bg-primary text-white">即時訂單管理</Card.Header>
            <Card.Body>
              {orders.length === 0 ? (
                <p>目前沒有新訂單。</p>
              ) : (
                <ListGroup variant="flush">
                  {orders.map(order => (
                    <ListGroup.Item key={order.id} className="mb-3 border rounded p-3">
                      <Row className="align-items-center">
                        <Col md={2}><strong>訂單號:</strong><br/>{order.id}</Col>
                        <Col md={2}><strong>顧客:</strong><br/>{order.customerName}</Col>
                        <Col md={6}>
                          <strong>品項:</strong>
                          <ul className="list-unstyled mb-0 mt-1">
                            {order.items.map((item, index) => (
                              <li key={index} className="mb-1 p-2 border-bottom" style={{fontSize: '0.9rem'}}>
                                {item.name} x {item.quantity}
                                <br />
                                <small className="text-muted">
                                  規格：{item.size || '-'} / {item.sugar || '-'} / {item.ice || '-'}
                                </small>
                              </li>
                            ))}
                          </ul>
                        </Col>
                        <Col md={2} className="text-end">
                          <strong>狀態:</strong><br/>
                          <Badge 
                            bg={order.status === '新訂單' ? 'info' : order.status === '製作中' ? 'warning' : 'success'}
                            className="mt-1"
                           >
                            {order.status}
                           </Badge>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="text-end">
                          {order.status === '新訂單' && (
                            <Button variant="primary" size="sm" onClick={() => handleUpdateOrderStatus(order.id, '製作中')}>
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
          <Card className="shadow-sm">
            <Card.Header as="h2" className="h5 bg-secondary text-white">庫存監控</Card.Header>
            <Card.Body>
              {inventory.length === 0 ? (
                <p>尚無庫存資料。</p>
              ) : (
                <ListGroup variant="flush">
                  {inventory.map(item => (
                    <ListGroup.Item 
                      key={item.id} 
                      className={`d-flex justify-content-between align-items-center ${item.stock < item.lowStockThreshold ? 'list-group-item-danger' : ''}`}
                    >
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        <small className="text-muted">剩餘: {item.stock} {item.unit}</small>
                      </div>
                      {item.stock < item.lowStockThreshold && (
                        <Button variant="outline-danger" size="sm" onClick={() => handleRequestStock(item.id)}>
                          叫貨
                        </Button>
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
