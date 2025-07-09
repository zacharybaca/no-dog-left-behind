import { NotificationContext } from './NotificationContext.jsx'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

export const NotificationProvider = ({ children }) => {
  const MAX_NOTIFICATIONS = 5
  const [showNotification, setShowNotification] = useState(true)
  const [notifications, setNotifications] = useState([
    {
      _id: uuidv4(),
      headerText: 'Success',
      bodyText: 'You Have Successfully Logged In!',
      variantTheme: 'success',
      imgURL: '/assets/success.png',
      customTheme: '.toast-success',
      timestamp: Date.now(),
      visible: true,
    },
    {
      _id: uuidv4(),
      headerText: 'Log-In Failed!',
      bodyText: 'We Were Unable to Log You Into the System.',
      variantTheme: 'danger',
      imgURL: '/assets/error.jpg',
      customTheme: '.toast-error',
      timestamp: Date.now(),
      visible: true,
    },
    {
      _id: uuidv4(),
      headerText: 'Info',
      bodyText: 'This is some important information.',
      variantTheme: 'info',
      imgURL: '/assets/information.jpg',
      customTheme: '.toast-info',
      timestamp: Date.now(),
      visible: true,
    },
    {
      _id: uuidv4(),
      headerText: 'Warning',
      bodyText: 'This is a warning!',
      variantTheme: 'warning',
      imgURL: '/assets/warning.jpg',
      customTheme: '.toast-warm',
      timestamp: Date.now(),
      visible: true,
    },
  ])
  const toggleNotification = (id) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, visible: !n.visible } : n)))
  }

  const [elapsedMinutes, setElapsedMinutes] = useState(0)

  // Sync to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  // On mount, restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('notifications')
    if (stored) {
      try {
        setNotifications(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse notifications from localStorage', e)
      }
    }
  }, [])

  const handleSwipeDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id))
  }

  const calculateElapsedHoursAndMinutes = (createdTimestamp) => {
    const now = Date.now()
    const elapsedMs = now - createdTimestamp

    const totalMinutes = Math.floor(elapsedMs / 60000) // 1 minute = 60,000 ms
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return { hours, minutes }
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id))
  }

  const addNotification = ({
    headerText,
    bodyText,
    imgURL,
    variantTheme,
    customTheme,
  }) => {
    const newNotification = {
      _id: uuidv4(),
      headerText,
      bodyText,
      imgURL,
      variantTheme,
      customTheme,
      timestamp: Date.now(),
      visible: true,
    }
    setNotifications((prev) => {
      let updated;

      if (newNotification.headerText && newNotification.bodyText) {
        updated = [...prev, newNotification]
      }
      else {
        updated = [...prev]
      }

      if (updated.length > MAX_NOTIFICATIONS) updated.shift()
        
      return updated
    })
  }

  const toggleNotifications = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        visible: !notification.visible,
      }))
    )
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        setShowNotification,
        toggleNotification,
        calculateElapsedHoursAndMinutes,
        elapsedMinutes,
        setElapsedMinutes,
        notifications,
        setNotifications,
        deleteNotification,
        addNotification,
        handleSwipeDismiss,
        toggleNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
