import './success-notification.css';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toast, ToastContainer, Fade } from 'react-bootstrap';
import { useNotification } from '../../hooks/useNotification';

const SuccessNotification = ({ headerText, bodyText, imgURL, variantTheme, timestamp }) => {
    const {
        showNotification,
        toggleNotification,
        calculateElapsedMinutes,
        setElapsedMinutes,
        setNotifications,
        notifications
    } = useNotification();

    useEffect(() => {
        if (timestamp) {
            const interval = setInterval(() => {
                setElapsedMinutes(calculateElapsedMinutes(timestamp));
            }, 60000);

            setNotifications(prev => ([
                ...prev,
                {
                    _id: uuidv4(),
                    headerText,
                    bodyText,
                    imgURL,
                    variantTheme,
                    timestamp: timestamp ? timestamp : null
                }
            ]));

            return () => clearInterval(interval);
        }
    }, [timestamp]);

    return (
        <div id="notifications-container">
            <Fade in={showNotification} timeout={300}>
                <ToastContainer className="custom-toast-container">
                    <ul className="toast-list">
                        {notifications.map((notification) => (
                            <li key={notification._id}>
                                <Toast
                                    onClose={toggleNotification}
                                    show={showNotification}
                                    bg={notification.variantTheme}
                                    delay={3000}
                                    autohide
                                >
                                    <Toast.Header closeButton={true}>
                                        <img
                                            src={notification.imgURL || "holder.js/20x20?text=%20"}
                                            className="rounded me-2"
                                            alt="toast"
                                        />
                                        <strong className="me-auto">{notification.headerText}</strong>
                                        <small className="text-muted">
                                            {notification.timestamp
                                                ? `${calculateElapsedMinutes(notification.timestamp)} minute(s) ago`
                                                : 'just now'}
                                        </small>
                                    </Toast.Header>
                                    <Toast.Body className={notification.variantTheme && "text-white"}>
                                        {notification.bodyText}
                                    </Toast.Body>
                                </Toast>
                            </li>
                        ))}
                    </ul>
                </ToastContainer>
            </Fade>
        </div>
    );
};

export default SuccessNotification;
