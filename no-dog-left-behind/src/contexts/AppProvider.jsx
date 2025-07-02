import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthProvider.jsx'
import { NotificationProvider } from './Notifications/NotificationProvider.jsx'
import { DogSearchProvider } from './DogSearch/DogSearchProvider.jsx'
import { MenuOptionsProvider } from './MenuOptions/MenuOptionsProvider.jsx'

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <MenuOptionsProvider>
            <DogSearchProvider>{children}</DogSearchProvider>
          </MenuOptionsProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  )
}
