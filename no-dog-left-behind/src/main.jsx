import { AppProviders } from './contexts/AppProvider.jsx';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
