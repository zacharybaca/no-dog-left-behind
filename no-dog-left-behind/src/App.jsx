
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {


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
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

      <hr className="horizontal-ruler-default" />

      {/* This Footer Section Will Appear With Each Rendered Component */}
      <Footer />
    </div>
  )
}

export default App
