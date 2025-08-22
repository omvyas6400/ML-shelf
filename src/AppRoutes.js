import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { setNavigate } from './navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import ModelList from './ModelList';
import ModelCreate from './ModelCreate';
import ModelDetail from './ModelDetail';
import Forbidden from './Forbidden';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import './App.css';

const AppContent = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [selectedModelId, setSelectedModelId] = useState(null);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar expand="lg" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src={darkMode ? '/assets/dark-logo.png' : '/assets/light-logo.png'}
              alt="App Logo"
              className="App-logo me-2"
              style={{ width: '50px', height: '50px' }}
            />
            {t('ml_model_management')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">{t('home')}</Nav.Link>
              {!user && <Nav.Link href="/signup">{t('sign_up')}</Nav.Link>}
              {!user && <Nav.Link href="/signin">{t('sign_in')}</Nav.Link>}
            </Nav>
            <Nav className="ml-auto d-flex align-items-center">
              {user && (
                <Nav.Link>
                  {t('welcome')}, {user.user_metadata?.full_name || user.email}
                </Nav.Link>
              )}
              {user && (
                <Nav.Link onClick={handleLogout} className="d-flex align-items-center">
                  {t('sign_out')}
                </Nav.Link>
              )}
              <Nav.Link onClick={toggleDarkMode} className="d-flex align-items-center">
                {darkMode ? <FaSun size={20} title={t('light_mode')} /> : <FaMoon size={20} title={t('dark_mode')} />}
              </Nav.Link>
              <Nav.Link onClick={() => handleLanguageChange('en')} className="d-flex align-items-center">
                <ReactCountryFlag countryCode="GB" svg style={{ width: '2em', height: '2em' }} title="English" />
              </Nav.Link>
              <Nav.Link onClick={() => handleLanguageChange('tr')} className="d-flex align-items-center">
                <ReactCountryFlag countryCode="TR" svg style={{ width: '2em', height: '2em' }} title="Turkish" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-4">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/models"
            element={
              <ProtectedRoute>
                <Row>
                  <Col md={4}>
                    <ModelList onSelectModel={setSelectedModelId} />
                  </Col>
                  <Col md={8}>
                    {selectedModelId ? (
                      <ModelDetail modelId={selectedModelId} />
                    ) : (
                      <ModelCreate />
                    )}
                  </Col>
                </Row>
              </ProtectedRoute>
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/" element={user ? <Navigate to="/models" /> : <Navigate to="/signin" />} />
        </Routes>
      </Container>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default AppRoutes;
