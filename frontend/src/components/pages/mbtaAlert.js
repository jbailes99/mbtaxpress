import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [serviceType, setServiceType] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        let url = 'https://api-v3.mbta.com/alerts?sort=-updated_at&filter[activity]=BOARD,EXIT,RIDE'
        if (serviceType) {
          url += `&filter[route_type]=${serviceType}`
        }
        const result = await axios.get(url)
        setAlerts(result.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [serviceType])

  const handleFilterChange = event => {
    setServiceType(event.target.value)
  }

  const getServiceTypeName = type => {
    const types = {
      0: 'Tram, Streetcar, Light rail',
      1: 'Subway, Metro',
      2: 'Rail',
      3: 'Bus',
      4: 'Ferry',
    }
    return types[type] || 'All Service Types'
  }

  return (
    <Container fluid className='px-0'>
      {/* Header Section */}
      <div
        className='text-white py-4'
        style={{
          background: 'linear-gradient(rgba(22, 92, 150, 0.9), rgba(22, 92, 150, 0.9))',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Container>
          <h1 className='display-4 fw-bold mb-3'>MBTA Alerts</h1>
          <p className='lead mb-0'>Stay informed about service changes and delays</p>
        </Container>
      </div>

      {/* Filter Section */}
      <Container className='py-4'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <Form.Select size='lg' value={serviceType} onChange={handleFilterChange} className='shadow-sm'>
              <option value=''>All Service Types</option>
              <option value='0'>Tram, Streetcar, Light rail</option>
              <option value='1'>Subway, Metro</option>
              <option value='2'>Rail</option>
              <option value='3'>Bus</option>
              <option value='4'>Ferry</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Alerts Section */}
      <Container className='py-4'>
        <Row className='g-4'>
          {alerts.map(alert => (
            <Col key={alert.id} md={6} lg={4}>
              <Card className='h-100 border-0 shadow-sm hover-card'>
                <Card.Body className='p-4'>
                  <div className='d-flex justify-content-between align-items-start mb-3'>
                    <h5 className='card-title mb-0'>{getServiceTypeName(alert.attributes.route_type)}</h5>
                    <small className='text-muted'>{new Date(alert.attributes.updated_at).toLocaleString()}</small>
                  </div>
                  <h6 className='text-warning mb-3'>{alert.attributes.header}</h6>
                  <p className='card-text text-muted mb-0'>{alert.attributes.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {alerts.length === 0 && (
            <Col className='text-center py-5'>
              <h4 className='text-muted'>No alerts to display</h4>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  )
}

export default Alerts
