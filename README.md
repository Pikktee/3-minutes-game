# 3-Minute Game App

Smartphone-orientierte Web-App zur Umsetzung des **3-Minuten-Spiels** nach den Grundideen von **Dr. Betty Martin** und dem **Konsensrad (Wheel of Consent)**.

## Was ist das 3-Minuten-Spiel?

Das 3-Minuten-Spiel ist eine strukturierte Partneruebung, die Beruehrung, Grenzen, Zustimmung und Kommunikation erfahrbar macht. Im Kern stehen zwei Fragen:

- "Wie moechtest du, dass ich dich beruehre?"
- "Wie moechtest du mich beruehren?"

Aus dem Zusammenspiel von **wer handelt** und **fuer wen es ist** entstehen die vier Rollen des Konsensrads:

- **Dienen** (ich handle fuer dich)
- **Annehmen** (du handelst fuer mich)
- **Nehmen** (ich handle fuer mich)
- **Erlauben** (du handelst fuer dich, mit meiner Zustimmung)

Das Spiel wird in dieser App als klarer 4-Runden-Ablauf umgesetzt (4 x 3 Minuten), inklusive Rollenwechsel, Timer, Reflexion und Lernbereich.

> Hinweis: Die inhaltliche Grundlage dieses Projekts liegt in `docs/3-minutes-game.md`.

## Ziel der App

Die App soll das Spiel auf dem Smartphone niederschwellig und sicher anleitbar machen:

- gefuehrter Ablauf mit klaren Rollen je Runde
- reduzierter Fokus auf die aktuelle Frage und Zeit
- optionale Namenspersonalisierung fuer beide Personen
- mehrsprachige Oberflaeche
- akustische und haptische Signale fuer Start, Warnung und Ende

## Architektur der App

### Tech-Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Radix UI / shadcn-basierte UI-Bausteine**
- **PWA-Metadaten** via `public/manifest.json`

### Struktur (vereinfacht)

- `app/layout.tsx`  
  Root-Layout, globale Styles, Provider-Hierarchie (`LocaleProvider`, `GameProvider`), Metadata/Viewport.
- `app/page.tsx`  
  Einstiegspunkt, rendert `GameApp`.
- `components/game-app.tsx`  
  Zentrale Screen-Routing-Logik auf Basis der aktuellen Spielphase.
- `components/screens/*`  
  Einzelne Screens fuer Home, Lernen, Intro, Setup, Rundenanleitung, Timer, Rollenwechsel, Abschluss.
- `lib/game-context.tsx`  
  Globaler Spielzustand inkl. Phase, Runde, aktiver Partner, Namen und Einstellungen.
- `lib/locale-context.tsx` + `lib/i18n.ts`  
  Mehrsprachigkeit (en/de/fr/es/pt), Browser-Detection, Persistenz der Sprache in `localStorage`.
- `hooks/use-alerts.ts`  
  Audio- und Vibrations-Alerts fuer Timing-Ereignisse.

### Zustands- und Navigationsmodell

Die App ist als **deterministischer Phasen-Flow** modelliert:

`home -> learn -> intro -> setup -> round1-instructions -> round1-timer -> round2-instructions -> round2-timer -> switch-roles -> round3-instructions -> round3-timer -> round4-instructions -> round4-timer -> complete`

`GameProvider` verwaltet:

- aktuelle Phase
- aktuelle Runde (abgeleitet aus der Phase)
- aktiven Partner (`A`/`B`)
- Partnernamen
- Settings (`soundEnabled`, `vibrationEnabled`)

Damit ist der Ablauf nachvollziehbar, leicht testbar und fuer mobile Nutzung stabil.

### Timer- und Alert-Logik

Im Timer-Screen laeuft jede Runde ueber 180 Sekunden:

- automatischer Start der Runde
- Warnsignal bei 30 Sekunden Restzeit
- Abschlusssignal bei 0 Sekunden
- Pause/Fortsetzen, optionales Ueberspringen

Akustische Signale werden ueber Web Audio erzeugt, Vibration ueber `navigator.vibrate` (falls verfuegbar und aktiviert).

### Internationalisierung

Texte liegen zentral in `lib/i18n.ts`. Die Sprache wird:

1. aus `localStorage` gelesen (falls gesetzt),
2. sonst aus der Browser-Sprache abgeleitet,
3. sonst auf Default (`en`) gesetzt.

So bleibt die UI fuer wiederkehrende Nutzung konsistent.

## Lokale Entwicklung

### Voraussetzungen

- Node.js (aktuelle LTS empfohlen)
- pnpm

### Start

```bash
pnpm install
pnpm dev
```

Weitere Skripte:

```bash
pnpm build
pnpm start
pnpm lint
```

## Ausblick

Moegliche naechste Schritte:

- Persistenz des Spielstands zwischen Sessions
- explizitere Safety-/Consent-Checkpoints vor jeder Runde
- optionale Moderationsmodi (stiller Modus, angepasste Rundenlaengen)
- automatisierte Tests fuer Phasenwechsel und Timerlogik

## Credits

- Inhaltliche Inspiration: **Dr. Betty Martin**
- Konzeptgrundlage: **Wheel of Consent / 3-Minute Game**
