import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useFetcher } from './hooks/useFetcher.js'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './components/Login/Login.jsx'
import Footer from './components/Footer/Footer.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'
import Notification from './components/Notification/Notification.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx'
import LoadingApplication from './components/LoadingApplication/LoadingApplication.jsx';

function App() {
  const { isLoaded, setIsLoaded } = useFetcher()
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000)
  })
  
  return !loading ? (
    <div id="app-container">
      <Navbar />
      <img
        src="/assets/no-dog-left-behind-hero-image.png"
        alt="hero image branding"
        className="application-logo"
      />
      
      <hr className="horizontal-ruler-default" />

      <Routes basename="/">
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loading" element={<LoadingApplication />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

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
