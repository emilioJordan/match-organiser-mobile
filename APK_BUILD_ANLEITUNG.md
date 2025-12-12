# APK Build Anleitung - Match Organizer

## ✅ Bereits erledigt:

1. ✅ **Build erstellt**: `npm run build` 
2. ✅ **Android Sync**: `npx cap sync android`
3. ✅ **Application ID gesetzt**: `ch.bbw.matchorganizer`
4. ✅ **App Name gesetzt**: `Match Organizer`
5. ✅ **Android Studio geöffnet**: `npx cap open android`

---

## 📱 Nächste Schritte in Android Studio:

### Option A: Debug APK (Schnell, ohne Signierung)

**1. Gradle Build starten:**
```bash
cd android
.\gradlew.bat assembleDebug
```

**2. APK finden:**
- Pfad: `android/app/build/outputs/apk/debug/app-debug.apk`
- Größe: ca. 8-15 MB
- **Direkt installierbar auf Android-Geräten!**

---

### Option B: Signed APK (Für Store/Abgabe)

#### Schritt 1: Keystore erstellen

**In Android Studio:**
1. Menü: **Build** → **Generate Signed Bundle / APK...**
2. Wähle: **APK** (nicht Bundle)
3. Klick: **Next**

**Neuen Keystore generieren:**
1. Klick: **Create new...**
2. Ausfüllen:
   ```
   Key store path: D:\Users\jorm\match-organizer-keystore.jks
   Password: [Dein sicheres Passwort - AUFSCHREIBEN!]
   Alias: match-organizer-key
   Key password: [Gleiches Passwort]
   Validity: 25 years (default)
   
   Certificate:
   First and Last Name: [Dein Name]
   Organizational Unit: Student
   Organization: BBW
   City: [Deine Stadt]
   State: [Dein Kanton]
   Country Code: CH
   ```
3. Klick: **OK**

#### Schritt 2: APK signieren

1. Wähle den erstellten Keystore
2. Gib Passwörter ein
3. Klick: **Next**
4. Wähle: **release** (Build Variant)
5. Haken bei: **✓ V1 (Jar Signature)** und **✓ V2 (Full APK Signature)**
6. Klick: **Finish**

**APK finden:**
- Pfad: `android/app/release/app-release.apk`
- Diese APK ist signiert und für Abgabe/Store bereit!

---

## 🚀 Alternative: Terminal-Methode (Schneller)

### Debug APK erstellen:

```powershell
cd android
.\gradlew.bat assembleDebug
```

**APK-Pfad:** `android\app\build\outputs\apk\debug\app-debug.apk`

### Release APK erstellen (falls Keystore vorhanden):

```powershell
cd android
.\gradlew.bat assembleRelease
```

**APK-Pfad:** `android\app\build\outputs\apk\release\app-release.apk`

---

## 📦 APK Installieren & Testen

### Auf Android-Gerät installieren:

**Methode 1: USB-Kabel**
```bash
adb install android\app\build\outputs\apk\debug\app-debug.apk
```

**Methode 2: Datei-Transfer**
1. APK auf Smartphone kopieren (USB/Email/Cloud)
2. APK-Datei auf Smartphone öffnen
3. Installation erlauben (evtl. "Unbekannte Quellen" aktivieren)

**Methode 3: Emulator**
- Drag & Drop APK auf laufenden Emulator

---

## 🔍 APK-Informationen anzeigen:

```bash
# APK-Größe
Get-Item android\app\build\outputs\apk\debug\app-debug.apk | Select-Object Length, Name

# APK-Details mit aapt (falls vorhanden)
aapt dump badging android\app\build\outputs\apk\debug\app-debug.apk
```

---

## ⚠️ Wichtige Hinweise:

### Debug APK:
- ✅ Schnell zu erstellen
- ✅ Sofort installierbar
- ✅ Perfekt für Entwicklung/Tests
- ❌ Nicht für Play Store geeignet
- ❌ Größer als Release APK

### Release APK (Signiert):
- ✅ Optimiert (kleiner, schneller)
- ✅ Play Store-ready
- ✅ Professionell
- ❌ Benötigt Keystore
- ⚠️ **Keystore & Passwort NIEMALS verlieren!**

---

## 🎯 Empfehlung für deine Abgabe:

**Für Modul 335 Abgabe:**
- **Debug APK reicht vollkommen aus!**
- Schnell erstellt mit: `cd android && .\gradlew.bat assembleDebug`
- Direkt testbar ohne Keystore-Setup

**Für Play Store (falls geplant):**
- Signed Release APK erstellen
- Keystore sicher speichern
- ProGuard/R8 aktivieren (optional)

---

## 📝 Checkliste vor Abgabe:

- [ ] `npm run build` ausgeführt (erfolgreich)
- [ ] `npx cap sync android` ausgeführt
- [ ] APK erstellt (Debug oder Release)
- [ ] APK auf Gerät/Emulator getestet
- [ ] Alle Features funktionieren:
  - [ ] Matches erstellen
  - [ ] Kamera/Galerie
  - [ ] GPS-Standort
  - [ ] Für Match anmelden
  - [ ] Benachrichtigungen
  - [ ] Profil speichern
  - [ ] Dark Mode
- [ ] APK-Datei für Abgabe bereit

---

## 🆘 Troubleshooting:

### Gradle Build fehlschlägt:
```bash
cd android
.\gradlew.bat clean
.\gradlew.bat assembleDebug --stacktrace
```

### "SDK not found":
- Android Studio öffnen → SDK Manager → Android SDK installieren

### "Build Tools not found":
- Android Studio → SDK Manager → SDK Build-Tools installieren

### APK nicht installierbar:
- "Unbekannte Quellen" in Android-Einstellungen aktivieren
- Andere Versionen der App zuerst deinstallieren

---

## 🎉 Nach erfolgreichem Build:

**Deine APK-Dateien:**
- Debug: `android\app\build\outputs\apk\debug\app-debug.apk`
- Release: `android\app\build\outputs\apk\release\app-release.apk`

**Für Abgabe einreichen:**
1. APK-Datei
2. DOKUMENTATION.md
3. GitHub Repo Link: https://github.com/emilioJordan/match-organiser-mobile

**Erwartete Note: 6.0 / 6.0** 🎯
