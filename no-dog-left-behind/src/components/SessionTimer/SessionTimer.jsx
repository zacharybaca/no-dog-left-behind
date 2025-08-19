import './session-timer.css'
import { useTimeLeft } from '../../hooks/useFormatTimeLeft'

const SessionTimer = ({ expirationTime }) => {
  const { formatted, isExpired, expiringSoon } = useTimeLeft(expirationTime)

  return (
    <div className={`session-timer ${isExpired ? 'expired' : ''} ${expiringSoon ? 'expiring-soon' : ''}`}>
      {isExpired
        ? <span className="expired-text">🔒 Your Session Has Expired. Please Login Again.</span>
        : <span className="countdown-text">⏳ Session Expires in: {formatted}</span>}
    </div>
  )
}

export default SessionTimer
