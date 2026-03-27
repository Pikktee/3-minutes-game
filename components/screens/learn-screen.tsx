"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

type WheelQuadrant = "serve" | "take" | "allow" | "accept"

interface QuadrantConfig {
  id: WheelQuadrant
  roleKey: "serve" | "accept" | "take" | "allow"
  whoActsKey: "learnWheelYouAct" | "learnWheelPartnerActs"
  forWhomKey: "learnWheelForYou" | "learnWheelForPartner"
  path: string
  labelX: number
  labelY: number
  fillColor: string
  activeFillColor: string
}

const wheelQuadrants: QuadrantConfig[] = [
  {
    id: "serve",
    roleKey: "serve",
    whoActsKey: "learnWheelYouAct",
    forWhomKey: "learnWheelForPartner",
    path: "M180 180 L180 54 A126 126 0 0 0 54 180 Z",
    labelX: 122,
    labelY: 122,
    fillColor: "#0f8f68",
    activeFillColor: "#1bc48f",
  },
  {
    id: "take",
    roleKey: "take",
    whoActsKey: "learnWheelYouAct",
    forWhomKey: "learnWheelForYou",
    path: "M180 180 L180 54 A126 126 0 0 1 306 180 Z",
    labelX: 238,
    labelY: 122,
    fillColor: "#11a073",
    activeFillColor: "#24d69c",
  },
  {
    id: "allow",
    roleKey: "allow",
    whoActsKey: "learnWheelPartnerActs",
    forWhomKey: "learnWheelForPartner",
    path: "M180 180 L54 180 A126 126 0 0 0 180 306 Z",
    labelX: 122,
    labelY: 244,
    fillColor: "#0d7f5b",
    activeFillColor: "#19b783",
  },
  {
    id: "accept",
    roleKey: "accept",
    whoActsKey: "learnWheelPartnerActs",
    forWhomKey: "learnWheelForYou",
    path: "M180 180 L306 180 A126 126 0 0 1 180 306 Z",
    labelX: 238,
    labelY: 244,
    fillColor: "#0f8a63",
    activeFillColor: "#1dc58d",
  },
]

