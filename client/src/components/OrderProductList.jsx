// src/components/OrderProductList.jsx
import React, { useState } from 'react';
import { ListGroup, Image, Row, Col, Modal, Button } from 'react-bootstrap';
import { mockProducts as products } from '../data/mockProducts.js';
import ProductCustomization from './ProductCustomization';
import { useCart } from '../context/CartContext'; // Import useCart

const defaultCustomization = {
  size: 'L',
  ice: 'normal',
  sugar: 'full',
  quantity: 1,
};

export default function OrderProductList() {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentCustomization, setCurrentCustomization] = useState(defaultCustomization);
  const { addToCart } = useCart(); // Use the addToCart function from context

  const handleShowModal = (product) => {
    setCurrentProduct(product);
    setCurrentCustomization(defaultCustomization);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleCustomizationChange = (customization) => {
    setCurrentCustomization(customization);
  };

  const handleAddToCart = () => {
    if (currentProduct && currentCustomization) {
      addToCart(currentProduct, currentCustomization); // Call context function
    }
    handleCloseModal();
  };

  return (
    <>
      <Row>
        {products.map((product) => (
          <Col md={6} key={product.id} className="mb-3">
            <ListGroup.Item action onClick={() => handleShowModal(product)} className="p-2 h-100">
              <Row className="align-items-center">
                <Col xs={3} md={3} lg={2}>
                  <Image src={product.imageUrl} alt={product.name} fluid />
                </Col>
                <Col xs={9} md={9} lg={10}>
                  <h5>{product.name}</h5>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>{product.description}</p>
                  <h6>${product.price}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
          </Col>
        ))}
      </Row>

      {currentProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>客製化: {currentProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductCustomization 
              productName={currentProduct.name} 
              initialDetails={defaultCustomization} 
              onCustomizationChange={handleCustomizationChange} 
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              關閉
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              加入購物車
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
