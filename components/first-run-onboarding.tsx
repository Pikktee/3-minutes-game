"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/lib/locale-context"
import { BookOpen, Heart } from "lucide-react"

interface FirstRunOnboardingProps {
  onLearnBasics: () => void
  onSkip: () => void
}

export function FirstRunOnboarding({ onLearnBasics, onSkip }: FirstRunOnboardingProps) {
  const { t } = useLocale()

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/70 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{t("onboardingWelcomeTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("onboardingWelcomeBody")}
          </p>
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-sm text-foreground">
              {t("onboardingWheelHint")}
            </p>
          </div>
          <div className="space-y-2 pt-1">
            <Button className="w-full" size="lg" onClick={onLearnBasics}>
              <BookOpen className="w-4 h-4 mr-2" />
              {t("onboardingLearnCta")}
            </Button>
            <Button variant="secondary" className="w-full" size="lg" onClick={onSkip}>
              {t("onboardingSkipCta")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