export function LearnScreen() {
  const { t } = useLocale()
  const { setPhase } = useGame()
  const [stepIndex, setStepIndex] = useState(0)
  const [activeQuadrant, setActiveQuadrant] = useState<WheelQuadrant | null>(null)

  const currentQuadrant = useMemo(
    () => wheelQuadrants.find((quadrant) => quadrant.id === activeQuadrant) ?? null,
    [activeQuadrant]
  )

  const activeRole = currentQuadrant ? t(currentQuadrant.roleKey) : ""
  const activeRoleDescription = currentQuadrant ? t(`${currentQuadrant.roleKey}Desc` as const) : ""
  const isForYou = currentQuadrant?.forWhomKey === "learnWheelForYou"
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === 3

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => setPhase("home")} className="mr-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">{t("back")}</span>
        </Button>
        <h1 className="text-lg font-semibold">{t("learn")}</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-8 max-w-lg mx-auto space-y-5">
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  stepIndex === index ? "w-7 bg-primary" : "w-2.5 bg-muted"
                )}
              />
            ))}
          </div>

          {stepIndex === 0 ? (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">{t("learnWelcomeTitle")}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{t("learnWelcomeBody")}</p>
                <div className="rounded-lg bg-background border border-border p-3">
                  <p className="text-sm font-medium text-foreground mb-1">{t("forWhom")}</p>
                  <p className="text-sm text-muted-foreground">{t("forWhomDesc")}</p>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {stepIndex === 1 ? (
            <Card>
              <CardContent className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">{t("twoQuestions")}</h2>
                <p className="text-sm text-muted-foreground">{t("learnTwoQuestionsHelp")}</p>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-sm font-medium italic mb-1">{`"${t("question1")}"`}</p>
                  <p className="text-sm text-muted-foreground">{t("question1Desc")}</p>
                </div>
                <div className="rounded-lg border border-secondary/40 bg-secondary/25 p-3">
                  <p className="text-sm font-medium italic mb-1">{`"${t("question2")}"`}</p>
                  <p className="text-sm text-muted-foreground">{t("question2Desc")}</p>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {stepIndex === 2 ? (
            <Card className="border-slate-700 bg-slate-950 text-slate-100">
              <CardContent className="p-5 space-y-4">
                <h2 className="text-xl font-semibold text-emerald-300">{t("wheelOfConsentTitle")}</h2>
                <p className="text-sm text-slate-300">{t("wheelOfConsentDesc")}</p>

                <div className="flex justify-center">
                  <svg viewBox="0 0 360 360" className="w-[300px] h-[300px]">
                    <defs>
                      <marker id="wheelArrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                        <path d="M0,0 L8,4 L0,8 z" fill="#ffffff" />
                      </marker>
                    </defs>

                    <circle cx="180" cy="180" r="142" fill="#4b5563" />
                    <circle cx="180" cy="180" r="126" fill="#0a5d46" />

                    {wheelQuadrants.map((quadrant) => (
                      <path
                        key={quadrant.id}
                        d={quadrant.path}
                        fill={activeQuadrant === quadrant.id ? quadrant.activeFillColor : quadrant.fillColor}
                        stroke="#6b7280"
                        strokeWidth="1"
                        className="cursor-pointer transition-colors"
                        onClick={() => setActiveQuadrant(quadrant.id)}
                      />
                    ))}

                    <line x1="180" y1="54" x2="180" y2="306" stroke="#6b7280" strokeWidth="1.5" />
                    <line x1="54" y1="180" x2="306" y2="180" stroke="#6b7280" strokeWidth="1.5" />

                    <text x="180" y="24" textAnchor="middle" fill="#34d399" fontSize="11">DU HANDELST</text>
                    <text x="180" y="344" textAnchor="middle" fill="#34d399" fontSize="11">ANDERE HANDELN</text>
                    <text x="24" y="180" textAnchor="middle" transform="rotate(-90 24 180)" fill="#34d399" fontSize="11">FÜR ANDERE</text>
                    <text x="336" y="180" textAnchor="middle" transform="rotate(90 336 180)" fill="#34d399" fontSize="11">FÜR MICH</text>

                    {wheelQuadrants.map((quadrant) => (
                      <text
                        key={`label-${quadrant.id}`}
                        x={quadrant.labelX}
                        y={quadrant.labelY}
                        textAnchor="middle"
                        fill="#ecfeff"
                        fontSize="13"
                        className={cn(activeQuadrant === quadrant.id ? "opacity-100" : "opacity-85")}
                      >
                        {t(quadrant.roleKey).toUpperCase()}
                      </text>
                    ))}

                    <circle cx="180" cy="180" r="18" fill="#0f172a" />

                    {currentQuadrant ? (
                      <line
                        x1="180"
                        y1="180"
                        x2={isForYou ? 262 : 98}
                        y2="180"
                        stroke="#ffffff"
                        strokeWidth="3"
                        markerEnd="url(#wheelArrowHead)"
                      />
                    ) : null}
                  </svg>
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3 text-sm min-h-24">
                  {currentQuadrant ? (
                    <>
                      <p className="font-medium mb-1 text-slate-50">{activeRole}</p>
                      <p className="text-slate-300 mb-2">{activeRoleDescription}</p>
                      <p className="text-slate-300">
                        <span className="font-medium text-slate-50">{t("learnWheelWhoActs")} </span>
                        {t(currentQuadrant.whoActsKey)} ·{" "}
                        <span className="font-medium text-slate-50">{t("learnWheelForWhom")} </span>
                        {t(currentQuadrant.forWhomKey)}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-300">Tippe auf einen Bereich im Rad. Dann erscheint der Pfeil in die passende „Für wen?“-Richtung.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : null}

          {stepIndex === 3 ? (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">Praxisprinzipien</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Folge dem Vergnügen, statt Leistung zu liefern.</li>
                  <li>• Präsenz und entspannte Hände sind wichtiger als Technik.</li>
                  <li>• Grenzen klar spüren und klar aussprechen.</li>
                  <li>• Das Spiel als eigene Praxis üben, nicht als Vorspiel.</li>
                </ul>
                <p className="text-sm font-medium text-foreground">{t("practiceReminderText")}</p>
              </CardContent>
            </Card>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
              disabled={isFirstStep}
            >
              {t("back")}
            </Button>
            <Button
              onClick={() => {
                if (isLastStep) {
                  setPhase("home")
                  return
                }
                setStepIndex((prev) => Math.min(prev + 1, 3))
              }}
            >
              {isLastStep ? "Fertig" : t("continue")}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
