import './session-timer.css'
import { useTimeLeft } from '../../hooks/useFormatTimeLeft'

const SessionTimer = ({ expiration }) => {
  const timeRemaining = useTimeLeft(expiration)

  const isExpired = timeRemaining === 'Expired'
  const expiringSoon = !isExpired && /(\d+)m/.test(timeRemaining) && parseInt(timeRemaining.match(/(\d+)m/)[1]) <= 5

  return (
    <div className={`session-timer ${isExpired ? 'expired' : ''} ${expiringSoon ? 'expiring-soon' : ''}`}>
      {isExpired
        ? <span className="expired-text">🔒 Session Expired</span>
        : <span className="countdown-text">⏳ Expires in: {timeRemaining}</span>}
    </div>
  )
}

export default SessionTimer
