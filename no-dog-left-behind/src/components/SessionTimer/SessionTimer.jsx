import './session-timer.css'

import { useTimeLeft } from '../../hooks/useFormatTimeLeft'

const SessionTimer = ({ expiration }) => {
  const timeRemaining = useTimeLeft(expiration)

  return (
    <div className="session-timer">
      {timeRemaining === 'Expired'
        ? <span className="expired-text">🔒 Session Expired</span>
        : <span className="countdown-text">⏳ Expires in: {timeRemaining}</span>}
    </div>
  )
}

export default SessionTimer
