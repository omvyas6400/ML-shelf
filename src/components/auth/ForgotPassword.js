import React, { useState } from 'react'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { resetPassword } = useAuth()
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await resetPassword(email)
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess(t('password_reset_email_sent'))
      }
    } catch (err) {
      setError(t('password_reset_error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">{t('forgot_password')}</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          }
          {success && <Alert variant="success">{success}</Alert>}
          }
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t('email')}</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('enter_email')}
                required
                disabled={loading}
              />
              <Form.Text className="text-muted">
                {t('password_reset_instructions')}
              </Form.Text>
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
                  {t('sending')}
                </>
              ) : (
                t('send_reset_email')
              )}
            </Button>
          </Form>
          
          <div className="text-center">
            <Link to="/signin" className="text-decoration-none">
              {t('back_to_sign_in')}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ForgotPassword