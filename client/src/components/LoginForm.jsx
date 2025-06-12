// client/src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { login as loginApi } from '../api/auth';

export default function LoginForm({
  onLoginAttempt,
  title = "系統登入"
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const user = await loginApi(username, password);
      if (onLoginAttempt) onLoginAttempt(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="shadow-sm login-form-card"> {/* Added a class for potential styling */}
      <Card.Body>
        <Card.Title as="h3" className="text-center mb-4">{title}</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginFormUsername">
            <Form.Label>帳號</Form.Label>
            <Form.Control
              type="text"
              placeholder="請輸入帳號"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginFormPassword">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              登入
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
