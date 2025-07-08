import './swipeable-toast.css'
import { Toast, Button } from 'react-bootstrap'
import { useSwipeable } from 'react-swipeable'
import { useNotification } from '../../hooks/useNotification'

const SwipeableToast = ({ notification, calculateElapsedHoursAndMinutes }) => {
  const { toggleNotification, deleteNotification } = useNotification()

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => toggleNotification(notification._id),
    onSwipedRight: () => toggleNotification(notification._id),
    preventScrollOnSwipe: true,
    trackTouch: true,
  })

  return (
    <Toast
      {...swipeHandlers}
      show={notification.visible}
      onClose={() => toggleNotification(notification._id)}
      bg={notification.variantTheme}
      delay={3000}
      autohide
    >
      <Toast.Header closeButton>
        <img
          src={notification.imgURL || 'https://via.placeholder.com/20'}
          className="rounded me-2"
          alt="toast notification"
        />
        <strong className="me-auto">{notification.headerText}</strong>
        <small className="text-muted">
          {notification.timestamp
            ? `${calculateElapsedHoursAndMinutes(notification.timestamp).hours} hour(s) and ${calculateElapsedHoursAndMinutes(notification.timestamp).minutes} minute(s) ago`
            : 'just now'}
        </small>
      </Toast.Header>
      <Toast.Body className={notification.variantTheme && 'text-white'}>
        {notification.bodyText}
      </Toast.Body>
      <div id="delete-notification-button-container">
        <Button
          variant="danger"
          id="delete-button"
          onClick={() => deleteNotification(notification._id)}
        >
          Delete
        </Button>
      </div>
    </Toast>
  )
}

export default SwipeableToast
