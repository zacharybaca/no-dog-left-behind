
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import Login from './components/Login/Login.jsx';
import Footer from './components/Footer/Footer.jsx';
import AppLogo from './assets/no-dog-left-behind-logo.png';

function App() {


  return (
    <div id="app-container">
      {/* This Section Will Show Up With Each Rendered Component */}
      <img src={AppLogo} alt="application-logo" className="application-logo" />
      <HeroSection />
      <hr id="horizontal-ruler-default" />

      {/* Routes and Their Rendered Components */}
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
