import { AuthContext } from './AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const login = async (name, email) => {
        try {
            if (!name || !email) {
                throw new Error("Please Enter Your Name and/or E-Mail Address");
            }
            const res = await fetch(baseUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email })
            });

            if (res.ok) {
                setSuccess(true);
                return { success: true };
            };

            return { success: false, error: "Failed To Login" };

        } catch (err) {
            console.error(err.message);
            setSuccess(false);
            return { success: false, error: err.message };
        };
    };

    const handleChange = (e) => {
        const [name, value] = e.target;
        setUserInfo((prevValue) => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(userInfo.name, userInfo.email);

        if (result.success) {
            navigate("/dashboard");
        }
        else {
            setError(result.error);
        }
    };

    return (
        <AuthContext.Provider value={{
            userInfo,
            error,
            success,
            login,
            handleChange,
            handleSubmit
        }}>
            {children}
        </AuthContext.Provider>
    )
}
