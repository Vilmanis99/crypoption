const STORAGE_KEY = 'coh_subscribers'
const POPUP_SHOWN_KEY = 'coh_popup_shown'
const STICKY_DISMISSED_KEY = 'coh_sticky_dismissed'

interface Subscriber {
  email: string
  timestamp: number
  source: string
}

export function saveSubscriber(email: string, source: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list: Subscriber[] = raw ? JSON.parse(raw) : []
    list.push({ email: email.trim().toLowerCase(), timestamp: Date.now(), source })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // localStorage unavailable
  }
}

export function isAlreadySubscribed(email: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const list: Subscriber[] = JSON.parse(raw)
    return list.some(s => s.email === email.trim().toLowerCase())
  } catch {
    return false
  }
}

export function hasSeenPopup(): boolean {
  try {
    return sessionStorage.getItem(POPUP_SHOWN_KEY) === '1'
  } catch {
    return false
  }
}

export function markPopupSeen(): void {
  try {
    sessionStorage.setItem(POPUP_SHOWN_KEY, '1')
  } catch {
    // sessionStorage unavailable
  }
}

export function hasDismissedSticky(): boolean {
  try {
    return sessionStorage.getItem(STICKY_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

export function markStickyDismissed(): void {
  try {
    sessionStorage.setItem(STICKY_DISMISSED_KEY, '1')
  } catch {
    // sessionStorage unavailable
  }
}
