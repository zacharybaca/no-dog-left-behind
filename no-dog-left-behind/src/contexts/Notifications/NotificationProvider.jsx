import { NotificationContext } from './NotificationContext.jsx'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(true)
  const [notifications, setNotifications] = useState([
    {
      _id: uuidv4(),
      headerText: 'Success',
      bodyText: 'You Have Successfully Logged In!',
      variantTheme: 'success',
      timestamp: Date.now(),
      visible: true,
    },
    {
      _id: uuidv4(),
      headerText: 'Log-In Failed!',
      bodyText: 'We Were Unable to Log You Into the System.',
      variantTheme: 'danger',
      timestamp: Date.now(),
      visible: true,
    },
  ])
  const [dismissed, setDismissed] = useState(false)
  const toggleDismiss = () => setDismissed((prev) => !prev)
  const toggleNotification = (id) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, visible: !n.visible } : n)))
  }

  const [elapsedMinutes, setElapsedMinutes] = useState(0)

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

  const addNotification = ({ headerText, bodyText, imgURL, variantTheme = 'success' }) => {
    const newNotification = {
      _id: uuidv4(),
      headerText,
      bodyText,
      imgURL,
      variantTheme,
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
        dismissed,
        toggleDismiss,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
