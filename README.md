# Match Organizer - Mobile Hybrid App

Eine Mobile Hybrid-App zum Organisieren von Sport-Matches, entwickelt mit Ionic Framework und Angular.

## 📱 Projekt-Übersicht

Diese App ermöglicht es Benutzern, Sport-Matches zu organisieren und sich für Matches anzumelden. Organisatoren können Matches erstellen, bearbeiten und löschen, während Teilnehmer sich anmelden oder abmelden können.

## ✨ Features

### Funktionale Anforderungen
- ✅ **Match-Verwaltung (CRUD)**
  - Matches erstellen mit Titel, Beschreibung, Datum, Zeit, Ort
  - Matches bearbeiten und löschen
  - Alle Matches anzeigen
  - Matches durchsuchen und filtern

- ✅ **Teilnehmer-Verwaltung**
  - Für Matches anmelden
  - Von Matches abmelden
  - Teilnehmerliste anzeigen
  - Maximale Teilnehmerzahl festlegen

- ✅ **Geräte-Schnittstellen** (mindestens 3)
  1. **Kamera** - Bilder für Matches aufnehmen/hochladen
  2. **Geolocation** - Aktuellen Standort als Match-Ort verwenden
  3. **Benachrichtigungen** - Erinnerungen für kommende Matches
  4. **Lokale Datenspeicherung** - Benutzerprofil und Favoriten offline speichern

- ✅ **Theming**
  - Eigenes Farbschema
  - Manueller Dark Mode Toggle
  - App-Name, Icon und Splashscreen
  - Responsive Design

## 🎯 User Stories

1. **Als Organisator** möchte ich ein neues Match erstellen können, damit andere Spieler sich anmelden können.
   - Akzeptanzkriterien:
     - Titel, Beschreibung, Datum, Zeit und Ort können eingegeben werden
     - Optional kann ein Bild hinzugefügt werden
     - Match wird in der Datenbank gespeichert

2. **Als Teilnehmer** möchte ich alle verfügbaren Matches sehen, damit ich mich für interessante Matches anmelden kann.
   - Akzeptanzkriterien:
     - Liste aller Matches wird angezeigt
     - Matches können durchsucht werden
     - Details zu jedem Match sind sichtbar

3. **Als Teilnehmer** möchte ich mich für ein Match anmelden können, damit der Organisator weiß, dass ich teilnehme.
   - Akzeptanzkriterien:
     - Anmeldebutton ist sichtbar
     - Name und E-Mail werden gespeichert
     - Anmeldung wird bestätigt

4. **Als Organisator** möchte ich meine erstellten Matches bearbeiten können, damit ich Details anpassen kann.
   - Akzeptanzkriterien:
     - Bearbeiten-Button ist für eigene Matches sichtbar
     - Alle Felder können aktualisiert werden
     - Änderungen werden gespeichert

5. **Als Organisator** möchte ich Matches löschen können, die nicht mehr stattfinden.
   - Akzeptanzkriterien:
     - Löschen-Button ist für eigene Matches sichtbar
     - Bestätigung vor dem Löschen
     - Match wird aus Datenbank entfernt

6. **Als Benutzer** möchte ich zwischen hellem und dunklem Modus wechseln können, damit ich die App meinen Präferenzen anpassen kann.
   - Akzeptanzkriterien:
     - Toggle-Button im Profil
     - Einstellung wird gespeichert
     - App passt Farben automatisch an

7. **Als Benutzer** möchte ich den aktuellen Standort für einen Match-Ort verwenden können, damit ich nicht manuell Koordinaten eingeben muss.
   - Akzeptanzkriterien:
     - Standort-Button ist verfügbar
     - Berechtigungen werden angefragt
     - Koordinaten werden automatisch eingefügt

## 🎨 UI/UX Design (Storyboard)

### Hauptansichten (4 Tabs)

