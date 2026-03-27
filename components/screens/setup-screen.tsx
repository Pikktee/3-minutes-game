"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { ArrowLeft, User, ChevronDown, ChevronUp } from "lucide-react"

export function SetupScreen() {
  const { t } = useLocale()
  const { state, setPhase, setActivePartner, setPartnerNames } = useGame()
  const [nameA, setNameA] = useState(state.partnerNames.A)
  const [nameB, setNameB] = useState(state.partnerNames.B)
  const [showNames, setShowNames] = useState(false)

  const handleSelectPartner = (partner: "A" | "B") => {
    setPartnerNames({ A: nameA, B: nameB })
    setActivePartner(partner)
    setPhase("round1-instructions")
  }

  const getDisplayName = (partner: "A" | "B") => {
    const name = partner === "A" ? nameA : nameB
    return name || t(`partner${partner}` as const)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPhase("intro")}
          className="mr-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">{t("back")}</span>
        </Button>
        <h1 className="text-lg font-semibold">{t("choosePartner")}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Name Entry Section */}
        <button
          onClick={() => setShowNames(!showNames)}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          {showNames ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {t("enterNames")}
        </button>

        {showNames && (
          <div className="w-full max-w-sm space-y-4 mb-8 p-4 bg-muted/30 rounded-xl">
            <p className="text-xs text-muted-foreground text-center">{t("enterNamesDesc")}</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("nameA")}</label>
                <Input
                  value={nameA}
                  onChange={(e) => setNameA(e.target.value)}
                  placeholder={t("namePlaceholderA")}
                  className="bg-background"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("nameB")}</label>
                <Input
                  value={nameB}
                  onChange={(e) => setNameB(e.target.value)}
                  placeholder={t("namePlaceholderB")}
                  className="bg-background"
                />
              </div>
            </div>
          </div>
        )}

        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          {t("whoAsksFirst")}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <button
            onClick={() => handleSelectPartner("A")}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
              state.activePartner === "A"
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">{getDisplayName("A")}</span>
          </button>

          <button
            onClick={() => handleSelectPartner("B")}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
              state.activePartner === "B"
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-accent/40 flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-accent-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">{getDisplayName("B")}</span>
          </button>
        </div>
      </main>
    </div>
  )
}
