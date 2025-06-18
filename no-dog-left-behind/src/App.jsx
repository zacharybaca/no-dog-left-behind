
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNotification } from './hooks/useNotification';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login.jsx';
import Footer from './components/Footer/Footer.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import SuccessNotification from './components/SuccessNotification/SuccessNotification.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';


function App() {
  const { notifications, showNotification, toggleNotification } = useNotification();

  return (
    <div id="app-container">
      {/* This Section Will Show Up With Each Rendered Component */}
      <Navbar />
      <img src="/assets/no-dog-left-behind-logo.png" alt="application-logo" className="application-logo" />
      <HeroSection />
      <hr className="horizontal-ruler-default" />

      {/* Routes and Their Rendered Components */}
      <Routes basename="/">
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <hr className="horizontal-ruler-default" />
      {notifications.length > 0 && !showNotification && (
        <Button variant="primary" size="sm" onClick={toggleNotification}>
          Show My Notifications
        </Button>
    )}

      {(notifications.length > 0 && showNotification) ? <SuccessNotification headerText="Success!" bodyText="🎉 Success! Your adoption form was submitted." variantTheme="success" /> : null}
      <hr className="horizontal-ruler-default" />
      {/* This Footer Section Will Appear With Each Rendered Component */}
      <Footer />
    </div>
  )
}
export default App;
