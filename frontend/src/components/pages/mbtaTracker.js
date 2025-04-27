import React, { useState } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { FaTrain, FaSubway, FaBus, FaShip, FaTram } from 'react-icons/fa'
import LeafletMap from './map'

const Trackerpage = () => {
  const [routeTypeFilter, setRouteTypeFilter] = useState(1)

  const handleFilterClick = routeType => {
    setRouteTypeFilter(routeType)
  }

  const routeTypes = [
    { id: 0, name: 'Tram', icon: <FaTram /> },
    { id: 1, name: 'Subway', icon: <FaSubway /> },
    { id: 2, name: 'Rail', icon: <FaTrain /> },
    { id: 3, name: 'Bus', icon: <FaBus /> },
    { id: 4, name: 'Ferry', icon: <FaShip /> },
  ]

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
          <h1 className='display-4 fw-bold mb-3'>Live Tracker</h1>
          <p className='lead mb-0'>Track MBTA vehicles in real-time</p>
        </Container>
      </div>

      {/* Filter Buttons */}
      <Container className='py-4'>
        <Card className='border-0 shadow-sm'>
          <Card.Body>
            <div className='d-flex flex-wrap gap-2 justify-content-center'>
              {routeTypes.map(route => (
                <Button
                  key={route.id}
                  variant={routeTypeFilter === route.id ? 'warning' : 'outline-warning'}
                  size='lg'
                  className='px-4 py-2 d-flex align-items-center gap-2'
                  onClick={() => handleFilterClick(route.id)}
                >
                  <span className='fs-4'>{route.icon}</span>
                  <span>{route.name}</span>
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Map Container */}
      <Container fluid className='px-0'>
        <div className='map-container' style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}>
          <LeafletMap routeTypeFilter={routeTypeFilter} />
        </div>
      </Container>
    </Container>
  )
}

export default Trackerpage
