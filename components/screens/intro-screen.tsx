"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { ArrowLeft, ArrowRight, Clock, Users, Heart } from "lucide-react"

export function IntroScreen() {
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
        <h1 className="text-lg font-semibold">{t("gameIntro")}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-6 py-8 max-w-lg mx-auto w-full">
        <div className="flex-1">
          {/* Info Cards */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{t("introTime")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("introTimeDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/40 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{t("introBothPlay")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("introBothPlayDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{t("introTouch")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("introTouchDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-muted/50 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-foreground mb-3">{t("howItWorks")}</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">1</span>
                <span>{t("introStep1")} {`"${t("question1")}"`}</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">2</span>
                <span>{t("introStep2")}</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">3</span>
                <span>{t("introStep3")} {`"${t("question2")}"`}</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">4</span>
                <span>{t("introStep4")}</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">5</span>
                <span>{t("introStep5")}</span>
              </li>
            </ol>
          </div>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          className="w-full text-lg py-6 rounded-xl"
          onClick={() => setPhase("setup")}
        >
          {t("continue")}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </main>
    </div>
  )
}
