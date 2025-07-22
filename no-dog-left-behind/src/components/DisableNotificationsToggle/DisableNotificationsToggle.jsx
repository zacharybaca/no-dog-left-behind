import './disable-notifications-toggle.css'
import { useNotification } from '../../hooks/useNotification'

const DisableNotificationsToggle = () => {
  const { blockNotifications, disableNotifications } = useNotification()

  return (
    <button type="button" className="toggle-button" onClick={blockNotifications}>
      {disableNotifications ? <h5>Notifications Off</h5> : <h5>Notifications On</h5>}
      {disableNotifications ? <img src="/assets/toggle-off-button.png" alt="toggle off button" /> : <img src="/assets/toggle-on-button.png" />}
    </button>
  )
}

export default DisableNotificationsToggle;
