import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { setNavigate } from './navigation';
import ModelList from './ModelList';
import ModelCreate from './ModelCreate';
import ModelDetail from './ModelDetail';
import Signup from './Signup';
import Login from './Login';
import Forbidden from './Forbidden';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import './App.css';
import api from './api';

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [selectedModelId, setSelectedModelId] = useState(null);

  const fetchModels = async () => {
    try {
      await api.get('/models');
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchModels();
    }
  }, [token]);

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
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    setToken('');
    setUsername('');
    navigate('/login');
  };

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
              {!token && <Nav.Link href="/signup">{t('signup')}</Nav.Link>}
              {!token && <Nav.Link href="/login">{t('login')}</Nav.Link>}
            </Nav>
            <Nav className="ml-auto d-flex align-items-center">
            {username && <Nav.Link>{t('welcome')}, {username.toUpperCase()}</Nav.Link>}
              {token && (
                <Nav.Link onClick={handleLogout} className="d-flex align-items-center">
                  {t('logout')}
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route
            path="/models"
            element={
              token ? (
                <Row>
                  <Col md={4}>
                    <ModelList onSelectModel={setSelectedModelId} />
                  </Col>
                  <Col md={8}>
                    {selectedModelId ? (
                      <ModelDetail modelId={selectedModelId} />
                    ) : (
                      <ModelCreate onModelCreated={fetchModels} />
                    )}
                  </Col>
                </Row>
              ) : (
                <Navigate to="/forbidden" />
              )
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/" element={token ? <Navigate to="/models" /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default AppRoutes;
