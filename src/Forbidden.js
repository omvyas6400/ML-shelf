import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Update to use useNavigate

const Forbidden = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleRedirect = () => {
    navigate('/login'); // Use navigate to redirect
  };

  return (
    <Container className="text-center mt-5">
      <Alert variant="danger">
        <h4>403 - Forbidden</h4>
        <p>You do not have permission to access this page.</p>
      </Alert>
      <Button variant="primary" onClick={handleRedirect}>
        Go to Login
      </Button>
    </Container>
  );
};

export default Forbidden;
