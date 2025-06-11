// client/src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

// The onUserAuthenticated prop is crucial for App.jsx to know about the login
export default function LoginPage({ onUserAuthenticated }) { 
  const navigate = useNavigate();

  const handleLoginAttempt = (user) => {
    if (user) {
      console.log('LoginPage: User authenticated', user);
      // Notify the parent component (App.jsx) about the successful authentication
      if (onUserAuthenticated) {
        onUserAuthenticated(user);
      }

      // Navigate based on role
      switch (user.role) {
        case 'clerk':
          navigate('/clerk-dashboard');
          break;
        case 'customer':
          navigate('/customer-dashboard'); // Or wherever customers go
          break;
        case 'admin':
          navigate('/admin-dashboard'); // Or wherever admins go
          break;
        default:
          console.error('Unknown user role:', user.role);
          navigate('/'); // Navigate to a default page
          break;
      }
    } else {
      // Error is handled within LoginForm, but you could add more logic here if needed
      console.log('LoginPage: Login attempt failed further.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={4}>
          <LoginForm
            onLoginAttempt={handleLoginAttempt}
            title="系統統一登入"
          />
        </Col>
      </Row>
    </Container>
  );
}
