import { Toast } from 'react-bootstrap'
import { useSwipeable } from 'react-swipeable'
import { useNotification } from '../../hooks/useNotification'

const SwipeableToast = ({ notification, calculateElapsedMinutes }) => {
  const { toggleNotification } = useNotification()

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
          src={notification.imgURL || 'holder.js/20x20?text=%20'}
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
      <Toast.Body className={notification.variantTheme && 'text-white'}>
        {notification.bodyText}
      </Toast.Body>
    </Toast>
  )
}

export default SwipeableToast
