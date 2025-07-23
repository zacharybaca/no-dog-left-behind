import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.js'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './components/Login/Login.jsx'
import Footer from './components/Footer/Footer.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'
import Notification from './components/Notification/Notification.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx'
import LoadingApplication from './components/LoadingApplication/LoadingApplication.jsx';
import FavoriteDogs from './components/FavoriteDogs/FavoriteDogs.jsx';
import DogDetails from './components/DogDetails/DogDetails.jsx';

function App() {
  const { isAuthenticated } = useAuth()
  const [loadingApplication, setLoadingApplication] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingApplication(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return !loadingApplication ? (
    <div id="app-container">
      <Navbar />
      {!isAuthenticated &&
        <>
          <img
            src="/assets/no-dog-left-behind-hero-image.png"
            alt="hero image branding"
            className="application-logo" /><hr className="horizontal-ruler-default"
          />
        </>}

      <Routes basename="/">
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><FavoriteDogs /></PrivateRoute>} />
        <Route path="/dog-details" element={<PrivateRoute><DogDetails /></PrivateRoute>} />
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
