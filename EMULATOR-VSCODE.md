# Android Emulator aus VS Code starten

## ⚡ Quick Start

### Option 1: VS Code Tasks (Empfohlen!)
1. `Ctrl+Shift+P` → "Tasks: Run Task"
2. Wähle: **"🎯 Full Start"**
3. Fertig! Dev-Server + Emulator + App starten automatisch

### Option 2: PowerShell-Skript
```powershell
.\start-emulator.ps1
```

### Option 3: Manuell (3 Terminals in VS Code)
```bash
# Terminal 1: Dev-Server
npm start

# Terminal 2: Emulator starten
emulator -avd Medium_Phone_API_36.0

# Terminal 3: App installieren
npx cap run android
```

---

## 🔧 Einmalige Setup-Schritte

### 1. Android SDK Umgebungsvariablen (falls nicht gesetzt)

**Windows PowerShell (als Administrator):**
```powershell
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk", "User")
$path = [System.Environment]::GetEnvironmentVariable("PATH", "User")
[System.Environment]::SetEnvironmentVariable("PATH", "$path;%ANDROID_HOME%\emulator;%ANDROID_HOME%\platform-tools", "User")
```

**Manuelle Methode:**
1. Windows-Taste → "Umgebungsvariablen bearbeiten"
2. Neue Variable: `ANDROID_HOME` = `C:\Users\[Username]\AppData\Local\Android\Sdk`
3. PATH bearbeiten, hinzufügen:
   - `%ANDROID_HOME%\emulator`
   - `%ANDROID_HOME%\platform-tools`
4. VS Code neu starten

### 2. Verfügbare Emulatoren prüfen
```bash
emulator -list-avds
```

**Falls leer:** Einen Emulator in Android Studio erstellen:
- Android Studio öffnen
- Tools → Device Manager → Create Device
- Medium Phone, API 36 (Android 14)

### 3. Capacitor Android Platform hinzufügen (einmalig)
```bash
npm run build
npx cap add android
```

---

## 🚀 Live-Reload im Emulator (Empfohlen!)

Mit Live-Reload siehst du Code-Änderungen sofort im Emulator!

### Schritt 1: Capacitor Config anpassen

Uncomment diese Zeilen in `capacitor.config.ts`:

```typescript
server: {
  androidScheme: 'https',
  url: 'http://10.0.2.2:8100',      // ← Uncomment für Live-Reload
  cleartext: true                     // ← Uncomment für Live-Reload
}
```

### Schritt 2: Workflow
```bash
# Terminal 1: Dev-Server starten
npm start

# Terminal 2: Emulator starten
emulator -avd Medium_Phone_API_36.0

# Terminal 3: App installieren (EINMALIG!)
npx cap sync android
npx cap run android
```

**Ab jetzt:** Alle Code-Änderungen werden automatisch im Emulator aktualisiert! 🔥

**⚠️ WICHTIG:** Vor Abgabe/APK-Build diese Zeilen wieder auskommentieren!

---

## 📋 Verfügbare VS Code Tasks

Nach Setup der `.vscode/tasks.json` kannst du folgende Tasks ausführen:

| Task | Beschreibung | Shortcut |
|------|--------------|----------|
| 🚀 Start Dev Server | Ionic Dev-Server starten | `Ctrl+Shift+S` |
| 📱 Start Android Emulator | Emulator im Hintergrund | `Ctrl+Shift+E` |
| 🔄 Sync & Run on Emulator | Build + Sync + Deploy | `Ctrl+Shift+R` |
| 🎯 Full Start | Alles zusammen (sequential) | - |

**Task ausführen:**
- `Ctrl+Shift+P` → "Tasks: Run Task" → Task wählen
- Oder Keyboard Shortcuts nutzen

---

## 🛠️ Troubleshooting

### Problem: `emulator: command not found`

**Lösung:**
```bash
# Prüfe ANDROID_HOME
echo $env:ANDROID_HOME  # PowerShell
echo %ANDROID_HOME%     # CMD

# Sollte sein: C:\Users\[Username]\AppData\Local\Android\Sdk

# Prüfe ob emulator.exe existiert
Test-Path "$env:ANDROID_HOME\emulator\emulator.exe"  # PowerShell
```

Falls nicht gesetzt: Siehe Schritt 1 oben.

### Problem: `adb: command not found`

**Lösung:**
```bash
# Füge zu PATH hinzu (temporär für aktuelle Session)
$env:PATH += ";$env:ANDROID_HOME\platform-tools"  # PowerShell
set PATH=%PATH%;%ANDROID_HOME%\platform-tools     # CMD
```

### Problem: Emulator startet, aber App wird nicht installiert

**Lösung:**
```bash
# 1. Prüfe ob Emulator erkannt wird
adb devices
# Sollte zeigen: emulator-5554    device

# 2. Force reinstall
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# 3. Capacitor neu syncen
npx cap sync android
```

### Problem: Emulator ist sehr langsam

**Lösungen:**

1. **Hardware-Beschleunigung aktivieren:**
   - Android Studio → Tools → SDK Manager
   - SDK Tools Tab → Intel x86 Emulator Accelerator (HAXM) installieren

2. **Emulator mit weniger RAM starten:**
   ```bash
   emulator -avd Medium_Phone_API_36.0 -memory 2048
   ```

3. **Grafik-Modus ändern:**
   ```bash
   emulator -avd Medium_Phone_API_36.0 -gpu host
   ```

### Problem: Port 8100 bereits belegt

