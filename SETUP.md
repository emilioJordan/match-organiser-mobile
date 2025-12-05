# 🚀 Setup-Anleitung für Match Organizer

Diese Anleitung hilft dir, das Projekt zum Laufen zu bringen.

## ✅ Voraussetzungen prüfen

Stelle sicher, dass du folgendes installiert hast:
- Node.js (v18 oder höher) - https://nodejs.org
- npm (kommt mit Node.js)
- Git
- Android Studio (für Android-Build) - https://developer.android.com/studio

## 📦 Schritt 1: Dependencies installieren

Die Dependencies sollten bereits installiert sein. Falls nicht:

```bash
npm install
```

## 🗄️ Schritt 2: Supabase einrichten

### 2.1 Supabase Projekt erstellen
1. Gehe zu https://supabase.com
2. Erstelle einen kostenlosen Account
3. Erstelle ein neues Projekt
4. Warte, bis das Projekt bereit ist (ca. 2 Minuten)

### 2.2 Datenbank-Schema erstellen
1. Gehe zu deinem Supabase Projekt
2. Klicke auf "SQL Editor" im Menü
3. Erstelle eine neue Query
4. Kopiere und führe folgendes SQL aus:

```sql
-- Matches Tabelle erstellen
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  max_participants INTEGER NOT NULL DEFAULT 10,
  image_url TEXT,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Participants Tabelle erstellen
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('registered', 'cancelled')) DEFAULT 'registered',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indizes für bessere Performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_created_by ON matches(created_by);
CREATE INDEX idx_participants_match_id ON participants(match_id);
CREATE INDEX idx_participants_user_email ON participants(user_email);

-- Row Level Security (RLS) aktivieren
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Policies für öffentlichen Lesezugriff
CREATE POLICY "Matches sind öffentlich lesbar" ON matches
  FOR SELECT USING (true);

CREATE POLICY "Jeder kann Matches erstellen" ON matches
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Ersteller können ihre Matches aktualisieren" ON matches
  FOR UPDATE USING (created_by = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Ersteller können ihre Matches löschen" ON matches
  FOR DELETE USING (created_by = current_setting('request.jwt.claims', true)::json->>'email');

-- Policies für Participants
CREATE POLICY "Participants sind öffentlich lesbar" ON participants
  FOR SELECT USING (true);

CREATE POLICY "Jeder kann sich anmelden" ON participants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Benutzer können ihre Anmeldungen aktualisieren" ON participants
  FOR UPDATE USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');
```

### 2.3 API-Schlüssel holen
1. Gehe zu "Project Settings" > "API"
2. Kopiere:
   - Project URL
   - anon/public key

### 2.4 Environment-Datei konfigurieren

Öffne `src/environments/environment.ts` und `src/environments/environment.prod.ts` und füge deine Supabase-Credentials ein:

```typescript
export const environment = {
  production: false, // true in environment.prod.ts
  supabase: {
    url: 'https://dein-projekt.supabase.co',
    key: 'dein-anon-key'
  }
};
```

**⚠️ WICHTIG:** Committe diese Dateien NICHT mit echten API-Keys in ein öffentliches Repository!

## 🌐 Schritt 3: App im Browser starten

```bash
npm start
```

oder

```bash
ionic serve
```

Die App öffnet sich automatisch im Browser unter `http://localhost:8100`

## 📱 Schritt 4: Android-Build (optional)

### 4.1 Android Platform hinzufügen

```bash
npm run build
npx cap add android
npx cap sync
```

### 4.2 Android Studio öffnen

```bash
npx cap open android
```

### 4.3 APK erstellen

In Android Studio:
1. Warte bis Gradle Sync fertig ist
2. Gehe zu: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
3. Warte bis der Build fertig ist
4. Klicke auf "locate" um die APK zu finden
5. Die APK ist in: `android/app/build/outputs/apk/debug/app-debug.apk`

### 4.4 APK auf Gerät testen

1. Aktiviere "USB-Debugging" auf deinem Android-Gerät
2. Verbinde das Gerät mit dem Computer
3. In Android Studio: Klicke auf den grünen "Run" Button
4. Wähle dein Gerät aus

