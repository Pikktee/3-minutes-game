"use client"

import { useCallback, useRef } from "react"
import { useGame } from "@/lib/game-context"

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
  }
}
