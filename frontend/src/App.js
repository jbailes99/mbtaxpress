import React from 'react'
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import ReactNavbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { BsPerson } from 'react-icons/bs'
// We import all the components we need in our app
import Navbar from './components/navbar'
import LandingPage from './components/pages/landingPage'
import HomePage from './components/pages/homePage'
import Login from './components/pages/loginPage'
import Signup from './components/pages/registerPage'
import PrivateUserProfile from './components/pages/privateUserProfilePage'
import { createContext, useState, useEffect } from 'react'
import getUserInfo from './utilities/decodeJwt'
import MbtaAlertPage from './components/pages/mbtaAlert'
import MbtaTrackerPage from './components/pages/mbtaTracker'
import MbtaStationPage from './components/pages/mbtaStation'
import StationDetailsPage from './components/pages/stationDetails'

export const UserContext = createContext()
//test change
//test again
const App = () => {
  const [user, setUser] = useState()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800) // Adjust breakpoint as needed
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  return (
    <>
      <div className={isMobile ? '' : 'd-flex'}>
        <Navbar />
        <div className={isMobile ? '' : 'flex-grow-1'}>
          <UserContext.Provider value={user}>
            <Routes>
              {/* <Route exact path='/' element={<LandingPage />} /> */}
              <Route path='/' element={<Navigate to='/home' />} />
              <Route exact path='/profile' element={<HomePage />} />
              <Route exact path='/home' element={<LandingPage />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route path='/privateUserProfile' element={<PrivateUserProfile />} />
              <Route path='/mbtaAlert' element={<MbtaAlertPage />} />
              <Route path='/mbtaTracker' element={<MbtaTrackerPage />} />
              <Route path='/mbtaStation' element={<MbtaStationPage />} />
              <Route path='/stations/:stationId' element={<StationDetailsPage />} />
            </Routes>
          </UserContext.Provider>
        </div>
      </div>
    </>
  )
}

export default App
