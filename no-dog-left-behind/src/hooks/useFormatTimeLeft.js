import { useEffect, useState } from 'react'
import { FormatTimeLeft } from '../utilities/FormatTimeLeft.js'

export const useTimeLeft = (expirationMs) => {
  const [formattedTime, setFormattedTime] = useState("")

  useEffect(() => {
    if (!expirationMs) return

    const updateTime = () => {
      const remainingTime = expirationMs - Date.now()
      if (remainingTime <= 0) {
        setFormattedTime("00:00")
        return false // stop timer
      }
      setFormattedTime(FormatTimeLeft(remainingTime))
      return true
    }

    // Initial run
    updateTime()

    const interval = setInterval(() => {
      const shouldContinue = updateTime()
      if (!shouldContinue) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [expirationMs])

  return formattedTime
}
