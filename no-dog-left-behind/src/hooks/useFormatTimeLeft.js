import { useEffect, useState } from 'react'
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

export const useTimeLeft = (expirationMs) => {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    if (!expirationMs) return 0
    return Math.max(expirationMs - Date.now(), 0)
  })

  const [formattedTime, setFormattedTime] = useState(() => 
    FormatTimeLeft(timeRemaining)
  )

  const isExpired = timeRemaining <= 0
  const expiringSoon = !isExpired && timeRemaining <= 5 * 60 * 1000 // 5 minutes

  useEffect(() => {
    // If no expiration time or already expired, no need to set interval
    if (!expirationMs || isExpired) return

    const update = () => {
      const remaining = Math.max(expirationMs - Date.now(), 0)
      setTimeRemaining(remaining)
      setFormattedTime(FormatTimeLeft(remaining))
    }

    // Run immediately so UI updates without waiting a second
    update()

    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expirationMs, isExpired])

  return { formatted: formattedTime, isExpired, expiringSoon }
}
