// SuccessNotification.jsx
import './success-notification.css';
import { ToastContainer } from 'react-bootstrap';
import { useNotification } from '../../hooks/useNotification';
import SwipeableToast from '../SwipeableToast/SwipeableToast.jsx';

const SuccessNotification = () => {
  const {
    showNotification,
    calculateElapsedMinutes,
    notifications
  } = useNotification();

  return (
    <div id="notifications-container">
      {notifications.length > 0 && showNotification && (
        <ToastContainer className="p-3 custom-toast-container" position="bottom-end">
          {notifications.map(notification => (
            <div key={notification._id} style={{ marginBottom: '1rem' }}>
              <SwipeableToast
                notification={notification}
                calculateElapsedMinutes={calculateElapsedMinutes}
              />
            </div>
          ))}
        </ToastContainer>
      )}
    </div>
  );
};

export default SuccessNotification;
