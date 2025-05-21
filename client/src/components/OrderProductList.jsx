// src/components/OrderProductList.jsx
import React, { useState, useCallback, useMemo } from 'react'; // Added useMemo
import { ListGroup, Image, Row, Col, Modal, Button, Spinner, Alert } from 'react-bootstrap';
import ProductCustomization from './ProductCustomization';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

const defaultCustomizationDetails = {
  size: 'L',
  ice: 'normal',
  sugar: 'full',
};

const defaultQuantity = 1;

export default function OrderProductList() {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [customizationOptions, setCustomizationOptions] = useState(defaultCustomizationDetails);
  const [quantity, setQuantity] = useState(defaultQuantity);

  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  // Memoize initialDetails for ProductCustomization
  const memoizedInitialDetails = useMemo(() => ({
    ...defaultCustomizationDetails,
    quantity: defaultQuantity,
  }), []); // Depends on constants, so it's stable

  const handleShowModal = useCallback((product) => {
    setCurrentProduct(product);
    // Reset to the memoized defaults, not new objects
    setCustomizationOptions(memoizedInitialDetails); 
    setQuantity(memoizedInitialDetails.quantity);
    setShowModal(true);
  }, [memoizedInitialDetails]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setCurrentProduct(null);
  }, []);

  const handleProductCustomizationChange = useCallback((customization) => {
    setCustomizationOptions({ 
      size: customization.size, 
      ice: customization.ice, 
      sugar: customization.sugar 
    });
    setQuantity(customization.quantity);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (currentProduct) {
      addToCart(currentProduct, quantity, customizationOptions);
    }
    handleCloseModal();
  }, [currentProduct, quantity, customizationOptions, addToCart, handleCloseModal]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading products...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error loading products: {error}</Alert>;
  }
  
  if (!products || products.length === 0) {
    return <Alert variant="info">No products found.</Alert>;
  }

  return (
    <>
      <Row>
        {products.map((product) => (
          <Col md={6} key={product.id} className="mb-3">
            <ListGroup.Item action onClick={() => handleShowModal(product)} className="p-3 h-100 d-flex flex-column justify-content-between">
              <Row className="align-items-center w-100">
                <Col xs={3} md={3} lg={2} className="pe-2">
                  <Image src={product.imageUrl || 'https://via.placeholder.com/100'} alt={product.name} fluid rounded />
                </Col>
                <Col xs={9} md={9} lg={10}>
                  <h5>{product.name}</h5>
                  <p className="text-muted small mb-1">{product.description || 'No description available.'}</p>
                  <h6>NT${product.price}</h6>
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
              initialDetails={memoizedInitialDetails} // Use memoized version
              onCustomizationChange={handleProductCustomizationChange} 
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
