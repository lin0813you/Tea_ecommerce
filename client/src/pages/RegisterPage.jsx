// client/src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Container from 'react-bootstrap/Container';
import '../styles/pages/RegisterPage.scss'; // Import SCSS file

export default function RegisterPage() {
  return (
    <Container className="mt-5 register-page"> {/* Add register-page class */}
      <h1>註冊</h1>
      <RegisterForm className="register-form" /> {/* Add register-form class to the component prop*/}
    </Container>
  );
}