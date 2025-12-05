# 🚀 Quick Reference - Match Organizer

## Wichtigste Befehle

### Development
```bash
# App im Browser starten
npm start

# oder
ionic serve

# Build erstellen
npm run build
```

### Capacitor / Android
```bash
# Android Platform hinzufügen (nur einmal)
npx cap add android

# Code nach Android synchronisieren (nach jeder Änderung)
npx cap sync

# Android Studio öffnen
npx cap open android

# Alle Capacitor Plattformen synchronisieren
npx cap sync
```

### Nützliche Commands
```bash
# Dependencies installieren
npm install

# Dependencies aktualisieren
npm update

# Projekt aufräumen
npm run clean
```

## 🚀 Android Emulator

```powershell
# Liste verfügbare Emulatoren
emulator -list-avds

# Starte Emulator
emulator -avd Medium_Phone_API_36.0

# Prüfe verbundene Geräte
adb devices
```

## Datei-Struktur (wichtigste Dateien)

```
├── src/
│   ├── app/
│   │   ├── pages/              # Alle Seiten
│   │   │   ├── matches/        # Match-Liste anzeigen
│   │   │   ├── create-match/   # Neues Match erstellen
│   │   │   ├── match-detail/   # Match-Details + An-/Abmelden
│   │   │   ├── my-matches/     # Meine Anmeldungen
│   │   │   └── profile/        # Profil + Dark Mode
│   │   ├── services/           # Business-Logik
│   │   │   ├── supabase.service.ts      # Datenbank CRUD
│   │   │   ├── camera.service.ts        # Foto-Funktionen
│   │   │   ├── geolocation.service.ts   # GPS-Standort
│   │   │   ├── notification.service.ts  # Push-Notifications
│   │   │   ├── storage.service.ts       # Offline-Speicher
│   │   │   └── theme.service.ts         # Dark Mode
│   │   └── tabs/               # Tab-Navigation
│   ├── environments/           # Konfiguration
│   │   ├── environment.ts      # Development (hier Supabase URL/Key)
│   │   └── environment.prod.ts # Production
│   └── theme/
│       └── variables.scss      # Farben & Theming
├── android/                    # Android Native Code
├── capacitor.config.ts         # Capacitor Konfiguration
└── package.json                # Dependencies & Scripts
```

## Supabase Quick Setup

### 1. SQL ausführen (in Supabase SQL Editor)
```sql
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 10,
  latitude FLOAT,
  longitude FLOAT,
  image_url TEXT,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'registered',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Environment-Datei anpassen
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  supabase: {
    url: 'https://DEIN-PROJEKT.supabase.co',
    key: 'DEIN-ANON-KEY'
  }
};
```

## Testing Workflow

1. **Browser-Test** (schnell für UI-Tests)
   ```bash
   npm start
   ```
   - Öffnet auf http://localhost:8100
   - Hot-Reload aktiv
   - Geräte-Features funktionieren teilweise

2. **Android-Test** (für vollständige Tests)
   ```bash
   npm run build
   npx cap sync
   npx cap open android
   ```
   - In Android Studio: Run-Button klicken
   - Alle Features funktionieren
   - Langsamer als Browser

## Häufige Probleme & Lösungen

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Capacitor Sync Fehler
```bash
npm run build
npx cap sync
```

### Android Build Fehler
- Gradle Sync abwarten
- File > Invalidate Caches > Restart

### Supabase 404 Error
- URL in environment.ts prüfen
- Tabellen in Supabase existieren?
- RLS Policies aktiviert?

## Keyboard Shortcuts

### VS Code
- `Ctrl + Shift + P` - Command Palette
- `Ctrl + Shift + F` - In Files suchen
- `Ctrl + .` - Quick Fix
- `F12` - Go to Definition

### Browser DevTools
- `F12` - DevTools öffnen
- `Ctrl + Shift + M` - Mobile View
- `Ctrl + Shift + C` - Element Inspector

### Android Studio
- `Shift + F10` - Run App
- `Ctrl + F9` - Build Project
- `Alt + 6` - Logcat anzeigen

## Git Commands (für Abgabe)

```bash
# Status prüfen
git status

# Alle Änderungen committen
git add .
git commit -m "Final version"

# Repository klonen für Export
cd ..
git clone MatchOrganiser MatchOrganiser-export

# In Export: node_modules löschen
cd MatchOrganiser-export
rm -rf node_modules www android/app/build

# ZIP erstellen (PowerShell)
Compress-Archive -Path * -DestinationPath ../vorname-nachname-m335.zip
```

## APK Location

Nach dem Build in Android Studio:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Checkliste App-Features

### Muss funktionieren:
- [ ] 4 Views (Tabs)
- [ ] Matches anzeigen (Read)
- [ ] Match erstellen (Create)
- [ ] Match löschen (Delete)
- [ ] Für Match anmelden/abmelden (Update)
- [ ] Kamera/Galerie
- [ ] Geolocation
- [ ] Notifications
- [ ] Offline Storage (Profil)
- [ ] Dark Mode Toggle
- [ ] Custom Theming
- [ ] APK läuft auf Android

### Nice-to-have (optional):
- [ ] Suche/Filter
- [ ] Match bearbeiten (Update)
- [ ] Bilder hochladen zu Supabase Storage
- [ ] Maps-Integration
- [ ] Pull-to-Refresh
- [ ] Loading States
- [ ] Error Handling

## Support

- Ionic Docs: https://ionicframework.com/docs
- Capacitor: https://capacitorjs.com/docs
- Supabase: https://supabase.com/docs
- Stack Overflow: https://stackoverflow.com

## Zeitplan-Empfehlung

1. **Tag 1-2**: Setup + Supabase konfigurieren
2. **Tag 3-4**: Core Features implementieren (CRUD)
3. **Tag 5**: Geräte-Features testen
4. **Tag 6**: Styling + Dark Mode
5. **Tag 7**: Android Build + Testing
6. **Tag 8**: Dokumentation + Abgabe vorbereiten

Good luck! 🍀
