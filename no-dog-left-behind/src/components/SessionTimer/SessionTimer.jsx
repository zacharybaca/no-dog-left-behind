import './session-timer.css'
import { useAuth } from '../../hooks/useAuth'
import { useTimeLeft } from '../../hooks/useFormatTimeLeft'

const SessionTimer = () => {
  const { expirationTime } = useAuth() // comes from AuthProvider
  const timeLeft = expirationTime ? expirationTime - Date.now() : 0
  const formatted = useTimeLeft(timeLeft)

  const isExpired = timeLeft <= 0
  const expiringSoon = timeLeft > 0 && timeLeft < 5 * 60 * 1000 // under 5 minutes

  return (
    <div
      className={`session-timer ${isExpired ? 'expired' : ''} ${
        expiringSoon ? 'expiring-soon' : ''
      }`}
    >
      {isExpired ? (
        <span className="expired-text">
          🔒 Your Session Has Expired. Please Login Again.
        </span>
      ) : (
        <span className="countdown-text">
          ⏳ Session Expires in: {formatted}
        </span>
      )}
    </div>
  )
}

export default SessionTimer