**Lösung:**
```bash
# Anderen Port nutzen
ionic serve --port 8200

# Dann in capacitor.config.ts anpassen:
# url: 'http://10.0.2.2:8200'
```

### Problem: App zeigt "Unable to connect to server"

**Checkliste:**
1. Dev-Server läuft? (`npm start`)
2. URL in `capacitor.config.ts` korrekt? (`http://10.0.2.2:8100`)
3. `cleartext: true` gesetzt?
4. App neu installiert nach Config-Änderung?

```bash
# App neu installieren
npx cap sync android
npx cap run android
```

---

## 📱 Emulator-Befehle

### Emulator starten
```bash
# Spezifischen Emulator starten
emulator -avd Medium_Phone_API_36.0

# Ersten verfügbaren Emulator starten
emulator @$(emulator -list-avds | Select-Object -First 1)

# Mit spezifischen Optionen
emulator -avd Medium_Phone_API_36.0 -memory 2048 -gpu host
```

### Emulator-Status prüfen
```bash
# Laufende Emulatoren/Geräte
adb devices

# Emulator-Logs anzeigen
adb logcat

# Spezifische App-Logs
adb logcat | Select-String "Capacitor"
```

### Emulator beenden
```bash
# Aktuellen Emulator beenden
adb emu kill

# Alle ADB-Verbindungen beenden
adb kill-server
```

### APK installieren/deinstallieren
```bash
# APK installieren
adb install android/app/build/outputs/apk/debug/app-debug.apk

# APK überschreiben (force reinstall)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# App deinstallieren
adb uninstall ch.matchorganizer.app
```

---

## 🎯 Empfohlener Workflow für ÜK

### Phase 1: Entwicklung (90% der Zeit)
**→ Nur Browser verwenden!**

```bash
npm start
```

**Vorteile:**
- ✅ Schnelles Live-Reload (< 1s)
- ✅ Chrome DevTools verfügbar
- ✅ Keine Emulator-Wartezeit
- ✅ Weniger Ressourcen

**Nachteile:**
- ❌ Kamera funktioniert nicht
- ❌ Geolocation nur mit Browser-Permission
- ❌ Notifications nur eingeschränkt

### Phase 2: Native Features testen (10% der Zeit)
**→ Emulator verwenden**

```bash
# Mit Live-Reload (empfohlen)
npm start                          # Terminal 1
emulator -avd Medium_Phone_API_36.0 # Terminal 2
npx cap run android                # Terminal 3 (einmalig)

# Ohne Live-Reload
npm run build && npx cap sync android && npx cap run android
```

**Wann nutzen:**
- ✅ Kamera/Galerie Feature testen
- ✅ GPS-Standort Feature testen
- ✅ Push-Notifications testen
- ✅ Offline-Speicher testen
- ✅ Performance auf Gerät prüfen

### Phase 3: Finale APK erstellen (für Abgabe)

```bash
# 1. Live-Reload deaktivieren
# In capacitor.config.ts: server.url auskommentieren

# 2. Production Build
npm run build

# 3. APK erstellen
cd android
./gradlew assembleDebug

# APK Pfad:
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 💡 Pro-Tipps

### 1. Mehrere Terminals parallel in VS Code
- `Ctrl+Shift+ö` → Neues Terminal
- `Ctrl+PageUp/PageDown` → Zwischen Terminals wechseln
- Split Terminal: Klick auf Split-Icon oben rechts

### 2. Emulator im Hintergrund starten
```bash
Start-Process -FilePath "emulator" -ArgumentList "-avd", "Medium_Phone_API_36.0" -WindowStyle Hidden
```

### 3. VS Code Extension für Emulator
**Android iOS Emulator** (von DiemasMichiels)
- Installieren: `Ctrl+Shift+X` → Suche "Android iOS Emulator"
- Nutzen: `Ctrl+Shift+P` → "Emulator: Run Android Emulator"

### 4. Schnellerer Build-Prozess
```bash
# Nur Web-Assets syncen (schneller)
npx cap copy android

# Statt vollem Sync
npx cap sync android
```

### 5. Chrome DevTools für WebView Debugging
```bash
# 1. App im Emulator öffnen
# 2. Chrome öffnen: chrome://inspect
# 3. "Inspect" bei deiner App klicken
# 4. Volle DevTools verfügbar!
```

---

## 🔗 Weiterführende Links

- **Capacitor CLI Docs:** https://capacitorjs.com/docs/cli
- **Android Emulator Docs:** https://developer.android.com/studio/run/emulator-commandline
- **ADB Docs:** https://developer.android.com/studio/command-line/adb
- **Ionic CLI Docs:** https://ionicframework.com/docs/cli

---

## ✅ Checkliste für ÜK-Start

Vor Arbeitsbeginn sicherstellen:

- [ ] Node.js installiert (`node --version`)
- [ ] Git installiert (`git --version`)
- [ ] Android Studio installiert (für SDK)
- [ ] ANDROID_HOME gesetzt (`echo $env:ANDROID_HOME`)
- [ ] Emulator erstellt (`emulator -list-avds`)
- [ ] Dependencies installiert (`npm install`)
- [ ] Capacitor Android hinzugefügt (`npx cap add android`)
- [ ] VS Code Tasks konfiguriert (`.vscode/tasks.json`)
- [ ] Emulator startet (`emulator -avd Medium_Phone_API_36.0`)
- [ ] ADB funktioniert (`adb devices`)

**Wenn alle Punkte ✅:** Du bist ready! 🚀

Bei Problemen: Siehe Troubleshooting-Sektion oben.
