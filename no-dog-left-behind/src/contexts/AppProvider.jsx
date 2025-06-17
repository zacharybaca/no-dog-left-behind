import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider.jsx";

export const AppProviders = ({ children }) => {

    return (
        <Router>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Router>
    )
}
