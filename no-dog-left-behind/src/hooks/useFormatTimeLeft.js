import { useEffect, useState } from 'react'
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

export const useTimeLeft = (expirationMs) => {
  const [timeRemaining, setTimeRemaining] = useState(expirationMs ? expirationMs : 0)
  const [formattedTime, setFormattedTime] = useState("")

  useEffect(() => {
    if (!timeRemaining) return
    if (timeRemaining <= 0) return 0

    const interval = setInterval(() => {
      const remainingTime = timeRemaining - Date.now()
      setTimeRemaining(remainingTime)
      const formatted = FormatTimeLeft(remainingTime)
      setFormattedTime(formatted)
    }, 1000) // update every second

    return () => clearInterval(interval)
  }, [timeRemaining])

  return formattedTime
}
