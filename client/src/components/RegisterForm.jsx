// client/src/components/RegisterForm.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register as registerApi } from '../api/auth';

export default function RegisterForm({ className }) { // Add className prop
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      await registerApi({ phone, username, password });
      alert('Registration successful');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={className}> {/* Use className prop */}
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>手機號碼</Form.Label>
        <Form.Control
          type="text"
          placeholder="輸入手機號碼"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>帳號</Form.Label>
        <Form.Control
          type="text"
          placeholder="輸入帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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