import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { FaStar, FaWheelchair, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'
import getUserInfo from '../../utilities/decodeJwt'

function Stations() {
  const [stations, setStations] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const [filterActive, setFilterActive] = useState(false)
  const [filteredStations, setFilteredStations] = useState([])
  const [lineFilter, setLineFilter] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await axios('https://api-v3.mbta.com/stops?filter[route_type]=1')
        const stations = result.data.data

        const stationsWithAddresses = await Promise.all(
          stations.map(async station => {
            const latitude = station.attributes.latitude
            const longitude = station.attributes.longitude
            const address = await getReverseGeocode(latitude, longitude)
            return { ...station, address }
          })
        )

        setStations(stationsWithAddresses)
      } catch (error) {
        console.error('Error fetching stations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const apiKey = 'AIzaSyAk9ya1jXFaoGhoPlOVrgxQqfWeK8zeK3w'

  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      )
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].formatted_address
      } else {
        return 'Address not found'
      }
    } catch (error) {
      console.error('Error fetching reverse geocode:', error)
      return 'Error fetching address'
    }
  }

  const userId = getUserInfo()?.id

  useEffect(() => {
    async function fetchUserFavorites() {
      if (userId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/userFav/getFavorites/${userId}`)
          setUserFavorites(response.data)
        } catch (error) {
          console.error('Error fetching user favorites:', error)
        }
      }
    }

    fetchUserFavorites()
  }, [userId])

  useEffect(() => {
    const stationIds = userFavorites.map(item => String(item.stationId))
    const filteredStations = stations.filter(station => stationIds.includes(station.id))
    setFilteredStations(filteredStations)
  }, [userFavorites, stations])

  const toggleFilter = () => {
    setFilterActive(!filterActive)
  }

  const handleLineFilter = line => {
    setLineFilter(line)
  }

  const filteredStationsToShow = filterActive
    ? filteredStations.filter(station => {
        const middleDescription = station.attributes.description.split('-')[1]?.trim()
        return lineFilter ? middleDescription.includes(lineFilter) : true
      })
    : stations.filter(station => {
        const middleDescription = station.attributes.description.split('-')[1]?.trim()
        return lineFilter ? middleDescription.includes(lineFilter) : true
      })

  const renderErrorMessage = () => {
    if (filteredStationsToShow.length === 0) {
      return (
        <div className='text-center py-5'>
          <h4 className='text-muted'>No stations to display</h4>
        </div>
      )
    }
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
          <h1 className='display-4 fw-bold mb-3'>MBTA Stations</h1>
          <p className='lead mb-0'>Explore and review MBTA stations</p>
        </Container>
      </div>

      {/* Filter Section */}
      <Container className='py-4'>
        <Card className='border-0 shadow-sm mb-4'>
          <Card.Body>
            <div className='d-flex flex-wrap gap-2 justify-content-center'>
              <Button
                variant={filterActive ? 'warning' : 'outline-warning'}
                size='lg'
                className='px-4 py-2 d-flex align-items-center gap-2'
                onClick={toggleFilter}
              >
                <FaHeart />
                <span>{filterActive ? 'Show All Stations' : 'Favorites'}</span>
              </Button>
              {!filterActive && (
                <>
                  <Button
                    variant={lineFilter === '' ? 'warning' : 'outline-warning'}
                    size='lg'
                    className='px-4 py-2'
                    onClick={() => handleLineFilter('')}
                  >
                    All Lines
                  </Button>
                  <Button
                    variant={lineFilter === 'Green' ? 'success' : 'outline-success'}
                    size='lg'
                    className='px-4 py-2'
                    onClick={() => handleLineFilter('Green')}
                  >
                    Green Line
                  </Button>
                  <Button
                    variant={lineFilter === 'Red' ? 'danger' : 'outline-danger'}
                    size='lg'
                    className='px-4 py-2'
                    onClick={() => handleLineFilter('Red')}
                  >
                    Red Line
                  </Button>
                  <Button
                    variant={lineFilter === 'Blue' ? 'primary' : 'outline-primary'}
                    size='lg'
                    className='px-4 py-2'
                    onClick={() => handleLineFilter('Blue')}
                  >
                    Blue Line
                  </Button>
                  <Button
                    variant={lineFilter === 'Orange' ? 'warning' : 'outline-warning'}
                    size='lg'
                    className='px-4 py-2'
                    onClick={() => handleLineFilter('Orange')}
                  >
                    Orange Line
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>

        {loading ? (
          <div className='text-center py-5'>
            <div className='spinner-border text-warning' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {renderErrorMessage()}
            <Row className='g-4'>
              {filteredStationsToShow.map(station => (
                <Col key={station.id} md={6} lg={4}>
                  <Link to={`/stations/${station.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card className='h-100 border-0 shadow-sm hover-card'>
                      <Card.Body className='p-4'>
                        <div className='d-flex justify-content-between align-items-start mb-3'>
                          <h5 className='card-title mb-0'>{station.attributes.name}</h5>
                          {filterActive && <FaStar className='text-warning' style={{ fontSize: '1.5rem' }} />}
                        </div>
                        <div className='d-flex align-items-center gap-2 mb-3'>
                          <FaMapMarkerAlt className='text-muted' />
                          <small className='text-muted'>{station.address}</small>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div className='d-flex align-items-center gap-2'>
                            {station.attributes.wheelchair_boarding === 1 ? (
                              <FaWheelchair className='text-success' style={{ fontSize: '1.5rem' }} />
                            ) : (
                              <span className='text-muted'>Inaccessible</span>
                            )}
                          </div>
                          <Button variant='outline-primary' size='sm'>
                            View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </Container>
  )
}

export default Stations
