import React, { useState } from 'react';
import { registerUser } from './api';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      // Default role list includes USER
      const roles = ['USER'];
      if (isAdmin) {
        roles.push('ADMIN');
      }

      await registerUser(username, password, roles);

      // Redirect to login page with success message
      navigate('/login', { state: { successMessage: 'User registered successfully! Please log in.' } });
    } catch (error) {
      console.error('Error during user registration:', error);
      setErrorMessage('Error during registration, please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Signup</h2>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAdminCheckbox" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Request Admin Role"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSignup} className="w-100">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
