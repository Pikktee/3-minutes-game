import React from "react"
import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { GameProvider, useGame, type GamePhase } from "@/lib/game-context"

function Harness() {
  const { state, nextPhase, setPhase, toggleSound, toggleVibration, resetGame } = useGame()

  return (
    <div>
      <div data-testid="phase">{state.phase}</div>
      <div data-testid="round">{state.currentRound}</div>
      <div data-testid="sound">{String(state.settings.soundEnabled)}</div>
      <div data-testid="vibration">{String(state.settings.vibrationEnabled)}</div>

      <button onClick={() => nextPhase()}>next</button>
      <button onClick={() => setPhase("round3-timer")}>set-round3-timer</button>
      <button onClick={() => setPhase("switch-roles")}>set-switch</button>
      <button onClick={() => toggleSound()}>toggle-sound</button>
      <button onClick={() => toggleVibration()}>toggle-vibration</button>
      <button onClick={() => resetGame()}>reset</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <GameProvider>
      <Harness />
    </GameProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe("GameProvider", () => {
  it("startet mit home und round 1", () => {
    renderWithProvider()
    expect(screen.getByTestId("phase")).toHaveTextContent("home")
    expect(screen.getByTestId("round")).toHaveTextContent("1")
  })

  it("nextPhase folgt der definierten Phasenreihenfolge bis complete", async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const expected: GamePhase[] = [
      "home",
      "learn",
      "intro",
      "setup",
      "round1-instructions",
      "round1-timer",
      "round2-instructions",
      "round2-timer",
      "switch-roles",
      "round3-instructions",
      "round3-timer",
      "round4-instructions",
      "round4-timer",
      "complete",
    ]

    for (let i = 0; i < expected.length; i++) {
      expect(screen.getByTestId("phase")).toHaveTextContent(expected[i])
      if (i < expected.length - 1) {
        await user.click(screen.getByRole("button", { name: "next" }))
      }
    }

    // bleibt auf complete, auch wenn nextPhase erneut aufgerufen wird
    await user.click(screen.getByRole("button", { name: "next" }))
    expect(screen.getByTestId("phase")).toHaveTextContent("complete")
  })

  it("setzt currentRound passend zu Round-Phasen, lässt sie aber bei non-round Phasen unverändert", async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole("button", { name: "set-round3-timer" }))
    expect(screen.getByTestId("phase")).toHaveTextContent("round3-timer")
    expect(screen.getByTestId("round")).toHaveTextContent("3")

    await user.click(screen.getByRole("button", { name: "set-switch" }))
    expect(screen.getByTestId("phase")).toHaveTextContent("switch-roles")
    expect(screen.getByTestId("round")).toHaveTextContent("3")
  })

  it("toggleSound / toggleVibration invertieren die Settings", async () => {
    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByTestId("sound")).toHaveTextContent("true")
    expect(screen.getByTestId("vibration")).toHaveTextContent("true")

    await user.click(screen.getByRole("button", { name: "toggle-sound" }))
    expect(screen.getByTestId("sound")).toHaveTextContent("false")

    await user.click(screen.getByRole("button", { name: "toggle-vibration" }))
    expect(screen.getByTestId("vibration")).toHaveTextContent("false")
  })

  it("resetGame setzt Phase/Settings zurück, lässt aber Partnernamen erhalten", async () => {
    const user = userEvent.setup()

    function NameHarness() {
      const { state, setPartnerNames, setPhase, toggleSound, resetGame } = useGame()
      return (
        <div>
          <div data-testid="phase">{state.phase}</div>
          <div data-testid="sound">{String(state.settings.soundEnabled)}</div>
          <div data-testid="nameA">{state.partnerNames.A}</div>
          <button onClick={() => setPartnerNames({ A: "Alice", B: "Bob" })}>set-names</button>
          <button onClick={() => setPhase("round2-timer")}>set-phase</button>
          <button onClick={() => toggleSound()}>toggle-sound</button>
          <button onClick={() => resetGame()}>reset</button>
        </div>
      )
    }

    render(
      <GameProvider>
        <NameHarness />
      </GameProvider>,
    )

    await user.click(screen.getByRole("button", { name: "set-names" }))
    await user.click(screen.getByRole("button", { name: "set-phase" }))
    await user.click(screen.getByRole("button", { name: "toggle-sound" }))

    expect(screen.getByTestId("phase")).toHaveTextContent("round2-timer")
    expect(screen.getByTestId("sound")).toHaveTextContent("false")
    expect(screen.getByTestId("nameA")).toHaveTextContent("Alice")

    await user.click(screen.getByRole("button", { name: "reset" }))
    expect(screen.getByTestId("phase")).toHaveTextContent("home")
    expect(screen.getByTestId("sound")).toHaveTextContent("true")
    expect(screen.getByTestId("nameA")).toHaveTextContent("Alice")
  })
})

