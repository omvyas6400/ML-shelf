import React, { useState } from 'react';
import { loginUser } from './api';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setToken, setUsername }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Retrieve success message from navigation state
  const successMessage = location.state?.successMessage || '';

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      setToken(response.data.token);
      setUsername(username);
      navigate('/models'); // Redirect to models page upon successful login
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Form style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Login</h2>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
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

        <Button variant="primary" type="button" onClick={handleLogin} className="w-100">
          Login
        </Button>

        {/* Added redirection link to signup page */}
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Button variant="link" onClick={() => navigate('/signup')}>
            Sign up
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
