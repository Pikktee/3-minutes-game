# Android-Testumgebung (lokal)

Diese Anleitung richtet eine stabile Android-Testumgebung fuer die App ein.

## 1) Android Studio + SDK installieren

1. Android Studio installieren.
2. Beim ersten Start folgende Komponenten installieren:
   - Android SDK Platform (aktuelle stabile API)
   - Android SDK Build-Tools
   - Android Emulator
   - Android Platform-Tools (`adb`)
3. In Android Studio unter **SDK Manager** pruefen, dass mindestens eine aktuelle API verfuegbar ist.

## 2) Emulator einrichten

1. In Android Studio den **Device Manager** oeffnen.
2. Neues virtuelles Geraet anlegen (z. B. Pixel 7/8).
3. System Image herunterladen (Google APIs, aktuelle Android-Version).
4. Emulator einmal starten und Grundsetup abschliessen.

## 3) Physisches Android-Geraet einrichten (empfohlen)

1. Auf dem Smartphone **Entwickleroptionen** aktivieren.
2. **USB-Debugging** einschalten.
3. Geraet per USB verbinden.
4. Fingerabdruckdialog "USB-Debugging zulassen" bestaetigen.

## 4) CLI-Pruefung

Im Terminal:

```bash
java -version
adb version
adb devices
```

Erwartung:
- `java -version` liefert eine installierte JDK-Version.
- `adb version` liefert eine Versionsnummer.
- `adb devices` zeigt mindestens ein `device` (Emulator oder Smartphone).

## 5) Android-spezifische Testfaelle fuer diese App

Vor jedem Build kurz pruefen:

1. Bildschirm ausschalten waehrend aktiver 3-Minuten-Runde.
2. Kommen Warnung bei 30s und Ende bei 0s?
3. App in den Hintergrund schicken und spaeter zurueckkehren:
   - Timerstand muss korrekt aus realer Zeit berechnet sein.
4. Energiesparmodus/Doze pruefen:
   - Benachrichtigungen muessen weiterhin als Sicherheitsnetz fungieren.

