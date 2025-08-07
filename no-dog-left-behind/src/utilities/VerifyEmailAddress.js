export async function VerifyEmailAddress(email) {
  const apiKey = import.meta.env.VITE_EMAIL_VERIFY_API_KEY
  const apiUrl = import.meta.env.VITE_EMAIL_VERIFY_URL

  try {
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' }, body: JSON.stringify( {'email': email})} )

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ TrueGuard verification result:', data)
    return data
  } catch (err) {
    console.error('❌ Error verifying with TrueGuard:', err.message)
    throw err
  }
}
