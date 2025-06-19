import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthProvider.jsx'
import { NotificationProvider } from './Notifications/NotificationProvider.jsx'
import { DogSearchProvider } from './DogSearch/DogSearchProvider.jsx'
import { MenuOptionsProvider } from './MenuOptions/MenuOptionsProvider.jsx'

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        <MenuOptionsProvider>
          <DogSearchProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </DogSearchProvider>
        </MenuOptionsProvider>
      </AuthProvider>
    </Router>
  )
}
