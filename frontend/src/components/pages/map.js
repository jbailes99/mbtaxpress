import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, ScaleControl } from 'react-leaflet'
import { Container, Card } from 'react-bootstrap'
import L from 'leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

const LeafletMap = ({ routeTypeFilter }) => {
  const [trainData, setTrainData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        if (routeTypeFilter !== undefined) {
          setLoading(true)
          const response = await axios.get(
            `https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=${routeTypeFilter}&api_key=b6bf1a2867354a9ea2add40062ff96f3`
          )
          setTrainData(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching train data:', error)
      } finally {
        setLoading(false)
      }
    }

    const intervalId = setInterval(fetchTrainData, 10000)
    fetchTrainData()

    return () => clearInterval(intervalId)
  }, [routeTypeFilter])

  const getIconForLine = routeData => {
    const routeId = routeData?.id
    if (routeTypeFilter === 3) return busIcon
    if (routeTypeFilter === 0) return tramIcon
    if (routeTypeFilter === 2) return railTrainIcon

    const iconMapping = {
      Red: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + '/redTrain.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Green: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + '/greenTrain.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Blue: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + '/blueTrain.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
      Orange: new L.Icon({
        iconUrl: process.env.PUBLIC_URL + '/orangeTrain.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
    }

    return iconMapping[routeId] || subwayIcon
  }

  const subwayIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/defaulttrain.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  const busIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/bus.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  const tramIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/tramIcon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  const railTrainIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/railTrain.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  return (
    <Card className='border-0 shadow-sm'>
      <Card.Body className='p-0'>
        <div
          className='map-container'
          style={{ height: 'calc(100vh - 250px)', minHeight: '500px', position: 'relative' }}
        >
          {loading && (
            <div
              className='position-absolute top-50 start-50 translate-middle z-index-1000'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Loading...
            </div>
          )}
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[42.3601, -71.0589]}
            zoom={12}
            zoomControl={false}
          >
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <ZoomControl position='bottomright' />
            <ScaleControl position='bottomleft' />

            {trainData.map(train => (
              <Marker
                key={train.id}
                position={[train.attributes.latitude, train.attributes.longitude]}
                icon={getIconForLine(train.relationships.route.data)}
              >
                <Popup>
                  <div className='p-2'>
                    <h6 className='mb-2'>Vehicle Information</h6>
                    <p className='mb-1'>
                      <strong>ID:</strong> {train.id}
                    </p>
                    <p className='mb-1'>
                      <strong>Status:</strong> {train.attributes.current_status}
                    </p>
                    <p className='mb-1'>
                      <strong>Speed:</strong> {train.attributes.speed ? `${train.attributes.speed} mph` : 'N/A'}
                    </p>
                    <p className='mb-0'>
                      <strong>Direction:</strong> {train.direction_id ?? 'N/A'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Card.Body>
    </Card>
  )
}

export default LeafletMap
