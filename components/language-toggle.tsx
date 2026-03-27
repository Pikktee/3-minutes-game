"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/lib/locale-context"
import { type Locale, allLocales, localeNames } from "@/lib/i18n"
import { Globe, Check } from "lucide-react"

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1.5"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase font-medium tracking-wide text-sm">
            {locale}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {allLocales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc as Locale)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className={locale === loc ? "font-medium" : ""}>
              {localeNames[loc]}
            </span>
            {locale === loc && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
