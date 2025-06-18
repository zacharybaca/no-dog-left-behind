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
  const { notifications, toggleNotification } = useNotification();

  return (
    <div id="app-container">
      <Navbar />
      <img src="/assets/no-dog-left-behind-logo.png" alt="application-logo" className="application-logo" />
      <HeroSection />
      <hr className="horizontal-ruler-default" />

      <Routes basename="/">
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <hr className="horizontal-ruler-default" />

      {/* Toggle buttons for hidden notifications */}
      {notifications
        .filter(n => !n.visible)
        .map(notification => (
          <Button
            key={notification._id}
            variant="secondary"
            size="sm"
            onClick={() => toggleNotification(notification._id)}
            className="mb-2"
          >
            Show "{notification.headerText}" Notification
          </Button>
        ))}

      {/* Render visible notifications */}
      <SuccessNotification />


      <hr className="horizontal-ruler-default" />
      <Footer />
    </div>
  );
}

export default App;
