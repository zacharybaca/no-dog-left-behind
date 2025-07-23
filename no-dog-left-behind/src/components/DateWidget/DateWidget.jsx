import { useEffect, useState } from 'react'
import './date-widget.css'

const DateWidget = () => {
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [dayGreeting, setDayGreeting] = useState('')

  useEffect(() => {
    const now = new Date()

    const dateFormatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    const greetings = {
      Monday: "🐶 Happy Mutts Monday!",
      Tuesday: "🐾 Tail-Wagging Tuesday!",
      Wednesday: "🦴 Woof Wednesday!",
      Thursday: "🐕 Thumping Tail Thursday!",
      Friday: "🐩 Furry Friends Friday!",
      Saturday: "🎾 Sniff & Stroll Saturday!",
      Sunday: "🐾 Snoozy Sunday!",
    }

    const today = now.toLocaleDateString('en-US', { weekday: 'long' })

    setCurrentDate(dateFormatted)
    setDayGreeting(greetings[today] || '🐶 Welcome back!')
  }, [])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const timeFormatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setCurrentTime(timeFormatted)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="date-widget-container">
      <div className="date-widget-greeting">{dayGreeting}</div>
      <div className="date-widget-date">{currentDate}</div>
      <div className="date-widget-time">{currentTime}</div>
    </div>
  )
}

export default DateWidget
