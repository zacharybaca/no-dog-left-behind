import { Toast } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

const SwipeableToast = ({ notification, deleteNotification, calculateElapsedMinutes }) => {
  const [visible, setVisible] = useState(true);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setVisible(false),
    onSwipedRight: () => setVisible(false),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  if (!visible) return null;

  return (
    <li {...swipeHandlers}>
      <Toast
        show={visible}
        onClose={() => deleteNotification(notification._id)} // Only deletes when "X" is clicked
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
        <Toast.Body className={notification.variantTheme === "success" ? "text-white" : ""}>
          {notification.bodyText}
        </Toast.Body>
      </Toast>
    </li>
  );
};

export default SwipeableToast;