```
┌─────────────────────────────────────┐
│  📱 Match Organizer                 │
├─────────────────────────────────────┤
│                                      │
│  1. MATCHES (Startseite)            │
│  ┌────────────────────────────────┐ │
│  │ 🔍 Suche...                    │ │
│  ├────────────────────────────────┤ │
│  │ 📷 [Bild] Fussball Match       │ │
│  │    📅 02.12.2025 18:00         │ │
│  │    📍 Sportplatz Musterstr.    │ │
│  │    👥 Max. 10 Teilnehmer       │ │
│  ├────────────────────────────────┤ │
│  │ 📷 [Bild] Basketball Turnier   │ │
│  │    📅 05.12.2025 14:00         │ │
│  └────────────────────────────────┘ │
│                                      │
│  2. MEINE MATCHES                   │
│  - Liste der Matches für die ich    │
│    angemeldet bin                   │
│  - Status: Angemeldet/Abgesagt     │
│                                      │
│  3. ERSTELLEN                       │
│  ┌────────────────────────────────┐ │
│  │ 📷 Bild hinzufügen             │ │
│  │ Titel: ___________________     │ │
│  │ Beschreibung: __________       │ │
│  │ Datum: [DD.MM.YYYY]            │ │
│  │ Zeit: [HH:MM]                  │ │
│  │ Ort: _____________________     │ │
│  │ 📍 Standort verwenden          │ │
│  │ Max. Teilnehmer: [10]          │ │
│  │ [Erstellen Button]             │ │
│  └────────────────────────────────┘ │
│                                      │
│  4. PROFIL                          │
│  ┌────────────────────────────────┐ │
│  │ 👤 Name: _______________       │ │
│  │ ✉️  E-Mail: _____________       │ │
│  │ 🔧 Organisator: [Toggle]       │ │
│  │ 🌓 Dark Mode: [Toggle]         │ │
│  │ ℹ️  App-Informationen          │ │
│  └────────────────────────────────┘ │
│                                      │
├─────────────────────────────────────┤
│ ⚽ Matches │ 📋 Meine │ ➕ │ 👤      │
└─────────────────────────────────────┘
```

### Match-Detail Ansicht

```
┌─────────────────────────────────────┐
│ ← Match Details             [Bearb.]│
├─────────────────────────────────────┤
│  [Hero Image]                       │
│                                      │
│  Fussball Match                     │
│  ⭐⭐⭐⭐⭐                              │
│                                      │
│  📝 Beschreibung                    │
│  Lorem ipsum dolor sit amet...      │
│                                      │
│  📅 Datum & Zeit                    │
│  02. Dezember 2025, 18:00 Uhr      │
│                                      │
│  📍 Ort                             │
│  Sportplatz Musterstrasse          │
│  [Karte anzeigen]                  │
│                                      │
│  👥 Teilnehmer (5/10)               │
│  • Max Mustermann                  │
│  • Anna Schmidt                    │
│  • Peter Weber                     │
│  ...                               │
│                                      │
│  [Anmelden Button]                 │
│  [Abmelden Button]                 │
│                                      │
└─────────────────────────────────────┘
```

## 🗄️ Datenbank-Modell (Supabase)

### Tabelle: `matches`
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | int | Primary Key, Auto-increment |
| title | varchar(255) | Titel des Matches |
| description | text | Beschreibung des Matches |
| date | date | Datum des Matches |
| time | time | Uhrzeit des Matches |
| location | varchar(255) | Ort des Matches |
| latitude | float | Breitengrad (optional) |
| longitude | float | Längengrad (optional) |
| max_participants | int | Maximale Teilnehmerzahl |
| image_url | text | URL zum Match-Bild (optional) |
| created_by | varchar(255) | E-Mail des Erstellers |
| created_at | timestamp | Erstellungszeitpunkt |

### Tabelle: `participants`
| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | int | Primary Key, Auto-increment |
| match_id | int | Foreign Key zu matches.id |
| user_name | varchar(255) | Name des Teilnehmers |
| user_email | varchar(255) | E-Mail des Teilnehmers |
| status | enum | 'registered' oder 'cancelled' |
| created_at | timestamp | Anmeldezeitpunkt |

