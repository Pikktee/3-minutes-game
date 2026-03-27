"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "@/lib/locale-context"
import { useGame, type GamePhase } from "@/lib/game-context"
import { ArrowLeft, Gift, Hand, Sparkles, Shield } from "lucide-react"

interface RoundConfig {
  title: string
  question: string
  giverRole: string
  giverDesc: string
  receiverRole: string
  receiverDesc: string
  giverIcon: typeof Gift
  receiverIcon: typeof Gift
  nextPhase: GamePhase
}

export function RoundInstructionsScreen() {
  const { t } = useLocale()
  const { state, setPhase } = useGame()
  const { phase, activePartner, partnerNames } = state

  const getPartnerDisplayName = (partner: "A" | "B") => {
    return partnerNames[partner] || t(`partner${partner}` as const)
  }

  const getRoundConfig = (): RoundConfig => {
    const isFirstHalf = phase === "round1-instructions" || phase === "round2-instructions"
    const isServeAccept = phase === "round1-instructions" || phase === "round3-instructions"

    if (isServeAccept) {
      return {
        title: t("round1Title"),
        question: t("round1Question"),
        giverRole: t("round1GiverRole"),
        giverDesc: t("round1GiverDesc"),
        receiverRole: t("round1ReceiverRole"),
        receiverDesc: t("round1ReceiverDesc"),
        giverIcon: Gift,
        receiverIcon: Sparkles,
        nextPhase: isFirstHalf ? "round1-timer" : "round3-timer",
      }
    } else {
      return {
        title: t("round2Title"),
        question: t("round2Question"),
        giverRole: t("round2GiverRole"),
        giverDesc: t("round2GiverDesc"),
        receiverRole: t("round2ReceiverRole"),
        receiverDesc: t("round2ReceiverDesc"),
        giverIcon: Shield,
        receiverIcon: Hand,
        nextPhase: isFirstHalf ? "round2-timer" : "round4-timer",
      }
    }
  }

  const config = getRoundConfig()
  const roundNumber = phase.includes("1") ? 1 : phase.includes("2") ? 2 : phase.includes("3") ? 3 : 4
  const currentPartnerIsA = (roundNumber <= 2 && activePartner === "A") || (roundNumber > 2 && activePartner === "B")

  const GiverIcon = config.giverIcon
  const ReceiverIcon = config.receiverIcon

  const getPrevPhase = (): GamePhase => {
    switch (phase) {
      case "round1-instructions":
        return "setup"
      case "round2-instructions":
        return "round1-timer"
      case "round3-instructions":
        return "switch-roles"
      case "round4-instructions":
        return "round3-timer"
      default:
        return "home"
    }
  }

  const askerName = currentPartnerIsA ? getPartnerDisplayName("A") : getPartnerDisplayName("B")
  const receiverName = currentPartnerIsA ? getPartnerDisplayName("B") : getPartnerDisplayName("A")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPhase(getPrevPhase())}
          className="mr-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">{t("back")}</span>
        </Button>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("round")} {roundNumber} {t("of")} 4
          </p>
          <h1 className="text-lg font-semibold">{config.title}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-6 py-8 max-w-lg mx-auto w-full">
        {/* Question */}
        <div className="bg-primary/10 rounded-2xl p-6 mb-8 text-center">
          <p className="text-xs uppercase tracking-wide text-primary/70 mb-2">
            {askerName} {t("asks")}:
          </p>
          <p className="text-xl font-medium text-primary italic">
            {`"${config.question}"`}
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <GiverIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {askerName}
                </p>
                <h3 className="font-semibold text-foreground mb-1">{config.giverRole}</h3>
                <p className="text-sm text-muted-foreground">{config.giverDesc}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/30">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/40 flex items-center justify-center shrink-0">
                <ReceiverIcon className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {receiverName}
                </p>
                <h3 className="font-semibold text-foreground mb-1">{config.receiverRole}</h3>
                <p className="text-sm text-muted-foreground">{config.receiverDesc}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="bg-muted/50 rounded-xl p-4 mb-8">
          <p className="text-sm text-muted-foreground text-center">
            {t("discussAndAgree")}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Button
            size="lg"
            className="w-full text-lg py-6 rounded-xl"
            onClick={() => setPhase(config.nextPhase)}
          >
            {t("ready")} - {t("begin")}
          </Button>
        </div>
      </main>
    </div>
  )
}
