import React, { useState } from 'react'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const SignIn = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signIn } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess(t('sign_in_successful'))
        navigate('/models')
    } catch (err) {
      setError(t('sign_in_error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">{t('sign_in')}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          }
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
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
                  {t('signing_in')}
                </>
              ) : (
                t('sign_in')
              )}
            </Button>
          </Form>

          <div className="text-center">
            <Link to="/forgot-password" className="text-decoration-none">
              {t('forgot_password')}
            </Link>
          </div>
          
          <hr />
          
          <div className="text-center">
            <span>{t('dont_have_account')} </span>
            <Link to="/signup" className="text-decoration-none">
              {t('sign_up')}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignIn