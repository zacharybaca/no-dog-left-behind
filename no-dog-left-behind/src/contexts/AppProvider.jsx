import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider.jsx";
import { NotificationProvider } from "./Notifications/NotificationProvider.jsx";
import { DogSearchProvider } from "./DogSearch/DogSearchProvider.jsx";

export const AppProviders = ({ children }) => {

    return (
        <Router>
            <AuthProvider>
                <DogSearchProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </DogSearchProvider>
            </AuthProvider>
        </Router>
    )
}
