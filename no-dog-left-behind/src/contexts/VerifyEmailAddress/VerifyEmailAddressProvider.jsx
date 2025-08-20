import { VerifyEmailAddressContext } from './VerifyEmailAddressContext'
import { useFetcher } from '../../hooks/useFetcher'

export const VerifyEmailProvider = ({ children }) => {
  const { fetcher } = useFetcher()

  const verifyEmailAddress = async (email) => {
    const apiKey = import.meta.env.VITE_EMAIL_VERIFY_API_KEY
    const apiUrl = import.meta.env.VITE_EMAIL_VERIFY_URL

    const res = await fetcher('/api/verification', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "type": "full" }),
    })

    console.log('Data From Verify: ', res)

    try {
      if (res.data.action === 'deny') {
        return {
          status: 'E-mail Not Approved',
          reasons: res.data.reasons, // ✅ fixed typo
        }
      }

      if (res.data.action === 'allow') {
        return {
          status: 'E-mail Approved',
        }
      }

      return {
        status: res.status,
        message: res.message,
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
