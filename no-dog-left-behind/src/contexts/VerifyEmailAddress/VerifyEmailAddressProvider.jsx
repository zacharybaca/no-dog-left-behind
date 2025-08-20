import { VerifyEmailAddressContext } from './VerifyEmailAddressContext'

export const VerifyEmailProvider = ({ children }) => {
  // Determine backend URL based on environment
  const backendUrl = import.meta.env.VITE_BACKEND_URL || ''

  const verifyEmailAddress = async (email) => {
    try {
      const res = await fetch(`${backendUrl}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      console.log('Data From Verify:', data)

      if (data.action === 'deny') {
        return {
          status: 'E-mail Not Approved',
          reasons: data.reasons || [],
        }
      }

      if (data.action === 'allow') {
        return {
          status: 'E-mail Approved',
        }
      }

      return {
        status: res.status,
        message: data.message || 'Unknown response',
      }
    } catch (err) {
      console.error('❌ Verification Error:', err.message)
      return {
        status: 'Error',
        message: err.message,
      }
    }
  }

  return (
    <VerifyEmailAddressContext.Provider value={{ verifyEmailAddress }}>
      {children}
    </VerifyEmailAddressContext.Provider>
  )
}
