// client/src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

export default function LoginForm({ 
  onLoginAttempt, 
  title = "系統登入", 
  mockUsers = [] 
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    console.log('LoginForm handleSubmit triggered');
    console.log('Props - title:', title);
    console.log('Props - mockUsers:', JSON.stringify(mockUsers)); // Be cautious with large user lists
    console.log('State - username:', username);
    console.log('State - password:', password);

    const usersArray = Array.isArray(mockUsers) ? mockUsers : [];
    const user = usersArray.find(
      (u) => u.username === username && u.password === password
    );

    console.log('Found user:', JSON.stringify(user));

    if (user) {
      console.log(`Login successful for user: ${user.username}, role: ${user.role}`);
      if (onLoginAttempt) {
        onLoginAttempt(user); // Pass the entire user object
      }
    } else {
      console.error('Login failed. Invalid credentials.');
      setError('登入失敗，請檢查您的帳號或密碼。若問題持續，請聯繫系統管理員。 ');
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
