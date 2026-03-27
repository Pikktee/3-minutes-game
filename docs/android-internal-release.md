# Android Internal Release (APK/AAB)

Ziel: Ein internes Test-Build bereitstellen, bevor ein Play-Store-Rollout erfolgt.

## 1) Web-Assets aktualisieren

```bash
pnpm build:android:web
pnpm cap:sync
```

## 2) Android-Projekt in Studio oeffnen

```bash
pnpm cap:open
```

## 3) Debug APK (schneller interner Test)

In Android Studio:
- **Build > Build Bundle(s) / APK(s) > Build APK(s)**

Alternativ per CLI:

```bash
cd android
./gradlew assembleDebug
```

Output (typisch):
- `android/app/build/outputs/apk/debug/app-debug.apk`

## 4) Signiertes Release-Artefakt

### Option A: AAB (empfohlen fuer Play Closed Testing)

In Android Studio:
- **Build > Generate Signed Bundle / APK**
- **Android App Bundle** waehlen
- Keystore anlegen/waehlen
- `release` Build-Type waehlen

Alternativ CLI (wenn Signierung in Gradle konfiguriert):

```bash
cd android
./gradlew bundleRelease
```

Output (typisch):
- `android/app/build/outputs/bundle/release/app-release.aab`

### Option B: Signiertes APK (direkte interne Verteilung)

In Android Studio:
- **Build > Generate Signed Bundle / APK**
- **APK** waehlen

## 5) Interne Testfreigabe

- APK direkt an Tester verteilen (Sideload).
- Oder AAB in Google Play **Internal testing** / **Closed testing** hochladen.
- Release-Notes mit Fokus auf:
  - Timer bei Screen-Off/Hintergrund
  - Warn-/Endsignal
  - Pause/Resume/Skip

## 6) Mindest-Check vor jedem Release

- `pnpm test` muss gruen sein.
- Android Test Matrix (`docs/android-test-matrix.md`) mindestens einmal auf echtem Geraet durchlaufen.
- Keine Regressionen bei Audio/Vibration/Timer-Phasenwechsel.
