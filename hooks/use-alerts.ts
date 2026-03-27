"use client"

import { useCallback, useRef } from "react"
import { LocalNotifications } from "@capacitor/local-notifications"
import { useGame } from "@/lib/game-context"
import { isAndroidApp, isNativeApp } from "@/lib/native-device"

const WARNING_NOTIFICATION_ID = 30001
const END_NOTIFICATION_ID = 30002
const NOTIFICATION_CHANNEL_ID = "round-timer-alerts"

export function useAlerts() {
  const { state } = useGame()
  const { soundEnabled, vibrationEnabled } = state.settings
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const playTone = useCallback((frequency: number, duration: number, volume = 0.3) => {
    if (!soundEnabled) return

    try {
      const audioContext = getAudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled, getAudioContext])

  const playCompletionSound = useCallback(() => {
    if (!soundEnabled) return

    // Play a pleasant completion melody (ascending notes)
    playTone(440, 0.15, 0.25) // A4
    setTimeout(() => playTone(554, 0.15, 0.25), 150) // C#5
    setTimeout(() => playTone(659, 0.3, 0.3), 300) // E5
  }, [soundEnabled, playTone])

  const playWarningSound = useCallback(() => {
    if (!soundEnabled) return

    // Play a gentle warning tone
    playTone(392, 0.2, 0.2) // G4
  }, [soundEnabled, playTone])

  const playStartSound = useCallback(() => {
    if (!soundEnabled) return

    // Play a soft start tone
    playTone(523, 0.15, 0.2) // C5
  }, [soundEnabled, playTone])

  const vibrate = useCallback((pattern: number | number[]) => {
    if (!vibrationEnabled) return
    
    if (navigator.vibrate) {
      navigator.vibrate(pattern)
    }
  }, [vibrationEnabled])

  const vibrateCompletion = useCallback(() => {
    vibrate([200, 100, 200, 100, 300])
  }, [vibrate])

  const vibrateWarning = useCallback(() => {
    vibrate([100, 50, 100])
  }, [vibrate])

  const vibrateStart = useCallback(() => {
    vibrate(150)
  }, [vibrate])

  const alertCompletion = useCallback(() => {
    playCompletionSound()
    vibrateCompletion()
  }, [playCompletionSound, vibrateCompletion])

  const alertWarning = useCallback(() => {
    playWarningSound()
    vibrateWarning()
  }, [playWarningSound, vibrateWarning])

  const alertStart = useCallback(() => {
    playStartSound()
    vibrateStart()
  }, [playStartSound, vibrateStart])

  const requestNotificationPermission = useCallback(async () => {
    if (!isNativeApp()) return
    try {
      const permissions = await LocalNotifications.requestPermissions()
      if (permissions.display !== "granted") return
      if (isAndroidApp()) {
        await LocalNotifications.createChannel({
          id: NOTIFICATION_CHANNEL_ID,
          name: "Round Timer Alerts",
          description: "Warning and completion signals for active round timers",
          importance: 5,
          vibration: true,
          visibility: 1,
        })
      }
    } catch {
      // Ignore permission/channel errors
    }
  }, [])

  const cancelRoundNotifications = useCallback(async () => {
    if (!isNativeApp()) return
    try {
      await LocalNotifications.cancel({
        notifications: [{ id: WARNING_NOTIFICATION_ID }, { id: END_NOTIFICATION_ID }],
      })
    } catch {
      // Ignore cancellation errors
    }
  }, [])

  const scheduleRoundNotifications = useCallback(async (endTimestampMs: number, warningSeconds = 30) => {
    if (!isNativeApp()) return
    if (!soundEnabled && !vibrationEnabled) return

    const now = Date.now()
    const warningAtMs = endTimestampMs - warningSeconds * 1000

    try {
      await requestNotificationPermission()
      await cancelRoundNotifications()

      const notifications: Array<{
        id: number
        title: string
        body: string
        schedule: { at: Date; allowWhileIdle: boolean }
        channelId?: string
      }> = []

      if (warningAtMs > now) {
        notifications.push({
          id: WARNING_NOTIFICATION_ID,
          title: "Noch 30 Sekunden",
          body: "Eure Runde endet bald.",
          schedule: { at: new Date(warningAtMs), allowWhileIdle: true },
          channelId: NOTIFICATION_CHANNEL_ID,
        })
      }

      if (endTimestampMs > now) {
        notifications.push({
          id: END_NOTIFICATION_ID,
          title: "Runde beendet",
          body: "Die 3 Minuten sind vorbei.",
          schedule: { at: new Date(endTimestampMs), allowWhileIdle: true },
          channelId: NOTIFICATION_CHANNEL_ID,
        })
      }

      if (notifications.length > 0) {
        await LocalNotifications.schedule({ notifications })
      }
    } catch {
      // Ignore scheduling errors
    }
  }, [cancelRoundNotifications, requestNotificationPermission, soundEnabled, vibrationEnabled])

  return {
    playTone,
    playCompletionSound,
    playWarningSound,
    playStartSound,
    vibrate,
    vibrateCompletion,
    vibrateWarning,
    vibrateStart,
    alertCompletion,
    alertWarning,
    alertStart,
    requestNotificationPermission,
    scheduleRoundNotifications,
    cancelRoundNotifications,
  }
}
