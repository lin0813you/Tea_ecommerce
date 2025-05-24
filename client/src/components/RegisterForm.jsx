// client/src/components/RegisterForm.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function RegisterForm({ className }) { // Add className prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Register submitted', { email, password });
  };

  return (
    <Form onSubmit={handleSubmit} className={className}> {/* Use className prop */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>電子郵件</Form.Label>
        <Form.Control
          type="email"
          placeholder="輸入電子郵件"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>密碼</Form.Label>
        <Form.Control
          type="password"
          placeholder="輸入密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>確認密碼</Form.Label>
        <Form.Control
          type="password"
          placeholder="再次輸入密碼"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        註冊
      </Button>
    </Form>
  );
}