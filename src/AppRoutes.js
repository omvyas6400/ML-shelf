import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { setNavigate } from './navigation';
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
            </Nav>
            <Nav className="ml-auto d-flex align-items-center">
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
          <Route
            path="/models"
            element={
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
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/" element={<Navigate to="/models" />} />
        </Routes>
      </Container>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <AppContent />
  );
};

export default AppRoutes;
