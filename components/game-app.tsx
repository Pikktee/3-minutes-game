"use client"

import { useGame } from "@/lib/game-context"
import { HomeScreen } from "@/components/screens/home-screen"
import { LearnScreen } from "@/components/screens/learn-screen"
import { IntroScreen } from "@/components/screens/intro-screen"
import { SetupScreen } from "@/components/screens/setup-screen"
import { RoundInstructionsScreen } from "@/components/screens/round-instructions-screen"
import { TimerScreen } from "@/components/screens/timer-screen"
import { SwitchRolesScreen } from "@/components/screens/switch-roles-screen"
import { CompleteScreen } from "@/components/screens/complete-screen"

export function GameApp() {
  const { state } = useGame()
  const { phase } = state

  switch (phase) {
    case "home":
      return <HomeScreen />
    case "learn":
      return <LearnScreen />
    case "intro":
      return <IntroScreen />
    case "setup":
      return <SetupScreen />
    case "round1-instructions":
    case "round2-instructions":
    case "round3-instructions":
    case "round4-instructions":
      return <RoundInstructionsScreen />
    case "round1-timer":
    case "round2-timer":
    case "round3-timer":
    case "round4-timer":
      return <TimerScreen />
    case "switch-roles":
      return <SwitchRolesScreen />
    case "complete":
      return <CompleteScreen />
    default:
      return <HomeScreen />
  }
}
