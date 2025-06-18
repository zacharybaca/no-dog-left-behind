import './success-notification.css';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-bootstrap';
import { useNotification } from '../../hooks/useNotification';
import SwipeableToast from '../SwipeableToast/SwipeableToast.jsx';

const SuccessNotification = ({ headerText, bodyText, imgURL, variantTheme = "success", timestamp }) => {
    const {
        showNotification,
        toggleNotification,
        calculateElapsedMinutes,
        setElapsedMinutes,
        setNotifications,
        notifications
    } = useNotification();

    useEffect(() => {
        const newNotification = {
            _id: uuidv4(),
            headerText,
            bodyText,
            imgURL,
            variantTheme,
            timestamp: timestamp || Date.now()
        };

        setNotifications(prev => [...prev, newNotification]);

        const interval = setInterval(() => {
            setElapsedMinutes(calculateElapsedMinutes(newNotification.timestamp));
        }, 60000);

        return () => clearInterval(interval);
    }, [timestamp]);

    const handleDismiss = (id) => {
        setNotifications(prev => prev.filter(n => n._id !== id));
    };

    return (
        <div id="notifications-container">
            {notifications.length > 0 && showNotification && (
                <ToastContainer className="p-3 custom-toast-container" position="bottom-end">
                    <ul className="toast-list">
                        {notifications.map(notification => (
                            <SwipeableToast
                                key={notification._id}
                                notification={notification}
                                onDismiss={handleDismiss}
                                calculateElapsedMinutes={calculateElapsedMinutes}
                            />
                        ))}
                    </ul>
                </ToastContainer>
            )}
        </div>
    );
};

export default SuccessNotification;
