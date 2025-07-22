import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useFetcher } from './hooks/useFetcher.js'
import { useDogSearch } from './hooks/useDogSearch.js'
import { useAuth } from './hooks/useAuth.js'
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
  const { isLoaded, setIsLoaded } = useFetcher()
  const { isLoading } = useDogSearch()
  const { isAuthenticated } = useAuth()
  const [loadingApplication, setLoadingApplication] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      setLoadingApplication(false)
    }, 5000)
  }, [])

  useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoaded(true);
  }, 2000)

  return () => clearTimeout(timer)
}, [])

  return !loadingApplication && !isLoading ? (
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
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />
        <Route path="/favorites" element={isAuthenticated ? <FavoriteDogs /> : <Login />} />
        <Route path="/dog-details" element={isAuthenticated ? <DogDetails /> : <Login />} />
        <Route path="/loading" element={<LoadingApplication />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Render visible notifications */}
      {isAuthenticated && <Notification />}

      <hr className="horizontal-ruler-default" />
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  )
}

export default App
