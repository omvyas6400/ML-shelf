import React, { useState } from 'react'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const SignUp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signUp } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwords_dont_match'))
      return false
    }
    
    if (formData.password.length < 6) {
      setError(t('password_too_short'))
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const { error } = await signUp(
        formData.email, 
        formData.password,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`.trim()
        }
      )
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess(t('sign_up_successful'))
        // Clear form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        })
        // Redirect to models page since user is now signed in
        setTimeout(() => navigate('/models'), 2000)
      }
    } catch (err) {
      setError(t('sign_up_error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">{t('sign_up')}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          }
          {success && <Alert variant="success">{success}</Alert>}
          }
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t('first_name')}</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('enter_first_name')}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('last_name')}</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('enter_last_name')}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('email')}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('enter_email')}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('enter_password')}
                required
                disabled={loading}
              />
              <Form.Text className="text-muted">
                {t('password_requirements')}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('confirm_password')}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('confirm_password')}
                required
                disabled={loading}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  {t('signing_up')}
                </>
              ) : (
                t('sign_up')
              )}
            </Button>
          </Form>
          
          <div className="text-center">
            <span>{t('already_have_account')} </span>
            <Link to="/signin" className="text-decoration-none">
              {t('sign_in')}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignUp