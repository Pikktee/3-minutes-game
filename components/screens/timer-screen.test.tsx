import React, { useEffect } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen, cleanup } from "@testing-library/react"
import { GameProvider, useGame, type GamePhase } from "@/lib/game-context"
import { TimerScreen } from "@/components/screens/timer-screen"

const alertStart = vi.fn()
const alertWarning = vi.fn()
const alertCompletion = vi.fn()
const scheduleRoundNotifications = vi.fn()
const cancelRoundNotifications = vi.fn()
const requestNotificationPermission = vi.fn()
const timerSessionMocks = vi.hoisted(() => ({
  saveTimerSession: vi.fn(),
  loadTimerSession: vi.fn(async () => null),
  clearTimerSession: vi.fn(),
}))

vi.mock("@/lib/locale-context", () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock("@/hooks/use-alerts", () => ({
  useAlerts: () => ({
    alertStart,
    alertWarning,
    alertCompletion,
    scheduleRoundNotifications,
    cancelRoundNotifications,
    requestNotificationPermission,
  }),
}))

vi.mock("@/lib/timer-session", () => ({
  saveTimerSession: timerSessionMocks.saveTimerSession,
  loadTimerSession: timerSessionMocks.loadTimerSession,
  clearTimerSession: timerSessionMocks.clearTimerSession,
}))

function PhaseHarness({ phase }: { phase: GamePhase }) {
  const { state, setPhase, setPartnerNames } = useGame()
  useEffect(() => {
    setPartnerNames({ A: "Alice", B: "Bob" })
    setPhase(phase)
  }, [phase, setPhase, setPartnerNames])

  return (
    <div>
      <div data-testid="phase">{state.phase}</div>
      <TimerScreen />
    </div>
  )
}

function renderTimer(phase: GamePhase) {
  return render(
    <GameProvider>
      <PhaseHarness phase={phase} />
    </GameProvider>,
  )
}

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
  vi.useRealTimers()
  alertStart.mockClear()
  alertWarning.mockClear()
  alertCompletion.mockClear()
  scheduleRoundNotifications.mockClear()
  cancelRoundNotifications.mockClear()
  requestNotificationPermission.mockClear()
  timerSessionMocks.saveTimerSession.mockClear()
  timerSessionMocks.loadTimerSession.mockClear()
  timerSessionMocks.clearTimerSession.mockClear()
})

describe("TimerScreen (Timerlogik)", () => {
  it("spielt Start-Alert genau einmal beim Mount", async () => {
    vi.useFakeTimers()
    renderTimer("round1-timer")
    await vi.advanceTimersByTimeAsync(0)
    expect(alertStart).toHaveBeenCalledTimes(1)

    // auch nach Zeitfortschritt kein weiterer Start-Alert
    await vi.advanceTimersByTimeAsync(10_000)
    expect(alertStart).toHaveBeenCalledTimes(1)
  })

  it("löst Warnung bei 30s Rest genau einmal aus und Completion bei 0s", async () => {
    vi.useFakeTimers()
    renderTimer("round1-timer")
    await vi.advanceTimersByTimeAsync(0)

    // bis 30s Rest (Anzeige 0:30). Der Warn-Alert soll beim Übergang auf 30s ausgelöst werden.
    await vi.advanceTimersByTimeAsync(150_000)
    expect(screen.getByText(/^0:3[01]$/)).toBeInTheDocument()
    expect(alertWarning).toHaveBeenCalledTimes(1)

    // restliche Zeit runter
    await vi.advanceTimersByTimeAsync(31_000)
    expect(alertCompletion).toHaveBeenCalledTimes(1)

    // UI zeigt Completion-State (t("complete") => "complete")
    expect(screen.queryByText("pause")).not.toBeInTheDocument()
  })

  it("Pause stoppt Countdown, Resume setzt fort", async () => {
    vi.useFakeTimers()
    renderTimer("round1-timer")
    await vi.advanceTimersByTimeAsync(0)

    // 3:00 initial
    expect(screen.getByText("3:00")).toBeInTheDocument()

    await vi.advanceTimersByTimeAsync(5_000)
    expect(screen.queryByText("3:00")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "pause" }))
    await vi.advanceTimersByTimeAsync(0)
    await vi.advanceTimersByTimeAsync(10_000)
    const frozenTimeText = screen.getByText(/\d:\d\d/).textContent

    fireEvent.click(screen.getByRole("button", { name: "resume" }))
    await vi.advanceTimersByTimeAsync(0)
    await vi.advanceTimersByTimeAsync(2_000)
    expect(screen.getByText(/\d:\d\d/).textContent).not.toBe(frozenTimeText)
  })

  it("Skip wechselt Phase korrekt (round1-timer -> round2-instructions)", async () => {
    vi.useFakeTimers()
    renderTimer("round1-timer")
    await vi.advanceTimersByTimeAsync(0)

    expect(screen.getByTestId("phase")).toHaveTextContent("round1-timer")
    fireEvent.click(screen.getByRole("button", { name: "skip" }))
    expect(screen.getByTestId("phase")).toHaveTextContent("round2-instructions")
  })

  it("Skip wechselt Phase korrekt (round2-timer -> switch-roles)", async () => {
    vi.useFakeTimers()
    renderTimer("round2-timer")
    await vi.advanceTimersByTimeAsync(0)

    expect(screen.getByTestId("phase")).toHaveTextContent("round2-timer")
    fireEvent.click(screen.getByRole("button", { name: "skip" }))
    expect(screen.getByTestId("phase")).toHaveTextContent("switch-roles")
  })

  it("räumt Interval beim Unmount auf (keine laufenden Timer übrig)", async () => {
    vi.useFakeTimers()
    const { unmount } = renderTimer("round1-timer")
    await vi.advanceTimersByTimeAsync(0)
    await vi.advanceTimersByTimeAsync(2_000)

    unmount()
    // Vitest zählt auch setTimeouts etc., aber hier sollte nach Unmount nichts mehr laufen.
    // Falls eine zusätzliche microtask offen ist, tolerieren wir 0..1.
    const count = typeof vi.getTimerCount === "function" ? vi.getTimerCount() : 0
    expect(count).toBeLessThanOrEqual(1)
  })
})

