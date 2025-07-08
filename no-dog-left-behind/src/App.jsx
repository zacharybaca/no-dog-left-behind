import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useNotification } from './hooks/useNotification'
import HeroSection from './components/HeroSection/HeroSection.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './components/Login/Login.jsx'
import Footer from './components/Footer/Footer.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'
import Notification from './components/Notification/Notification.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx'

function App() {
  const { toggleNotifications, notifications } = useNotification()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return !loading ? (
    <div id="app-container">
      <Navbar />
      <img
        src="/assets/no-dog-left-behind-hero-image.png"
        alt="hero image branding"
        className="application-logo"
      />
      <HeroSection />
      <hr className="horizontal-ruler-default" />

      <Routes basename="/">
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <hr className="horizontal-ruler-default" />

      <Button variant="secondary" size="sm" onClick={toggleNotifications} className="mb-2">
        {notifications && notifications.every((notification) => notification.visible)
          ? 'Hide Notifications'
          : 'Show Notifications'}
      </Button>

      {/* Render visible notifications */}
      <Notification />

      <hr className="horizontal-ruler-default" />
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  )
}

export default App
