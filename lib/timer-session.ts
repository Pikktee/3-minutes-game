import { Preferences } from "@capacitor/preferences"
import type { GamePhase } from "@/lib/game-context"

const TIMER_SESSION_KEY = "active-round-timer-session"

function getWebStorage(): Storage | null {
  if (typeof window === "undefined") return null
  return window.localStorage
}

export interface TimerSession {
  phase: GamePhase
  endTimestampMs: number
  pausedRemainingSeconds: number | null
  isPaused: boolean
}

export async function saveTimerSession(session: TimerSession): Promise<void> {
  const serialized = JSON.stringify(session)
  try {
    await Preferences.set({
      key: TIMER_SESSION_KEY,
      value: serialized,
    })
  } catch {
    getWebStorage()?.setItem(TIMER_SESSION_KEY, serialized)
  }
}

export async function loadTimerSession(): Promise<TimerSession | null> {
  let value: string | null = null
  try {
    const result = await Preferences.get({ key: TIMER_SESSION_KEY })
    value = result.value
  } catch {
    value = getWebStorage()?.getItem(TIMER_SESSION_KEY) ?? null
  }
  if (!value) return null

  try {
    const parsed = JSON.parse(value) as TimerSession
    if (!parsed?.phase || typeof parsed.endTimestampMs !== "number" || typeof parsed.isPaused !== "boolean") {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export async function clearTimerSession(): Promise<void> {
  try {
    await Preferences.remove({ key: TIMER_SESSION_KEY })
  } catch {
    getWebStorage()?.removeItem(TIMER_SESSION_KEY)
  }
}
