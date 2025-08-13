import { useEffect, useState } from 'react'
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

/**
 * expirationMs — absolute timestamp in milliseconds (not duration)
 */
export const useTimeLeft = (expirationMs) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!expirationMs) return 0
    return expirationMs - Date.now()
  })

  useEffect(() => {
    if (!expirationMs) return
    const tick = () => {
      setTimeLeft(expirationMs - Date.now())
    }
    tick() // initial
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [expirationMs])

  const isExpired = timeLeft <= 0
  const expiringSoon = !isExpired && timeLeft <= 5 * 60 * 1000 // <= 5 min

  return {
    formatted: isExpired ? 'Expired' : FormatTimeLeft(timeLeft),
    isExpired,
    expiringSoon,
    rawMs: timeLeft
  }
}
