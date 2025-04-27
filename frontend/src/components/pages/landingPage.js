/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { FaMapMarkedAlt, FaBell, FaStar, FaTrain, FaBus, FaSubway } from 'react-icons/fa'
import getUserInfo from '../../utilities/decodeJwt'

const Landingpage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  const handleLogout = async () => {
    localStorage.clear()
    navigate('/')
  }

  const features = [
    {
      icon: <FaMapMarkedAlt size={48} className='text-warning mb-3' />,
      title: 'Live Tracking',
      description: 'Track any train, tram, subway, or bus in real-time with our interactive map.',
      transportIcons: [<FaTrain key='train' />, <FaSubway key='subway' />, <FaBus key='bus' />],
    },
    {
      icon: <FaBell size={48} className='text-warning mb-3' />,
      title: 'Real-time Alerts',
      description: 'Stay informed about delays, service changes, and important updates.',
      transportIcons: [<FaTrain key='train' />, <FaSubway key='subway' />, <FaBus key='bus' />],
    },
    {
      icon: <FaStar size={48} className='text-warning mb-3' />,
      title: 'Station Reviews',
      description: 'Join the community and share your experiences at MBTA stations.',
      transportIcons: [<FaTrain key='train' />, <FaSubway key='subway' />, <FaBus key='bus' />],
    },
  ]

  if (user) {
    return (
      <Container fluid className='px-0'>
        {/* Hero Section */}
        <div
          className='hero-section text-white py-5'
          style={{
            background: 'linear-gradient(rgba(22, 92, 150, 0.9), rgba(22, 92, 150, 0.9)), url("/mapImage.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container>
            <Row className='align-items-center'>
              <Col md={6}>
                <h1 className='display-3 fw-bold mb-4'>Welcome to MBTAXpress</h1>
                <p className='lead mb-4'>
                  Your all-in-one solution for real-time MBTA tracking, alerts, and station information.
                </p>
                <Button variant='warning' size='lg' onClick={handleLogout} className='px-4 py-2'>
                  Logout
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Features Section */}
        <Container className='py-5'>
          <Row className='g-4'>
            {features.map((feature, index) => (
              <Col key={index} md={4}>
                <Card className='h-100 border-0 shadow-sm hover-card'>
                  <Card.Body className='text-center p-4'>
                    <div className='feature-icon mb-4'>{feature.icon}</div>
                    <h3 className='h4 mb-3'>{feature.title}</h3>
                    <p className='text-muted mb-4'>{feature.description}</p>
                    <div className='transport-icons d-flex justify-content-center gap-3'>
                      {feature.transportIcons.map((icon, i) => (
                        <span key={i} className='text-muted fs-4'>
                          {icon}
                        </span>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    )
  }

  // Non-logged in view
  return (
    <Container fluid className='px-0'>
      {/* Hero Section */}
      <div
        className='hero-section text-white py-5'
        style={{
          background: 'linear-gradient(rgba(22, 92, 150, 0.9), rgba(22, 92, 150, 0.9)), url("/mapImage.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <Row className='align-items-center'>
            <Col md={6}>
              <h1 className='display-3 fw-bold mb-4'>
                <span className='text-white'>MBTA</span>
                <span className='text-warning'>Xpress</span>
              </h1>
              <p className='lead mb-4'>
                Your all-in-one solution for real-time MBTA tracking, alerts, and station information.
              </p>
              <div className='d-flex gap-3'>
                <Button variant='warning' size='lg' href='/login' className='px-4 py-2'>
                  Sign In
                </Button>
                <Button variant='outline-warning' size='lg' href='/signup' className='px-4 py-2'>
                  Sign Up
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className='py-5'>
        <Row className='g-4'>
          {features.map((feature, index) => (
            <Col key={index} md={4}>
              <Card className='h-100 border-0 shadow-sm hover-card'>
                <Card.Body className='text-center p-4'>
                  <div className='feature-icon mb-4'>{feature.icon}</div>
                  <h3 className='h4 mb-3'>{feature.title}</h3>
                  <p className='text-muted mb-4'>{feature.description}</p>
                  <div className='transport-icons d-flex justify-content-center gap-3'>
                    {feature.transportIcons.map((icon, i) => (
                      <span key={i} className='text-muted fs-4'>
                        {icon}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  )
}

export default Landingpage
