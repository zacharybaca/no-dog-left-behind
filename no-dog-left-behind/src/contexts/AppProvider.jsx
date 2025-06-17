import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider.jsx";
import { NotificationProvider } from "./Notifications/NotificationProvider.jsx";

export const AppProviders = ({ children }) => {

    return (
        <Router>
            <AuthProvider>
                <NotificationProvider>
                    {children}
                </NotificationProvider>
            </AuthProvider>
        </Router>
    )
}
