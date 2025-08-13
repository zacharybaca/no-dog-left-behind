import './App.css'
import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.js'
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx'

// Lazy Loading Components — move outside the component
const Login = lazy(() => import("./components/Login/Login.jsx"))
const PrivateRoute = lazy(() => import("./components/PrivateRoute/PrivateRoute.jsx"))
const Navbar = lazy(() => import("./components/Navbar/Navbar.jsx"))
const Footer = lazy(() => import("./components/Footer/Footer.jsx"))
const PageNotFound = lazy(() => import("./components/PageNotFound/PageNotFound.jsx"))
const Notification = lazy(() => import("./components/Notification/Notification.jsx"))
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard.jsx"))
const LoadingApplication = lazy(() => import("./components/LoadingApplication/LoadingApplication.jsx"))
const FavoriteDogs = lazy(() => import("./components/FavoriteDogs/FavoriteDogs.jsx"))
const DogDetails = lazy(() => import("./components/DogDetails/DogDetails.jsx"))
const SessionTimer = lazy(() => import("./components/SessionTimer/SessionTimer.jsx"))

function App() {
  const { isAuthenticated, getSessionExpirationTimeMessage } = useAuth()
  const [loadingApplication, setLoadingApplication] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingApplication(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return !loadingApplication ? (
    <Suspense fallback={<LoadingScreen />}>
      <div id="app-container">
        <Navbar />
        {isAuthenticated && (
          <SessionTimer timeLeft={getSessionExpirationTimeMessage} />
        )}
        {!isAuthenticated && (
          <img
            src="/assets/no-dog-left-behind-hero-image.png"
            alt="hero image branding"
            className="application-logo"
          />
        )}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><FavoriteDogs /></PrivateRoute>} />
          <Route path="/dog-details" element={<PrivateRoute><DogDetails /></PrivateRoute>} />
          <Route path="/loading" element={<LoadingApplication />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Notification />
        <hr className="horizontal-ruler-default" />
        <Footer />
      </div>
    </Suspense>
  ) : (
    <LoadingScreen />
  )
}

export default App
