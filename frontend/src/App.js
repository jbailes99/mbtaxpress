import React from 'react'
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from 'react-router-dom'
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

const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  return (
    <>
      <Navbar />
      <div className='main-content' style={{ padding: '1rem' }}>
        <UserContext.Provider value={user}>
          <Routes>
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
    </>
  )
}

export default App
