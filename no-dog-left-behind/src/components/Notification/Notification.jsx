// SuccessNotification.jsx
import './notification.css';
import { ToastContainer } from 'react-bootstrap'
import { useNotification } from '../../hooks/useNotification.js'
import SwipeableToast from '../SwipeableToast/SwipeableToast.jsx'

const Notification = () => {
  const { showNotification, calculateElapsedMinutes, notifications } = useNotification()

  return (
    <div id="notifications-container">
      {notifications.length > 0 && showNotification && (
        <ToastContainer className="p-3 custom-toast-container custom-toast" position="bottom-end">
          {notifications.map((notification) => (
            <div key={notification._id} style={{ marginBottom: '1rem' }} className={notification.customTheme ? notification.customTheme : ""}>
              <SwipeableToast
                notification={notification}
                calculateElapsedMinutes={calculateElapsedMinutes}
              />
            </div>
          ))}
        </ToastContainer>
      )}
    </div>
  )
}

export default Notification
