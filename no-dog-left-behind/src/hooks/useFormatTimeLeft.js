import { useEffect, useState } from 'react'
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

export const useTimeLeft = (expirationMs) => {
  const [timeRemaining, setTimeRemaining] = useState(() => FormatTimeLeft(expirationMs))

  useEffect(() => {
    if (!expirationMs) return

    const interval = setInterval(() => {
      setTimeRemaining(formatTimeUntil(expirationMs))
    }, 1000) // update every second

    return () => clearInterval(interval)
  }, [expirationMs])

  return timeRemaining
}
