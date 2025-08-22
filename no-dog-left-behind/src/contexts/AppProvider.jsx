import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthProvider.jsx'
import { NotificationProvider } from './Notifications/NotificationProvider.jsx'
import { DogSearchProvider } from './DogSearch/DogSearchProvider.jsx'
import { MenuOptionsProvider } from './MenuOptions/MenuOptionsProvider.jsx'
import { FetcherProvider } from './Fetcher/FetcherProvider.jsx'
import { FavoriteDogsProvider } from './FavoriteDogs/FavoriteDogsProvider.jsx'
import { WidgetOptionsProvider } from './WidgetOptions/WidgetOptionsProvider.jsx'
import { VerifyEmailProvider } from './VerifyEmailAddress/VerifyEmailAddressProvider.jsx'
import { SearchForPetProvider } from './SearchForPet/SearchForPetProvider.jsx'

export const AppProviders = ({ children }) => {
  return (
    <Router>
      <WidgetOptionsProvider>
        <NotificationProvider>
          <FetcherProvider>
            <VerifyEmailProvider>
              <AuthProvider>
                <MenuOptionsProvider>
                  <FavoriteDogsProvider>
                    <DogSearchProvider>
                      <SearchForPetProvider> {/* ✅ wrap it here */}
                        {children}
                      </SearchForPetProvider>
                    </DogSearchProvider>
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
