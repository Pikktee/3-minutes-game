"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type GamePhase = 
  | "home"
  | "learn"
  | "intro"
  | "setup"
  | "round1-instructions"
  | "round1-timer"
  | "round2-instructions"
  | "round2-timer"
  | "switch-roles"
  | "round3-instructions"
  | "round3-timer"
  | "round4-instructions"
  | "round4-timer"
  | "complete"

interface GameSettings {
  soundEnabled: boolean
  vibrationEnabled: boolean
}

interface PartnerNames {
  A: string
  B: string
}

interface GameState {
  phase: GamePhase
  currentRound: number
  totalRounds: number
  activePartner: "A" | "B"
  partnerNames: PartnerNames
  settings: GameSettings
}

interface GameContextType {
  state: GameState
  setPhase: (phase: GamePhase) => void
  nextPhase: () => void
  setActivePartner: (partner: "A" | "B") => void
  setPartnerNames: (names: PartnerNames) => void
  getPartnerName: (partner: "A" | "B") => string
  toggleSound: () => void
  toggleVibration: () => void
  resetGame: () => void
}

const initialState: GameState = {
  phase: "home",
  currentRound: 1,
  totalRounds: 4,
  activePartner: "A",
  partnerNames: {
    A: "",
    B: "",
  },
  settings: {
    soundEnabled: true,
    vibrationEnabled: true,
  },
}

const phaseOrder: GamePhase[] = [
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

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState)

  const setPhase = useCallback((phase: GamePhase) => {
    setState((prev) => {
      const roundMap: Record<string, number> = {
        "round1-instructions": 1,
        "round1-timer": 1,
        "round2-instructions": 2,
        "round2-timer": 2,
        "round3-instructions": 3,
        "round3-timer": 3,
        "round4-instructions": 4,
        "round4-timer": 4,
      }
      return {
        ...prev,
        phase,
        currentRound: roundMap[phase] || prev.currentRound,
      }
    })
  }, [])

  const nextPhase = useCallback(() => {
    setState((prev) => {
      const currentIndex = phaseOrder.indexOf(prev.phase)
      const nextIndex = Math.min(currentIndex + 1, phaseOrder.length - 1)
      const nextPhaseValue = phaseOrder[nextIndex]
      const roundMap: Record<string, number> = {
        "round1-instructions": 1,
        "round1-timer": 1,
        "round2-instructions": 2,
        "round2-timer": 2,
        "round3-instructions": 3,
        "round3-timer": 3,
        "round4-instructions": 4,
        "round4-timer": 4,
      }
      return {
        ...prev,
        phase: nextPhaseValue,
        currentRound: roundMap[nextPhaseValue] || prev.currentRound,
      }
    })
  }, [])

  const setActivePartner = useCallback((partner: "A" | "B") => {
    setState((prev) => ({ ...prev, activePartner: partner }))
  }, [])

  const setPartnerNames = useCallback((names: PartnerNames) => {
    setState((prev) => ({ ...prev, partnerNames: names }))
  }, [])

  const getPartnerName = useCallback((partner: "A" | "B") => {
    return state.partnerNames[partner]
  }, [state.partnerNames])

  const toggleSound = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, soundEnabled: !prev.settings.soundEnabled },
    }))
  }, [])

  const toggleVibration = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, vibrationEnabled: !prev.settings.vibrationEnabled },
    }))
  }, [])

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...initialState,
      partnerNames: prev.partnerNames, // Keep partner names
    }))
  }, [])

  return (
    <GameContext.Provider
      value={{
        state,
        setPhase,
        nextPhase,
        setActivePartner,
        setPartnerNames,
        getPartnerName,
        toggleSound,
        toggleVibration,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
