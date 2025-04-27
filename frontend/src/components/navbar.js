import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import ReactNavbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { BsPerson } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <ReactNavbar
      variant='dark'
      expand='lg'
      style={{
        backgroundColor: '#165c96',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container>
        <ReactNavbar.Brand
          as={Link}
          to='/home'
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          MBTAXpress
        </ReactNavbar.Brand>
        <ReactNavbar.Toggle aria-controls='basic-navbar-nav' />
        <ReactNavbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={Link} to='/home' style={{ color: 'white', margin: '0 1rem' }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/mbtaTracker' style={{ color: 'white', margin: '0 1rem' }}>
              MBTA Tracker
            </Nav.Link>
            <Nav.Link as={Link} to='/mbtaAlert' style={{ color: 'white', margin: '0 1rem' }}>
              MBTA Alerts
            </Nav.Link>
            <Nav.Link as={Link} to='/mbtaStation' style={{ color: 'white', margin: '0 1rem' }}>
              MBTA Stations
            </Nav.Link>
            <NavDropdown title={<BsPerson size='24' />} id='basic-nav-dropdown' style={{ color: 'white' }}>
              <NavDropdown.Item as={Link} to='/profile'>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/privateUserProfile'>
                Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </ReactNavbar.Collapse>
      </Container>
    </ReactNavbar>
  )
}
