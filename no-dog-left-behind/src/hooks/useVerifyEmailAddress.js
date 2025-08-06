import { VerifyEmailAddress } from '../utilities/VerifyEmailAddress.js'

export const VerifyEmailAddress = async (email) => {
  try {
    const data = await VerifyEmailAddress(email)

    if (data.action === 'deny') {
      return {
        status: 'E-mail Not Approved',
        reasons: data.reasons,
      }
    }

    if (data.action === 'approve') {
      return {
        status: 'E-mail Approved',
      }
    }

    // If neither approve nor deny was returned — fallback
    return {
      status: 'Unknown Response',
      data,
    }

  } catch (err) {
    console.error('❌ Verification Error:', err.message)
    return {
      status: 'Error',
      message: err.message,
    }
  }
}
