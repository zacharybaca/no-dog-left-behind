import { useState, useEffect } from 'react'
import { VerifyEmailAddress } from '../utilities/VerifyEmailAddress.js'

export const useVerifyEmailAddress = (email) => {
  const [status, setStatus] = useState(null)
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!email) return

    const verify = async () => {
      try {
        const data = await VerifyEmailAddress(email)

        if (data.action === 'deny') {
          setStatus("E-mail Not Approved")
          setReasons(data.reasons)
        } else if (data.action === 'approve') {
          setStatus("E-mail Approved")
        } else {
          setStatus("Unknown")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [email])

  return { status, reasons, loading, error }
}