## 🎨 Schritt 5: App anpassen (optional)

### App-Name ändern
- `capacitor.config.ts` - appName ändern
- `src/index.html` - title ändern

### Farben anpassen
- `src/theme/variables.scss` - Farben in :root und body.dark

### Icon & Splashscreen
1. Erstelle ein Icon (512x512 px) als `icon.png`
2. Erstelle einen Splashscreen (2732x2732 px) als `splash.png`
3. Platziere sie in `resources/`
4. Führe aus:
```bash
npm install -g @capacitor/assets
npx capacitor-assets generate
```

## 🧪 Schritt 6: App testen

### Im Browser testen
```bash
npm start
```

Teste alle Features:
- ✅ Matches anzeigen
- ✅ Match erstellen (Profil ausfüllen → Create Tab)
- ✅ Bild hinzufügen (funktioniert nur auf Gerät/Android)
- ✅ Standort verwenden (Browser fragt nach Permission)
- ✅ Für Match anmelden
- ✅ Dark Mode umschalten (Profil Tab)
- ✅ Profil speichern

### Auf Android testen
Baue und installiere die APK wie in Schritt 4 beschrieben.

## 📋 Checkliste vor Abgabe

- [ ] Supabase konfiguriert und Datenbank läuft
- [ ] App läuft im Browser ohne Fehler
- [ ] Alle 4 Tabs funktionieren
- [ ] CRUD-Operationen funktionieren (Create, Read, Update, Delete)
- [ ] Mindestens 3 Geräte-Features funktionieren:
  - [ ] Kamera/Galerie (nur auf Gerät)
  - [ ] Geolocation
  - [ ] Local Notifications
  - [ ] Offline Storage (Profil)
- [ ] Dark Mode funktioniert
- [ ] Android APK erstellt
- [ ] README.md ist vollständig
- [ ] ZIP-File erstellt mit:
  - [ ] Git-Repository Export (inkl. .git)
  - [ ] APK-File
  - [ ] Dokumentation (siehe README.md)

## 📦 Abgabe vorbereiten

### 1. Git Repository exportieren

```bash
# Neuen Ordner für Export erstellen
cd ..
git clone MatchOrganiser MatchOrganiser-export
cd MatchOrganiser-export

# node_modules entfernen
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force www
Remove-Item -Recurse -Force android/app/build

# ZIP erstellen
Compress-Archive -Path * -DestinationPath ../vorname-nachname-m335.zip
```

### 2. APK hinzufügen

Kopiere `android/app/build/outputs/apk/debug/app-debug.apk` in das ZIP.

### 3. Dokumentation hinzufügen

Die Dokumentation ist bereits im README.md enthalten:
- ✅ Titelblatt-Informationen
- ✅ Projektbeschreibung
- ✅ User Stories (7+)
- ✅ Storyboard
- ✅ Datenbank-Modell

## 🆘 Probleme lösen

### Fehler beim npm install
```bash
# Cache leeren und neu versuchen
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Capacitor Fehler
```bash
# Capacitor neu synchronisieren
npx cap sync
```

### Android Build Fehler
- Stelle sicher, dass Android Studio aktuell ist
- Überprüfe Java JDK Version (Java 17 empfohlen)
- Invalidate Caches: File > Invalidate Caches > Invalidate and Restart

### Supabase Verbindungsfehler
- Überprüfe URL und API-Key in `environment.ts`
- Überprüfe, ob Datenbank-Tabellen existieren
- Überprüfe Row Level Security Policies

## 📚 Weitere Ressourcen

- Ionic Dokumentation: https://ionicframework.com/docs
- Capacitor Plugins: https://capacitorjs.com/docs/apis
- Supabase Dokumentation: https://supabase.com/docs
- Angular Dokumentation: https://angular.io/docs

## ✨ Viel Erfolg!

Bei Fragen oder Problemen:
1. Überprüfe die Konsole im Browser (F12)
2. Überprüfe Logcat in Android Studio
3. Lies die Fehlermeldungen genau
4. Suche auf Stack Overflow

Viel Erfolg bei deinem ÜK! 🚀
