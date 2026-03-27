"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { ArrowRight, RefreshCw } from "lucide-react"

export function SwitchRolesScreen() {
  const { t } = useLocale()
  const { state, setPhase } = useGame()

  const currentPartner = state.activePartner
  const newPartner = currentPartner === "A" ? "B" : "A"

  const getPartnerDisplayName = (partner: "A" | "B") => {
    return state.partnerNames[partner] || t(`partner${partner}` as const)
  }

  const currentName = getPartnerDisplayName(currentPartner)
  const newName = getPartnerDisplayName(newPartner)

  // Replace {name} placeholder in translation
  const turnText = t("nowItsTurn").replace("{name}", newName)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
          <RefreshCw className="w-12 h-12 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-foreground text-center mb-4">
          {t("switchRoles")}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center max-w-xs mb-4 leading-relaxed">
          {t("greatWork")}
        </p>
        <p className="text-muted-foreground text-center max-w-xs mb-8 leading-relaxed">
          {turnText}
        </p>

        {/* Partner indicator */}
        <div className="flex items-center gap-4 mb-12">
          <div className="text-center opacity-50">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
              <span className="text-lg font-semibold text-muted-foreground">{currentPartner}</span>
            </div>
            <p className="text-xs text-muted-foreground">{currentName}</p>
          </div>

          <ArrowRight className="w-6 h-6 text-primary" />

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
              <span className="text-lg font-semibold text-primary-foreground">{newPartner}</span>
            </div>
            <p className="text-xs text-foreground font-medium">{newName}</p>
          </div>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          className="w-full max-w-xs text-lg py-6 rounded-xl"
          onClick={() => setPhase("round3-instructions")}
        >
          {t("continue")}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </main>
    </div>
  )
}
