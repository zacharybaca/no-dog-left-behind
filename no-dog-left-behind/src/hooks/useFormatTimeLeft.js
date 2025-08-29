// ✅ pure formatting hook
import { useEffect, useState } from 'react'

export const useTimeLeft = (timeLeft) => {
  const [formatted, setFormatted] = useState('')

  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) {
      setFormatted('Session expired')
      return
    }

    const update = () => {
      const totalMinutes = Math.floor(timeLeft / (1000 * 60))
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      setFormatted(`✅ Time until session expires: ${hours}h ${minutes}m`)
    }

    update()
  }, [timeLeft])

  return formatted
}
