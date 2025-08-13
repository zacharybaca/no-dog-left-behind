import { useEffect, useState } from 'react'
import { useAuth } from './useAuth.js'
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

export const useTimeLeft = (expirationMs) => {
  const { logout } = useAuth()

  const [timeRemaining, setTimeRemaining] = useState(expirationMs - Date.now())
  const [formattedTime, setFormattedTime] = useState(() => FormatTimeLeft(expirationMs))

  const isExpired = timeRemaining <= 0
  const expiringSoon = !isExpired && timeRemaining <= 5 * 60 * 1000 // < 5 min

  useEffect(() => {
    if (!expirationMs) return

    const update = () => {
      const remaining = expirationMs - Date.now()
      setTimeRemaining(remaining)
      setFormattedTime(FormatTimeLeft(expirationMs))

      if (remaining <= 0) {
        logout()
      }
    }

    update() // run immediately
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expirationMs, logout])

  return { formatted: formattedTime, isExpired, expiringSoon }
}
