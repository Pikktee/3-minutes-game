# Android Test Matrix

Diese Matrix deckt die kritischen Faelle fuer die 3-Minuten-Timer-App auf Android ab.

## Voraussetzungen

- Aktuelle App via `pnpm build:android:web && pnpm cap:sync`
- Start in Android Studio auf Emulator oder echtem Geraet
- Sound/Vibration in der App aktiviert (fuer Signaltests)

## Testfaelle

### 1) Foreground-Basislauf
- Runde starten und 3 Minuten im Vordergrund laufen lassen.
- Erwartung:
  - Warnsignal bei ~30s Rest.
  - Endsignal bei ~0s.
  - Runde geht in Completion-State.

### 2) Display aus waehrend aktiver Runde
- Runde starten, Bildschirm sperren.
- Geraet nach Ende der Runde entsperren.
- Erwartung:
  - Warn-/Endbenachrichtigung werden zur richtigen Zeit ausgeliefert.
  - Beim Zurueckkehren ist Timerstand korrekt (kein "eingefrorener" Count).

### 3) App in Hintergrund (Home-Taste/App-Switch)
- Runde starten, App in Hintergrund senden.
- Nach 40-90 Sekunden zurueckkehren.
- Erwartung:
  - Verbleibende Zeit entspricht real vergangener Zeit.
  - Warnsignal wird nicht doppelt ausgegeben.

### 4) Pause/Fortsetzen
- Runde starten, nach einigen Sekunden pausieren.
- 20+ Sekunden warten, dann fortsetzen.
- Erwartung:
  - Zeit waehrend Pause bleibt stabil.
  - Nach Fortsetzen laeuft Countdown korrekt weiter.
  - Hintergrund-Benachrichtigungen werden bei Pause abgebrochen und bei Resume neu geplant.

### 5) Skip-Verhalten
- Runde starten, sofort auf "Skip".
- Erwartung:
  - Sofortiger Wechsel in naechste Phase.
  - Keine alten Warn-/Endbenachrichtigungen der uebersprungenen Runde.

### 6) Energiesparmodus/Doze
- Energiesparmodus aktivieren (oder Doze erzwingen auf Testgeraet).
- Runde im Hintergrund laufen lassen.
- Erwartung:
  - Endsignal weiterhin ueber lokale Benachrichtigung.
  - Kein haengen gebliebener UI-Timer beim Re-Entry.

## Geraete-Mix (Minimum)

- 1x Pixel (nahe AOSP)
- 1x Samsung/Xiaomi (aggressivere Hintergrundoptimierung)

## Ergebnisprotokoll

Pro Testfall dokumentieren:
- Geraet + Android-Version
- Schrittfolge
- Ist-/Soll-Verhalten
- Screenshots/Screenrecording bei Abweichungen
