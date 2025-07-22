import { NotificationContext } from './NotificationContext.jsx'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

export const NotificationProvider = ({ children }) => {
  const MAX_NOTIFICATIONS = 5
  const [showNotification, setShowNotification] = useState(false)
  const [disableNotifications, setDisableNotifications] = useState(() => {
    const stored = localStorage.getItem('disable-notifications');
    return stored ? JSON.parse(stored) : false;
  });
  const [notifications, setNotifications] = useState([
    {
      _id: uuidv4(),
      headerText: 'Success',
      bodyText: 'You Have Successfully Logged In!',
      variantTheme: 'success',
      imgURL: '/assets/success.png',
      customTheme: '.toast-success',
      timestamp: Date.now(),
      visible: false,
    },
    {
      _id: uuidv4(),
      headerText: 'Log-In Failed!',
      bodyText: 'We Were Unable to Log You Into the System.',
      variantTheme: 'danger',
      imgURL: '/assets/error.jpg',
      customTheme: '.toast-error',
      timestamp: Date.now(),
      visible: false,
    },
    {
      _id: uuidv4(),
      headerText: 'Info',
      bodyText: 'This is some important information.',
      variantTheme: 'info',
      imgURL: '/assets/information.jpg',
      customTheme: '.toast-info',
      timestamp: Date.now(),
      visible: false,
    },
    {
      _id: uuidv4(),
      headerText: 'Warning',
      bodyText: 'This is a warning!',
      variantTheme: 'warning',
      imgURL: '/assets/warning.jpg',
      customTheme: '.toast-warm',
      timestamp: Date.now(),
      visible: false,
    },
  ])

  const toggleNotification = (id) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, visible: !n.visible } : n)))
  }

  const [elapsedMinutes, setElapsedMinutes] = useState(0)

  // Persist disableNotifications state
  useEffect(() => {
    localStorage.setItem('disable-notifications', JSON.stringify(disableNotifications))
  }, [disableNotifications])

  // Persist notifications unless disabled
  useEffect(() => {
    if (!disableNotifications) {
      localStorage.setItem('notifications', JSON.stringify(notifications))
    }
  }, [notifications, disableNotifications])

  // On mount, restore from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications')
    const storedDisable = localStorage.getItem('disable-notifications')
    if (storedNotifications && storedDisable) {
      try {
        setDisableNotifications(JSON.parse(storedDisable))
        setNotifications(JSON.parse(storedNotifications))
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

    const totalMinutes = Math.floor(elapsedMs / 60000)
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
      let updated
      if (newNotification.headerText && newNotification.bodyText) {
        updated = [...prev, newNotification]
        console.log('New Notification Added')
      } else {
        updated = [...prev]
      }

      if (updated.length > MAX_NOTIFICATIONS) updated.shift()

      return updated
    })
  }

  const toggleNotifications = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      visible: !notification.visible,
    }))

    setNotifications(updatedNotifications)

    const anyVisible = updatedNotifications.some((notification) => notification.visible)
    setShowNotification(anyVisible)
  }

  const blockNotifications = () => {
    setDisableNotifications((prev) => !prev)
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
        disableNotifications,
        blockNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
