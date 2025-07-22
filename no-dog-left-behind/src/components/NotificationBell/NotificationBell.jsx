import './notification-bell.css'
import { useNotification } from '../../hooks/useNotification'

const NotificationBell = () => {
  const { toggleNotifications, notifications, disableNotifications } = useNotification()

  return (
    <>
      {disableNotifications ? <img src="/assets/notifications-disabled.png" className="disabled-notifications-img" alt="notification disabled" /> : notifications && notifications.length > 0 ? (
        <img
          src="/assets/notification-bell-icon.png"
          alt="notification icon"
          onClick={toggleNotifications}
        />
      ) : (
        <img
          src="/assets/no-notifications-bell-icon.png"
          alt="no notifications icon"
          onClick={toggleNotifications}
        />
      )}
    </>
  )
}

export default NotificationBell
