"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/lib/locale-context"
import { useGame } from "@/lib/game-context"
import { Moon, Settings, Volume2, VolumeX, Vibrate } from "lucide-react"

export function SettingsButton() {
  const { t } = useLocale()
  const { state, toggleSound, toggleVibration, toggleKeepScreenOn } = useGame()
  const { soundEnabled, vibrationEnabled, keepScreenOn } = state.settings

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={toggleSound} className="cursor-pointer">
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              {t("soundOn")}
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 mr-2" />
              {t("soundOff")}
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleVibration} className="cursor-pointer">
          <Vibrate className="w-4 h-4 mr-2" />
          {vibrationEnabled ? t("vibrationOn") : t("vibrationOff")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleKeepScreenOn} className="cursor-pointer">
          <Moon className="w-4 h-4 mr-2" />
          {keepScreenOn ? t("keepScreenOn") : t("keepScreenOnOff")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
