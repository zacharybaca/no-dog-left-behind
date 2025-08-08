import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthProvider.jsx'
import { NotificationProvider } from './Notifications/NotificationProvider.jsx'
import { DogSearchProvider } from './DogSearch/DogSearchProvider.jsx'
import { MenuOptionsProvider } from './MenuOptions/MenuOptionsProvider.jsx'
import { FetcherProvider } from './Fetcher/FetcherProvider.jsx'
import { FavoriteDogsProvider } from './FavoriteDogs/FavoriteDogsProvider.jsx'
import { WidgetOptionsProvider } from './WidgetOptions/WidgetOptionsProvider.jsx'
import { VerifyEmailProvider } from './VerifyEmailAddress/VerifyEmailAddressProvider.jsx'

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <WidgetOptionsProvider>
        <NotificationProvider>
          <FetcherProvider>
            <VerifyEmailProvider> {/* ✅ Inserted here */}
              <AuthProvider>
                <MenuOptionsProvider>
                  <FavoriteDogsProvider>
                    <DogSearchProvider>{children}</DogSearchProvider>
                  </FavoriteDogsProvider>
                </MenuOptionsProvider>
              </AuthProvider>
            </VerifyEmailProvider>
          </FetcherProvider>
        </NotificationProvider>
      </WidgetOptionsProvider>
    </Router>
  )
}
