"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { ArrowLeft, ArrowRight, Hand, Gift, Sparkles, Shield } from "lucide-react"

const quadrantIcons = {
  serve: Gift,
  accept: Sparkles,
  take: Hand,
  allow: Shield,
}

const quadrantColors = {
  serve: "bg-primary/10 text-primary",
  accept: "bg-accent/50 text-accent-foreground",
  take: "bg-secondary text-secondary-foreground",
  allow: "bg-muted text-muted-foreground",
}

export function LearnScreen() {
  const { t } = useLocale()
  const { setPhase } = useGame()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPhase("home")}
          className="mr-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">{t("back")}</span>
        </Button>
        <h1 className="text-lg font-semibold">{t("learn")}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-8 max-w-lg mx-auto">
          {/* Wheel of Consent Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">
              {t("wheelOfConsentTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t("wheelOfConsentDesc")}
            </p>

            {/* Wheel Diagram */}
            <div className="relative aspect-square max-w-[280px] mx-auto mb-8">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
                {/* Serve - Top Left */}
                <div className="bg-primary/10 rounded-tl-full rounded-tr-lg rounded-bl-lg rounded-br-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Gift className="w-6 h-6 text-primary mx-auto mb-1" />
                    <span className="text-sm font-medium text-primary">{t("serve")}</span>
                  </div>
                </div>
                {/* Accept - Top Right */}
                <div className="bg-accent/40 rounded-tr-full rounded-tl-lg rounded-bl-lg rounded-br-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Sparkles className="w-6 h-6 text-accent-foreground mx-auto mb-1" />
                    <span className="text-sm font-medium text-accent-foreground">{t("accept")}</span>
                  </div>
                </div>
                {/* Allow - Bottom Left */}
                <div className="bg-muted rounded-bl-full rounded-tl-lg rounded-tr-lg rounded-br-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Shield className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <span className="text-sm font-medium text-muted-foreground">{t("allow")}</span>
                  </div>
                </div>
                {/* Take - Bottom Right */}
                <div className="bg-secondary rounded-br-full rounded-tl-lg rounded-tr-lg rounded-bl-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Hand className="w-6 h-6 text-secondary-foreground mx-auto mb-1" />
                    <span className="text-sm font-medium text-secondary-foreground">{t("take")}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Two Questions Section */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {t("twoQuestions")}
            </h3>

            <Card className="mb-4 border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <p className="text-lg font-medium text-foreground mb-2 italic">
                  {`"${t("question1")}"`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("question1Desc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-secondary/30">
              <CardContent className="p-5">
                <p className="text-lg font-medium text-foreground mb-2 italic">
                  {`"${t("question2")}"`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("question2Desc")}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Quadrants Section */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              {t("quadrants")}
            </h3>

            <div className="space-y-3">
              {(["serve", "accept", "take", "allow"] as const).map((quadrant) => {
                const Icon = quadrantIcons[quadrant]
                return (
                  <Card key={quadrant} className="overflow-hidden">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${quadrantColors[quadrant]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground capitalize">
                          {t(quadrant)}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {t(`${quadrant}Desc` as const)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full text-lg py-6 rounded-xl"
            onClick={() => setPhase("intro")}
          >
            {t("startGame")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  )
}
