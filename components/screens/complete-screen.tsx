"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { Heart, RotateCcw, Home, MessageCircle } from "lucide-react"

export function CompleteScreen() {
  const { t } = useLocale()
  const { resetGame } = useGame()

  const reflections = [
    t("reflection1"),
    t("reflection2"),
    t("reflection3"),
    t("reflection4"),
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Content */}
      <main className="flex-1 flex flex-col px-6 py-8 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-primary" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-3">
            {t("gameComplete")}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {t("gameCompleteText")}
          </p>
        </div>

        {/* Reflection Prompts */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">{t("reflectionPrompts")}</h2>
            </div>
            <ul className="space-y-3">
              {reflections.map((reflection, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{reflection}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-auto space-y-3">
          <Button
            size="lg"
            className="w-full text-lg py-6 rounded-xl"
            onClick={resetGame}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t("playAgain")}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full text-lg py-6 rounded-xl"
            onClick={resetGame}
          >
            <Home className="w-5 h-5 mr-2" />
            {t("returnHome")}
          </Button>
        </div>
      </main>
    </div>
  )
}
