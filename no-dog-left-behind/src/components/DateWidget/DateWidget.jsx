import { useEffect, useState } from 'react'
import './date-widget.css'

const MOCK_EVENTS = [
  { date: '2025-07-25', title: '🐕 Bailey’s Adoption Anniversary!' },
  { date: '2025-08-01', title: '🎉 Volunteer Appreciation Day' },
]

const DateWidget = () => {
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [dayGreeting, setDayGreeting] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    const now = new Date()
    const formatted = now.toLocaleDateString('en-US', {
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

    setCurrentDate(formatted)
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

  const toggleCollapse = () => setIsExpanded((prev) => !prev)
  const toggleCalendar = () => setShowCalendar((prev) => !prev)
  const toggleCalendarOptions = () => {
      setIsExpanded(false)
      setShowCalendar(prev => !prev)
  }

  const toggleDateOptions = () => {
      setShowCalendar(false)
      setIsExpanded(prev => !prev)
  }

  return (
    <div className="date-widget-container">
      <div className="date-widget-top">
        <button onClick={toggleDateOptions} className="date-widget-toggle">
          {isExpanded ? '–' : '+'}
        </button>
        <button onClick={toggleCalendarOptions} className="date-widget-calendar-btn" title="Show Calendar">
          📅
        </button>
      </div>

      {isExpanded ? (
        <div className="date-info-container">
          <div className="date-widget-greeting">{dayGreeting}</div>
          <div className="date-widget-date">{currentDate}</div>
          <div className="date-widget-time">{currentTime}</div>
        </div>
      ) : ""}

      {showCalendar ? (
        <div className="date-widget-calendar">
          <h4>Upcoming Events</h4>
          <ul>
            {MOCK_EVENTS.map((event) => (
              <li key={event.date}>
                <strong>{new Date(event.date).toLocaleDateString()}</strong> — {event.title}
              </li>
            ))}
          </ul>
        </div>
      ) : ""}
    </div>
  )
}

export default DateWidget
