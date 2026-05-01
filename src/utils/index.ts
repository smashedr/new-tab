export const openUrl = (url?: string) => location.replace(url!)

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(fn: Function, timeout = 250) {
  let timeoutID: ReturnType<typeof setTimeout>
  return (...args: unknown[]) => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn(...args), timeout)
  }
}

export function timeSinceIso(isoString: string): string {
  const updatedAt = new Date(isoString)
  return timeSinceMs(updatedAt.getTime())
}

export function timeSinceMs(ms: number, now = Date.now()): string {
  const seconds = Math.floor((now - ms) / 1000)

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ]

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) {
      return `${count} ${label}${count !== 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}

export function getTextColor(hex?: string) {
  if (!hex) return '#ffffff'
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
