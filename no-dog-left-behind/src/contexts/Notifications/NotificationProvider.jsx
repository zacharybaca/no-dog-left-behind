import { NotificationContext } from './NotificationContext.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export const NotificationProvider = ({ children }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([{
        _id: uuidv4(),
        headerText: "Success",
        bodyText: "You Have Successfully Logged In!",
        variantTheme: "success",
        timestamp: Date.now()
    }, {
        _id: uuidv4(),
        headerText: "Log-In Failed!",
        bodyText: "We Were Unable to Log You Into the System.",
        variantTheme: "danger",
        timestamp: Date.now()
    }]);
    const toggleNotification = () => setShowNotification(prev => !prev);
    const [elapsedMinutes, setElapsedMinutes] = useState(0);

    const handleSwipeDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    };

    const calculateElapsedMinutes = (createdTimestamp) => {
        const now = Date.now();
        const elapsedTime = now - createdTimestamp;
        return Math.floor(elapsedTime / 60000);
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n._id !== id));
    };

    const addNotification = ({ headerText, bodyText, imgUrl, variantTheme = "info" }) => {
        setNotifications(prev => [
            ...prev,
            {
                _id: uuidv4(),
                headerText,
                bodyText,
                imgUrl,
                variantTheme,
                timestamp: Date.now()
            }
        ]);
    };

    return (
        <NotificationContext.Provider value={{
            showNotification,
            setShowNotification,
            toggleNotification,
            calculateElapsedMinutes,
            elapsedMinutes,
            setElapsedMinutes,
            notifications,
            setNotifications,
            deleteNotification,
            addNotification,
            handleSwipeDismiss
        }}>
            {children}
        </NotificationContext.Provider>
    )
};
