"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { LanguageToggle } from "@/components/language-toggle"
import { SettingsButton } from "@/components/settings-button"
import { FirstRunOnboarding } from "@/components/first-run-onboarding"
import { Heart, BookOpen } from "lucide-react"

const FIRST_RUN_ONBOARDING_KEY = "hasSeenFirstRunOnboarding"

export function HomeScreen() {
  const { t } = useLocale()
  const { setPhase } = useGame()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(FIRST_RUN_ONBOARDING_KEY)
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
    setHasCheckedOnboarding(true)
  }, [])

  const markOnboardingSeen = () => {
    localStorage.setItem(FIRST_RUN_ONBOARDING_KEY, "true")
    setShowOnboarding(false)
  }

  const handleLearnBasics = () => {
    markOnboardingSeen()
    setPhase("learn")
  }

  const handleSkipToGame = () => {
    markOnboardingSeen()
    setPhase("intro")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <LanguageToggle />
        <SettingsButton />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-3 text-balance">
          {t("welcomeTitle")}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-sm mb-2 leading-relaxed">
          {t("welcomeSubtitle")}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4 w-full max-w-xs">
          <Button
            size="lg"
            className="w-full text-lg py-6 rounded-xl"
            onClick={() => setPhase("intro")}
          >
            {t("startGame")}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full text-lg py-6 rounded-xl"
            onClick={() => setPhase("learn")}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t("learnMore")}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-xs text-muted-foreground/50">
          {t("footerText")}
        </p>
      </footer>

      {hasCheckedOnboarding && showOnboarding ? (
        <FirstRunOnboarding
          onLearnBasics={handleLearnBasics}
          onSkip={handleSkipToGame}
        />
      ) : null}
    </div>
  )
}
