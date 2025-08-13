import './session-timer.css'
import { useTimeLeft } from '../../hooks/useTimeLeft'

const SessionTimer = ({ expirationTime }) => {
  const { formatted, isExpired, expiringSoon } = useTimeLeft(expirationTime)

  return (
    <div className={`session-timer ${isExpired ? 'expired' : ''} ${expiringSoon ? 'expiring-soon' : ''}`}>
      {isExpired
        ? <span className="expired-text">🔒 Session Expired</span>
        : <span className="countdown-text">⏳ Expires in: {formatted}</span>}
    </div>
  )
}

export default SessionTimer
