import { Toast } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';

const SwipeableToast = ({ notification, onDismiss, calculateElapsedMinutes }) => {
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => onDismiss(notification._id),
        onSwipedRight: () => onDismiss(notification._id),
        preventScrollOnSwipe: true,
        trackTouch: true,
    });

    return (
        <li {...swipeHandlers}>
            <Toast
                show={true}
                onClose={() => onDismiss(notification._id)}
                bg={notification.variantTheme}
                delay={3000}
                autohide
            >
                <Toast.Header closeButton>
                    <img
                        src={notification.imgURL || "holder.js/20x20?text=%20"}
                        className="rounded me-2"
                        alt="toast notification"
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
    );
};

export default SwipeableToast;
