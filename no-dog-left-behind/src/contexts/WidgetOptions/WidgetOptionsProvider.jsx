import { WidgetOptionsContext } from './WidgetOptionsContext'
import { useEffect, useState } from 'react'


export const WidgetOptionsProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [dayGreeting, setDayGreeting] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const MOCK_EVENTS = [
    { date: '2025-07-25', title: '🐕 Bailey’s Adoption Anniversary!' },
    { date: '2025-08-01', title: '🎉 Volunteer Appreciation Day' },
  ]

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

  const toggleCalendarOptions = () => {
    setIsExpanded(false)
    setShowCalendar(prev => !prev)
  }

  const toggleDateOptions = () => {
    setShowCalendar(false)
    setIsExpanded(prev => !prev)
  }

  return (
    <WidgetOptionsContext.Provider value={{
      currentDate,
      currentTime,
      dayGreeting,
      isExpanded,
      showCalendar,
      MOCK_EVENTS,
      toggleCalendarOptions,
      toggleDateOptions
    }}>
      {children}
    </WidgetOptionsContext.Provider>
  )
}
