// client/src/components/ProductCustomization.jsx
import React, { useState, useEffect } from 'react';
import { Form, ButtonGroup, ToggleButton, Card, InputGroup, Button } from 'react-bootstrap';

const sizeOptions = [
  { name: '中杯', value: 'M' },
  { name: '大杯', value: 'L' },
];

const iceOptions = [
  { name: '正常冰', value: 'normal' },
  { name: '少冰', value: 'less' },
  { name: '微冰', value: 'light' },
  { name: '去冰', value: 'none' },
  // { name: '常溫', value: 'room' }, // Example, if needed
  // { name: '熱', value: 'hot' },   // Example, if needed
];

const sugarOptions = [
  { name: '全糖', value: 'full' },
  { name: '七分糖', value: '70' }, // Changed for consistency if values are percentages
  { name: '五分糖', value: '50' }, // Changed (半糖)
  { name: '三分糖', value: '30' },
  // { name: '一分糖', value: '10' }, // Example
  { name: '無糖', value: '0' },   // Changed (無糖)
];

export default function ProductCustomization({ productName, onCustomizationChange, initialDetails }) {
  const [selectedSize, setSelectedSize] = useState(initialDetails?.size || 'L'); // Default to L as per image
  const [selectedIce, setSelectedIce] = useState(initialDetails?.ice || 'normal');
  const [selectedSugar, setSelectedSugar] = useState(initialDetails?.sugar || 'full');
  const [quantity, setQuantity] = useState(initialDetails?.quantity || 1);

  useEffect(() => {
    if (onCustomizationChange) {
      onCustomizationChange({
        size: selectedSize,
        ice: selectedIce,
        sugar: selectedSugar,
        quantity: quantity,
      });
    }
  }, [selectedSize, selectedIce, selectedSugar, quantity, onCustomizationChange]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Reset to initial details when product changes or modal reopens for a new product
  useEffect(() => {
    setSelectedSize(initialDetails?.size || 'L');
    setSelectedIce(initialDetails?.ice || 'normal');
    setSelectedSugar(initialDetails?.sugar || 'full');
    setQuantity(initialDetails?.quantity || 1);
  }, [productName, initialDetails]);


  return (
    <Card className="mt-0 mb-0 border-0">
      <Card.Body className="pb-0">
        <Form.Group className="mb-3">
          <Form.Label className="d-block mb-1 fw-bold">尺寸</Form.Label>
          <ButtonGroup>
            {sizeOptions.map((option) => (
              <ToggleButton
                key={option.value}
                id={`size-${productName}-${option.value}`}
                type="radio"
                variant={selectedSize === option.value ? 'primary' : 'outline-secondary'}
                name={`size-${productName}`}
                value={option.value}
                checked={selectedSize === option.value}
                onChange={(e) => setSelectedSize(e.currentTarget.value)}
                className="me-1"
              >
                {option.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="d-block mb-1 fw-bold">冰度</Form.Label>
          <div className="d-flex flex-wrap">
            {iceOptions.map((option) => (
              <ToggleButton
                key={option.value}
                id={`ice-${productName}-${option.value}`}
                type="radio"
                variant={selectedIce === option.value ? 'primary' : 'outline-secondary'}
                name={`ice-${productName}`}
                value={option.value}
                checked={selectedIce === option.value}
                onChange={(e) => setSelectedIce(e.currentTarget.value)}
                className="me-1 mb-1"
              >
                {option.name}
              </ToggleButton>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="d-block mb-1 fw-bold">甜度</Form.Label>
          <div className="d-flex flex-wrap">
          {sugarOptions.map((option) => (
            <ToggleButton
              key={option.value}
              id={`sugar-${productName}-${option.value}`}
              type="radio"
              variant={selectedSugar === option.value ? 'primary' : 'outline-secondary'}
              name={`sugar-${productName}`}
              value={option.value}
              checked={selectedSugar === option.value}
              onChange={(e) => setSelectedSugar(e.currentTarget.value)}
              className="me-1 mb-1"
            >
              {option.name}
            </ToggleButton>
          ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="d-block mb-1 fw-bold">杯數</Form.Label>
          <InputGroup style={{ maxWidth: '150px' }}>
            <Button variant="outline-secondary" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</Button>
            <Form.Control
              type="text"
              readOnly
              value={quantity}
              className="text-center"
            />
            <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)}>+</Button>
          </InputGroup>
        </Form.Group>

      </Card.Body>
    </Card>
  );
}
