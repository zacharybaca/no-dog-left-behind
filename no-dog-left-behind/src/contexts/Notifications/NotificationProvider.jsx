import { NotificationContext } from './NotificationContext.jsx'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(true)
  const [notifications, setNotifications] = useState([
    {
      _id: uuidv4(),
      headerText: 'Success',
      bodyText: 'You Have Successfully Logged In!',
      variantTheme: 'success',
      imgURL: "",
      customTheme: '.toast-success',
      timestamp: Date.now(),
      visible: true,
    },
    {
      _id: uuidv4(),
      headerText: 'Log-In Failed!',
      bodyText: 'We Were Unable to Log You Into the System.',
      variantTheme: 'danger',
      imgURL: "",
      customTheme: '.toast-error',
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

  const calculateElapsedMinutes = (createdTimestamp) => {
    const now = Date.now()
    const elapsedTime = now - createdTimestamp
    return Math.floor(elapsedTime / 60000)
  }

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id))
  }

  const addNotification = ({
    headerText,
    bodyText,
    imgURL,
    variantTheme = 'success',
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
    setNotifications((prev) => [...prev, newNotification])
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        setShowNotification,
        toggleNotification,
        calculateElapsedMinutes,
        elapsedMinutes,
        setElapsedMinutes,
        notifications,
        setNotifications,
        deleteNotification,
        addNotification,
        handleSwipeDismiss,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