### SQL-Schema

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
```

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js (v18 oder höher)
- npm oder yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI
- Android Studio (für Android Build)
- Supabase Account

### Schritte

1. **Abhängigkeiten installieren**
```bash
npm install
```

2. **Supabase konfigurieren**
- Erstelle ein Projekt auf [supabase.com](https://supabase.com)
- Führe das obige SQL-Schema in der Supabase SQL-Console aus
- Kopiere deine Supabase URL und Anon Key
- Füge sie in `src/environments/environment.ts` ein:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'DEINE_SUPABASE_URL',
    key: 'DEIN_SUPABASE_ANON_KEY'
  }
};
```

3. **App im Browser starten**
```bash
ionic serve
```

oder

```bash
npm start
```

4. **Android Platform hinzufügen**
```bash
ionic build
ionic cap add android
ionic cap sync
```

5. **Android App öffnen**
```bash
ionic cap open android
```

6. **APK erstellen**
- In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
- APK findet sich in: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📦 Verwendete Technologien

### Frontend
- **Ionic Framework 7** - UI-Framework
- **Angular 17** - Web-Framework
- **TypeScript** - Programmiersprache
- **SCSS** - Styling

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Datenbank
  - Authentication
  - Storage für Bilder
  - Real-time Subscriptions

### Capacitor Plugins
- `@capacitor/camera` - Kamera & Bildauswahl
- `@capacitor/geolocation` - GPS-Standort
- `@capacitor/local-notifications` - Push-Benachrichtigungen
- `@capacitor/preferences` - Lokaler Key-Value Storage
- `@capacitor/network` - Netzwerkstatus
- `@capacitor/splash-screen` - Splash Screen
- `@capacitor/status-bar` - Status Bar Styling

## 📱 Plattformen

- ✅ **Progressive Web App (PWA)** - Läuft im Browser
- ✅ **Android** - Native Android App
- ⚠️ **iOS** - Möglich, aber nicht getestet (macOS erforderlich)

## 🏗️ Projektstruktur

```
MatchOrganiser/
├── src/
│   ├── app/
│   │   ├── pages/              # Alle Seiten/Views
│   │   │   ├── matches/        # Match-Liste
│   │   │   ├── match-detail/   # Match-Details
│   │   │   ├── my-matches/     # Meine Anmeldungen
│   │   │   ├── create-match/   # Match erstellen
│   │   │   └── profile/        # Benutzer-Profil
│   │   ├── services/           # Services
│   │   │   ├── supabase.service.ts
│   │   │   ├── camera.service.ts
│   │   │   ├── geolocation.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── storage.service.ts
│   │   │   └── theme.service.ts
│   │   ├── tabs/               # Tab Navigation
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/                 # Bilder, Icons
│   ├── environments/           # Umgebungs-Konfiguration
│   ├── theme/                  # Globales Styling
│   ├── index.html
│   └── main.ts
├── android/                    # Android Platform
├── capacitor.config.ts         # Capacitor Konfiguration
├── angular.json                # Angular Konfiguration
├── package.json
└── README.md
```

## 🔐 Sicherheit & Best Practices

- ✅ Environment-Variablen für sensitive Daten
- ✅ Row Level Security (RLS) in Supabase aktivieren
- ✅ Input-Validierung in Formularen
- ✅ Error-Handling in allen Services
- ✅ TypeScript für Type-Safety

## 📄 Lizenz

Dieses Projekt wurde als Schulprojekt für das Modul 335 erstellt.

## 👤 Autor

[Dein Name]
[Deine E-Mail]
Projekt: Modul 335 - Mobile-Applikation realisieren
Datum: Dezember 2025

## 🎓 Modulanforderungen

Dieses Projekt erfüllt alle Anforderungen des Moduls 335:

✅ Ionic Framework mit Capacitor  
✅ Mindestens 4 Ansichten (Tabs)  
✅ Supabase mit CRUD-Operationen  
✅ 4 Geräteschnittstellen (Kamera, GPS, Notifications, Storage)  
✅ Eigenes Theming mit Dark Mode  
✅ App-Name, Icon und Splashscreen  
✅ Lauffähige Android APK  
✅ Vollständige Dokumentation
