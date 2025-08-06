export function FormatTimeLeft(expirationMs) {
  const msRemaining = expirationMs - Date.now()

  if (msRemaining <= 0) return 'Expired'

  const totalSeconds = Math.floor(msRemaining / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // Return "1h 5m" or "5m 30s" depending on range
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}
