import { useEffect, useState } from 'react'
import { useAuth } from './useAuth.js' // make sure path is correct
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

export const useTimeLeft = (expirationMs) => {
  const { logout } = useAuth() // grab logout function from AuthProvider

  const [timeRemaining, setTimeRemaining] = useState(() => {
    if (!expirationMs) return 0
    return Math.max(expirationMs - Date.now(), 0)
  })

  const [formattedTime, setFormattedTime] = useState(() =>
    FormatTimeLeft(timeRemaining)
  )

  const isExpired = timeRemaining <= 0
  const expiringSoon = !isExpired && timeRemaining <= 5 * 60 * 1000 // < 5 mins

  useEffect(() => {
    if (!expirationMs) return

    const update = () => {
      const remaining = Math.max(expirationMs - Date.now(), 0)
      setTimeRemaining(remaining)
      setFormattedTime(FormatTimeLeft(remaining))

      if (remaining <= 0) {
        logout() // expire session immediately
      }
    }

    update() // run immediately on mount
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [expirationMs, logout])

  return { formatted: formattedTime, isExpired, expiringSoon }
}
