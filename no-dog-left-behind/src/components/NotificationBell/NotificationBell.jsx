import './notification-bell.css'
import { useNotification } from '../../hooks/useNotification';

const NotificationBell = () => {
  const { toggleNotifications } = useNotification();
  return (
    <>
      <img src="/assets/no-notifications-bell-icon.png" alt="no notifications icon" onClick={toggleNotifications}/>
    </>
  )
}

export default NotificationBell
