"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type Locale, defaultLocale, getTranslation, type TranslationKey, allLocales } from "./i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale
  
  const browserLang = navigator.language.split("-")[0].toLowerCase()
  
  if (allLocales.includes(browserLang as Locale)) {
    return browserLang as Locale
  }
  
  return defaultLocale
}

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null
  
  const stored = localStorage.getItem("preferred-locale")
  if (stored && allLocales.includes(stored as Locale)) {
    return stored as Locale
  }
  return null
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const storedLocale = getStoredLocale()
    const initialLocale = storedLocale || getBrowserLocale()
    setLocaleState(initialLocale)
    setIsInitialized(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-locale", newLocale)
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey) => {
      return getTranslation(locale, key)
    },
    [locale]
  )

  if (!isInitialized) {
    return null
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
