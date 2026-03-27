"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { KeepAwake } from "@capacitor-community/keep-awake"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { useGame, type GamePhase } from "@/lib/game-context"
import { useAlerts } from "@/hooks/use-alerts"
import { clearTimerSession, loadTimerSession, saveTimerSession } from "@/lib/timer-session"
import { isNativeApp } from "@/lib/native-device"
import { Pause, Play, SkipForward, Gift, Hand, Sparkles, Shield } from "lucide-react"

const TIMER_DURATION = 180 // 3 minutes in seconds
const WARNING_TIME = 30 // Warning at 30 seconds remaining

export function TimerScreen() {
  const { t } = useLocale()
  const { state, setPhase } = useGame()
  const { alertCompletion, alertWarning, alertStart, scheduleRoundNotifications, cancelRoundNotifications, requestNotificationPermission } = useAlerts()
  const { phase, activePartner, partnerNames, settings } = state
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)
  const [isPaused, setIsPaused] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const endTimestampRef = useRef<number>(0)
  const hasWarnedRef = useRef(false)
  const hasCompletedRef = useRef(false)

  const roundNumber = phase.includes("1") ? 1 : phase.includes("2") ? 2 : phase.includes("3") ? 3 : 4
  const isServeAccept = phase === "round1-timer" || phase === "round3-timer"

  const getPartnerDisplayName = (partner: "A" | "B") => {
    return partnerNames[partner] || t(`partner${partner}` as const)
  }

  const getNextPhase = (): GamePhase => {
    switch (phase) {
      case "round1-timer":
        return "round2-instructions"
      case "round2-timer":
        return "switch-roles"
      case "round3-timer":
        return "round4-instructions"
      case "round4-timer":
        return "complete"
      default:
        return "home"
    }
  }

  const handleComplete = useCallback(async () => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    setIsComplete(true)
    setTimeLeft(0)
    await clearTimerSession()
    await cancelRoundNotifications()
    if (isNativeApp()) {
      await KeepAwake.allowSleep().catch(() => undefined)
    }
    alertCompletion()
  }, [alertCompletion, cancelRoundNotifications])

  const getSecondsUntilEnd = useCallback(() => {
    const remainingMs = endTimestampRef.current - Date.now()
    return Math.max(0, Math.ceil(remainingMs / 1000))
  }, [])

  const persistActiveRound = useCallback(async (paused: boolean, pausedRemainingSeconds: number | null = null) => {
    await saveTimerSession({
      phase,
      endTimestampMs: endTimestampRef.current,
      isPaused: paused,
      pausedRemainingSeconds,
    })
  }, [phase])

  const startNewRound = useCallback(async () => {
    hasCompletedRef.current = false
    hasWarnedRef.current = false
    setIsComplete(false)
    setIsPaused(false)
    setTimeLeft(TIMER_DURATION)

    endTimestampRef.current = Date.now() + TIMER_DURATION * 1000
    await persistActiveRound(false)
    await scheduleRoundNotifications(endTimestampRef.current, WARNING_TIME)
    await requestNotificationPermission()
    alertStart()
  }, [alertStart, persistActiveRound, requestNotificationPermission, scheduleRoundNotifications])

  const recalculateFromRealTime = useCallback(async () => {
    if (isPaused || isComplete) return
    const remaining = getSecondsUntilEnd()

    if (remaining <= WARNING_TIME && remaining > 0 && !hasWarnedRef.current) {
      hasWarnedRef.current = true
      alertWarning()
    }

    if (remaining <= 0) {
      await handleComplete()
      return
    }

    setTimeLeft(remaining)
  }, [alertWarning, getSecondsUntilEnd, handleComplete, isComplete, isPaused])

  useEffect(() => {
    let isCancelled = false

    const restoreOrStart = async () => {
      const persisted = await loadTimerSession()
      if (isCancelled) return

      if (persisted && persisted.phase === phase) {
        hasCompletedRef.current = false
        endTimestampRef.current = persisted.endTimestampMs
        setIsPaused(persisted.isPaused)
        setIsComplete(false)

        if (persisted.isPaused) {
          setTimeLeft(persisted.pausedRemainingSeconds ?? TIMER_DURATION)
          return
        }

        const remaining = Math.max(0, Math.ceil((persisted.endTimestampMs - Date.now()) / 1000))
        setTimeLeft(remaining)
        if (remaining <= 0) {
          await handleComplete()
        }
        return
      }

      await startNewRound()
    }

    void restoreOrStart()

    return () => {
      isCancelled = true
    }
  }, [handleComplete, phase, startNewRound])

  useEffect(() => {
    if (!isPaused && !isComplete) {
      timerRef.current = setInterval(() => {
        void recalculateFromRealTime()
      }, 250)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, isComplete, recalculateFromRealTime])

  useEffect(() => {
    const handleVisibilityOrFocus = () => {
      void recalculateFromRealTime()
    }

    document.addEventListener("visibilitychange", handleVisibilityOrFocus)
    window.addEventListener("focus", handleVisibilityOrFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus)
      window.removeEventListener("focus", handleVisibilityOrFocus)
    }
  }, [recalculateFromRealTime])

  useEffect(() => {
    if (!isNativeApp()) return
    const shouldKeepAwake = settings.keepScreenOn && !isPaused && !isComplete

    if (shouldKeepAwake) {
      void KeepAwake.keepAwake().catch(() => undefined)
    } else {
      void KeepAwake.allowSleep().catch(() => undefined)
    }
  }, [isComplete, isPaused, settings.keepScreenOn])

  useEffect(() => {
    return () => {
      if (!isNativeApp()) return
      void KeepAwake.allowSleep().catch(() => undefined)
    }
  }, [])

  const togglePause = async () => {
    if (isComplete) return

    if (isPaused) {
      endTimestampRef.current = Date.now() + timeLeft * 1000
      setIsPaused(false)
      await persistActiveRound(false)
      await scheduleRoundNotifications(endTimestampRef.current, WARNING_TIME)
      return
    }

    const remaining = getSecondsUntilEnd()
    setTimeLeft(remaining)
    setIsPaused(true)
    await persistActiveRound(true, remaining)
    await cancelRoundNotifications()
  }

  const skipRound = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase(getNextPhase())
    void (async () => {
      await clearTimerSession()
      await cancelRoundNotifications()
      if (isNativeApp()) {
        await KeepAwake.allowSleep().catch(() => undefined)
      }
    })()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100
  const currentPartnerIsA = (roundNumber <= 2 && activePartner === "A") || (roundNumber > 2 && activePartner === "B")
  const isWarningTime = timeLeft <= WARNING_TIME && timeLeft > 0

  const activePartnerName = currentPartnerIsA ? getPartnerDisplayName("A") : getPartnerDisplayName("B")
  const passivePartnerName = currentPartnerIsA ? getPartnerDisplayName("B") : getPartnerDisplayName("A")

  const roleInfo = isServeAccept
    ? {
        activeRole: t("serve"),
        activeIcon: Gift,
        passiveRole: t("accept"),
        passiveIcon: Sparkles,
      }
    : {
        activeRole: t("allow"),
        activeIcon: Shield,
        passiveRole: t("take"),
        passiveIcon: Hand,
      }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("round")} {roundNumber} {t("of")} 4
          </p>
          <h1 className="text-lg font-semibold">
            {isServeAccept ? `${t("serve")} & ${t("accept")}` : `${t("take")} & ${t("allow")}`}
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={skipRound}
          className="text-muted-foreground"
        >
          <SkipForward className="w-4 h-4 mr-1" />
          {t("skip")}
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Role indicators */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <roleInfo.activeIcon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">{activePartnerName}</p>
            <p className="text-sm font-medium text-foreground">{roleInfo.activeRole}</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center mx-auto mb-2">
              <roleInfo.passiveIcon className="w-7 h-7 text-accent-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">{passivePartnerName}</p>
            <p className="text-sm font-medium text-foreground">{roleInfo.passiveRole}</p>
          </div>
        </div>

        {/* Timer */}
        <div className="relative w-64 h-64 mb-8">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className={`transition-all duration-1000 ${isWarningTime ? "text-destructive" : "text-primary"}`}
              strokeDasharray={`${progress * 2.827} 282.7`}
            />
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-light tabular-nums transition-colors ${isWarningTime ? "text-destructive" : "text-foreground"}`}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm text-muted-foreground mt-1">
              {t("timeRemaining")}
            </span>
          </div>
        </div>

        {/* Controls */}
        {!isComplete ? (
          <Button
            size="lg"
            variant={isPaused ? "default" : "secondary"}
            className="w-48 py-6 rounded-xl"
            onClick={togglePause}
          >
            {isPaused ? (
              <>
                <Play className="w-5 h-5 mr-2" />
                {t("resume")}
              </>
            ) : (
              <>
                <Pause className="w-5 h-5 mr-2" />
                {t("pause")}
              </>
            )}
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-primary mb-4">{t("complete")}</p>
            <Button
              size="lg"
              className="w-48 py-6 rounded-xl"
              onClick={() => setPhase(getNextPhase())}
            >
              {roundNumber === 4 ? t("complete") : roundNumber === 2 ? t("switchRoles") : t("nextRound")}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
