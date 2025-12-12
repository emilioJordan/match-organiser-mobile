# TITELBLATT

<div style="text-align: center; margin-top: 100px;">

## **Modul 335**
### Mobile Applikation realisieren

---

## **MATCH ORGANIZER**
### Fussball-Matches organisieren und teilnehmen

---

**Datum:** Dezember 2025

**Name:** [Dein Vor- und Nachname]

**Kurs:** [Deine Kursnummer]

**Kursleiter:** [Name des Kursleiters]

</div>

---
---

<div style="page-break-after: always;"></div>

## INHALTSVERZEICHNIS

1. [Projektbeschreibung](#1-projektbeschreibung)
2. [User Stories](#2-user-stories)
3. [Storyboard (UI-Elemente)](#3-storyboard-ui-elemente)
4. [Datenbank-Modell](#4-datenbank-modell)
5. [Technologie-Stack](#5-technologie-stack)
6. [Geräteschnittstellen](#6-geräteschnittstellen)
7. [Implementation](#7-implementation)
8. [Testing & Qualität](#8-testing--qualität)

---

<div style="page-break-after: always;"></div>

## 1. PROJEKTBESCHREIBUNG

### Projektidee
Match Organizer ist eine mobile Hybrid-Applikation, die es Benutzern ermöglicht, Fussball-Matches zu organisieren und an bestehenden Matches teilzunehmen. Die App vereinfacht die Organisation von Freizeitmatches durch intuitive Funktionen und moderne Technologien.

### Problemstellung
Die Organisation von Freizeitsport-Matches erfolgt oft über verschiedene Kanäle (WhatsApp, Email, SMS), was unübersichtlich ist. Es fehlt eine zentrale Plattform mit:
- Überblick über verfügbare Matches
- Einfacher An- und Abmeldung
- Standortinformationen
- Automatischen Erinnerungen

### Lösung
Eine mobile App, die alle Funktionen vereint:
- **Zentrale Plattform** für Match-Verwaltung
- **Echtzeit-Updates** über Supabase Backend
- **Offline-Funktionalität** für Profildaten
- **Native Features** (Kamera, GPS, Notifications)

### Zielgruppe
- Fussball-Enthusiasten und Freizeitsportler
- Match-Organisatoren (Vereine, Gruppen, Privatpersonen)
- Personen, die spontan mitspielen möchten

### Hauptfunktionen
- ✅ **Match-Verwaltung**: Erstellen, Bearbeiten, Löschen
- ✅ **Teilnahme-Management**: An- und Abmeldung
- ✅ **Standortfreigabe**: GPS-Koordinaten für Match-Orte
- ✅ **Bildupload**: Fotos von Sportplätzen/Events
- ✅ **Push-Benachrichtigungen**: Erinnerungen vor Match-Start
- ✅ **Offline-Profil**: Benutzerdaten lokal gespeichert
- ✅ **Dark Mode**: Anpassbares Farbschema

---

<div style="page-break-after: always;"></div>

## 2. USER STORIES

### User Story 1: Match erstellen
**Als** Organisator  
**möchte ich** ein neues Match erstellen können  
**damit** andere Spieler davon erfahren und sich anmelden können.

**Akzeptanzkriterien:**
- Titel, Beschreibung, Datum, Zeit eingeben
- Standort über GPS oder manuell festlegen
- Optional: Bild des Sportplatzes hochladen
- Max. Anzahl Teilnehmer definieren
- Match wird in Datenbank gespeichert

---

### User Story 2: Matches durchsuchen
**Als** Spieler  
**möchte ich** alle verfügbaren Matches durchsuchen können  
**damit** ich ein passendes Match finde.

**Akzeptanzkriterien:**
- Liste aller Matches wird angezeigt
- Nach Titel oder Ort filtern/suchen
- Datum, Zeit und freie Plätze sichtbar
- Pull-to-Refresh für aktuelle Daten

---

### User Story 3: Für Match anmelden
**Als** Spieler  
**möchte ich** mich für ein Match anmelden können  
**damit** der Organisator weiss, dass ich teilnehme.

**Akzeptanzkriterien:**
- "Anmelden" Button in Match-Details
- Anmeldung wird in Datenbank gespeichert
- Teilnehmerzahl wird aktualisiert
- Automatische Benachrichtigung 1h vor Match
- Bestätigung via Toast-Message

---

### User Story 4: Standort verwenden
**Als** Organisator  
**möchte ich** meinen aktuellen Standort als Match-Ort verwenden  
**damit** ich nicht manuell die Adresse eingeben muss.

**Akzeptanzkriterien:**
- GPS-Berechtigung wird angefordert
- Koordinaten werden abgerufen (High Accuracy)
- Koordinaten werden im Formular angezeigt
- Standort wird mit Match gespeichert

---

### User Story 5: Bild hochladen
**Als** Organisator  
**möchte ich** ein Bild des Sportplatzes hochladen  
**damit** Spieler wissen, wo das Match stattfindet.

**Akzeptanzkriterien:**
- Kamera oder Galerie auswählen
- Bild-Vorschau vor Speicherung
- Bild wird mit Match gespeichert
- Bild wird in Match-Details angezeigt

---

### User Story 6: Meine Matches anzeigen
**Als** Spieler  
**möchte ich** alle Matches sehen, für die ich angemeldet bin  
**damit** ich den Überblick behalte.

**Akzeptanzkriterien:**
- Separate Liste "Meine Matches"
- Nur Matches wo User angemeldet ist
- Badge "Angemeldet" sichtbar
- Schnellzugriff zu Match-Details

---

### User Story 7: Profil speichern
**Als** Benutzer  
**möchte ich** mein Profil offline speichern  
**damit** meine Daten auch ohne Internet verfügbar sind.

**Akzeptanzkriterien:**
- Name und Email eingeben
- Organisator-Status wählen
- Daten werden lokal gespeichert
- Nach App-Neustart noch vorhanden
- Dark Mode Einstellung persistent

---

<div style="page-break-after: always;"></div>

## 3. STORYBOARD (UI-ELEMENTE)

### 3.1 Navigationstruktur

```
┌─────────────────────────────────────────────────────┐
│              MATCH ORGANIZER APP                     │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │         Tab Navigation (Bottom)               │  │
│  ├──────────┬──────────┬──────────┬──────────────┤  │
│  │ Matches  │  Meine   │ Erstellen│   Profil     │  │
│  │   📋     │ Matches  │    ➕    │     👤       │  │
│  └──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 3.2 Screen 1: Alle Matches

```
┌─────────────────────────────────────────┐
│  ← Alle Matches                     🔍  │
├─────────────────────────────────────────┤
│  🔍 [Suchfeld: "Match suchen..."]      │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ [Bild] Fussball Match             │ │
│  │        📅 13.12.2025, 18:00       │ │
│  │        📍 Sportplatz Zürich       │ │
│  │        👥 Max. 12 Teilnehmer      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ [Bild] Weekend Match              │ │
│  │        📅 14.12.2025, 16:00       │ │
│  │        📍 Sportplatz Bern         │ │
│  │        👥 Max. 10 Teilnehmer      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [Zum Aktualisieren nach unten ziehen] │
└─────────────────────────────────────────┘
```

**UI-Elemente:**
- Suchbar (Ion-Searchbar)
- Liste (Ion-List)
- Cards (Ion-Card)
- Icons (Ion-Icon: calendar, location, people)
- Pull-to-Refresh

---

### 3.3 Screen 2: Match Details

```
┌─────────────────────────────────────────┐
│  ← Match Details                        │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐ │
│  │    [Match Bild - Hero Image]      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Fussball Match                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  📝 Beschreibung:                       │
│  Ein spannendes Match für alle...      │
│                                         │
│  📅 Datum & Zeit:                       │
│  13.12.2025, 18:00 Uhr                 │
│                                         │
│  📍 Ort:                                │
│  Sportplatz Zürich                     │
│  Koordinaten: 47.3769°, 8.5417°        │
│                                         │
│  👥 Teilnehmer: 8 / 12                 │
│  ┌─────────────────────────────┐       │
│  │ • Max Mustermann            │       │
│  │ • Anna Schmidt              │       │
│  │ • ...                       │       │
│  └─────────────────────────────┘       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  ✅ FÜR MATCH ANMELDEN         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**UI-Elemente:**
- Hero Image (Ion-Img)
- Text Labels (Ion-Label)
- Icons (calendar, location, people)
- Liste der Teilnehmer (Ion-List)
- Action Button (Ion-Button primary)

---

### 3.4 Screen 3: Match Erstellen

```
┌─────────────────────────────────────────┐
│  Match Erstellen                        │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  [Bild-Vorschau]            [X]   │ │
│  └───────────────────────────────────┘ │
│  [📷 Bild hinzufügen]                  │
│                                         │
│  Titel *                                │
│  ┌─────────────────────────────────┐   │
│  │ z.B. Fussball Match             │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Beschreibung *                         │
│  ┌─────────────────────────────────┐   │
│  │ Beschreibe das Match...         │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Datum *          Zeit *                │
│  ┌─────────────┐ ┌─────────────┐       │
│  │ 13.12.2025  │ │   18:00     │       │
│  └─────────────┘ └─────────────┘       │
│                                         │
│  Ort *                                  │
│  ┌─────────────────────────────────┐   │
│  │ Sportplatz Musterstrasse        │   │
│  └─────────────────────────────────┘   │
│  [📍 Aktuellen Standort verwenden]     │
│                                         │
│  Max. Teilnehmer *                      │
│  ┌─────────────────────────────────┐   │
│  │ 10                              │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  ➕ MATCH ERSTELLEN             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**UI-Elemente:**
- Image Upload (Ion-Button)
- Image Preview (Ion-Img)
- Text Inputs (Ion-Input)
- Textarea (Ion-Textarea)
- Date/Time Picker (Ion-Datetime)
- Number Input (Ion-Input type="number")
- GPS Button (Ion-Button outline)
- Submit Button (Ion-Button primary)
- Form Validation (Reactive Forms)

---

### 3.5 Screen 4: Profil

```
┌─────────────────────────────────────────┐
│  Profil                                 │
├─────────────────────────────────────────┤
│                                         │
│  👤 Benutzerdaten                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  Name *                                 │
│  ┌─────────────────────────────────┐   │
│  │ Max Mustermann                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Email *                                │
│  ┌─────────────────────────────────┐   │
│  │ max@example.com                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ☐ Ich bin Organisator                 │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  💾 PROFIL SPEICHERN            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ⚙️  Einstellungen                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  Dark Mode              [Toggle O ]     │
│                                         │
└─────────────────────────────────────────┘
```

**UI-Elemente:**
- Text Inputs (Ion-Input)
- Checkbox (Ion-Checkbox)
- Toggle Switch (Ion-Toggle)
- Save Button (Ion-Button)
- Section Headers (Ion-Label)

---

<div style="page-break-after: always;"></div>

## 4. DATENBANK-MODELL

### 4.1 Entity-Relationship Diagramm

```
┌─────────────────────────────────────┐
│            MATCHES                   │
├─────────────────────────────────────┤
│ 🔑 id (BIGSERIAL)                   │
│    title (TEXT)                     │
│    description (TEXT)               │
│    date (DATE)                      │
│    time (TIME)                      │
│    location (TEXT)                  │
│    max_participants (INTEGER)       │
│    latitude (DECIMAL)               │
│    longitude (DECIMAL)              │
│    image_url (TEXT)                 │
│    created_by (TEXT) [UUID]         │
│    created_at (TIMESTAMPTZ)         │
└─────────────────────────────────────┘
           │
           │ 1:N
           │
           ▼
┌─────────────────────────────────────┐
│         PARTICIPANTS                 │
├─────────────────────────────────────┤
│ 🔑 id (BIGSERIAL)                   │
│ 🔗 match_id (BIGINT) → matches.id   │
│    user_id (TEXT) [UUID]            │
│    status (TEXT)                    │
│    created_at (TIMESTAMPTZ)         │
│                                      │
│ UNIQUE(match_id, user_id)           │
└─────────────────────────────────────┘
```

### 4.2 Tabelle: matches

| Feld              | Typ           | Eigenschaften           | Beschreibung                    |
|-------------------|---------------|-------------------------|---------------------------------|
| **id**            | BIGSERIAL     | PRIMARY KEY             | Eindeutige Match-ID             |
| title             | TEXT          | NOT NULL                | Match-Titel                     |
| description       | TEXT          | NOT NULL                | Ausführliche Beschreibung       |
| date              | DATE          | NOT NULL                | Match-Datum                     |
| time              | TIME          | NOT NULL                | Match-Uhrzeit                   |
| location          | TEXT          | NOT NULL                | Ort (Name oder Adresse)         |
| max_participants  | INTEGER       | NOT NULL, DEFAULT 10    | Maximale Teilnehmerzahl         |
| latitude          | DECIMAL(10,8) | NULL                    | GPS-Koordinate (Breitengrad)    |
| longitude         | DECIMAL(11,8) | NULL                    | GPS-Koordinate (Längengrad)     |
| image_url         | TEXT          | NULL                    | URL zum Match-Bild              |
| created_by        | TEXT          | NOT NULL                | UUID des Erstellers             |
| created_at        | TIMESTAMPTZ   | DEFAULT NOW()           | Erstellungszeitpunkt            |

**Constraints:**
- Primary Key: `id`
- Index auf `date` für schnelle Datumsabfragen
- Index auf `created_by` für User-Queries

---

### 4.3 Tabelle: participants

| Feld       | Typ         | Eigenschaften                | Beschreibung              |
|------------|-------------|------------------------------|---------------------------|
| **id**     | BIGSERIAL   | PRIMARY KEY                  | Eindeutige Teilnehmer-ID  |
| match_id   | BIGINT      | NOT NULL, FOREIGN KEY        | Referenz zu matches.id    |
| user_id    | TEXT        | NOT NULL                     | UUID des Teilnehmers      |
| status     | TEXT        | NOT NULL, DEFAULT 'registered'| Anmeldestatus            |
| created_at | TIMESTAMPTZ | DEFAULT NOW()                | Anmeldezeitpunkt          |

**Constraints:**
- Primary Key: `id`
- Foreign Key: `match_id` → `matches(id)` ON DELETE CASCADE
- Unique Constraint: `(match_id, user_id)` verhindert Doppel-Anmeldungen
- Index auf `match_id` für JOIN-Performance
- Index auf `user_id` für User-Queries

---

### 4.4 SQL-Schema (Erstellen)

```sql
-- Tabelle: matches
CREATE TABLE matches (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 10,
  latitude DECIMAL(10, 8) NULL,
  longitude DECIMAL(11, 8) NULL,
  image_url TEXT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indizes für Performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_created_by ON matches(created_by);

-- Tabelle: participants
CREATE TABLE participants (
  id BIGSERIAL PRIMARY KEY,
  match_id BIGINT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(match_id, user_id)
);

-- Indizes für Performance
CREATE INDEX idx_participants_match_id ON participants(match_id);
CREATE INDEX idx_participants_user_id ON participants(user_id);
```

---

### 4.5 Row Level Security (RLS)

**Aktivierung:**
```sql
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
```

**Policies:**
```sql
-- Matches: Lesen für alle
CREATE POLICY "matches_select_policy" 
ON matches FOR SELECT TO public USING (true);

-- Matches: Erstellen für alle
CREATE POLICY "matches_insert_policy" 
ON matches FOR INSERT TO public WITH CHECK (true);

-- Participants: Lesen für alle
CREATE POLICY "participants_select_policy" 
ON participants FOR SELECT TO public USING (true);

-- Participants: Anmeldung für alle
CREATE POLICY "participants_insert_policy" 
ON participants FOR INSERT TO public WITH CHECK (true);
```

---

<div style="page-break-after: always;"></div>

---

## 5. TECHNOLOGIE-STACK

### 5.1 Frontend Framework
- **Ionic Framework 7.8.6** - Hybrid-App-Entwicklung
- **Angular 17** - Web-Framework
- **TypeScript** - Typsichere Programmierung
- **SCSS** - Styling mit CSS-Variablen

### 5.2 Mobile Platform
- **Capacitor 5.7.8** - Native Bridge
- **Android** - Zielplattform (APK)
- **PWA-Support** - Progressive Web App

### 5.3 Backend & Datenbank
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Datenbank
  - REST API
  - Row Level Security (RLS)
  - Echtzeit-Subscriptions

### 5.4 Capacitor Plugins (Geräteschnittstellen)
1. **@capacitor/camera** (5.0.10) - Kamera & Galerie
2. **@capacitor/geolocation** (5.0.8) - GPS-Standort
3. **@capacitor/local-notifications** (5.0.8) - Push-Benachrichtigungen
4. **@capacitor/preferences** (5.0.8) - Lokale Datenspeicherung

### 5.5 Weitere Plugins
- **@capacitor/status-bar** - Statusleiste-Anpassung
- **@capacitor/splash-screen** - Splash-Screen
- **@capacitor/keyboard** - Keyboard-Handling
- **@capacitor/haptics** - Haptisches Feedback

---

## 6. GERÄTESCHNITTSTELLEN

### 6.1 Kamera (Camera API)
**Plugin:** `@capacitor/camera@5.0.10`

#### Funktionen
- Foto mit Kamera aufnehmen
- Bild aus Galerie auswählen
- Bild-Vorschau vor Upload

#### Implementation
```typescript
// camera.service.ts
async takePicture(): Promise<string | null> {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera
  });
  return image.dataUrl || null;
}
```

#### Verwendung
- **Match erstellen**: Bild für Match hochladen
- **Bildformate**: JPEG, PNG
- **Vorschau**: Bild wird vor Speicherung angezeigt

#### Berechtigungen (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
```

---

### 6.2 Geolocation (GPS)
**Plugin:** `@capacitor/geolocation@5.0.8`

#### Funktionen
- Aktuellen Standort abrufen
- Koordinaten (Latitude, Longitude)
- Berechtigungsverwaltung

#### Implementation
```typescript
// geolocation.service.ts
async getCurrentPosition(): Promise<Position | null> {
  const coordinates = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  });
  return coordinates;
}
```

#### Verwendung
- **Match erstellen**: Standort für Match-Ort
- **Genauigkeit**: High-Accuracy GPS
- **Timeout**: 10 Sekunden

#### Berechtigungen
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

---

### 6.3 Local Notifications (Benachrichtigungen)
**Plugin:** `@capacitor/local-notifications@5.0.8`

#### Funktionen
- Erinnerungen planen
- Benachrichtigungen vor Match-Start
- Notifications abbrechen

#### Implementation
```typescript
// notification.service.ts
async scheduleMatchReminder(
  title: string,
  matchDate: Date,
  matchId: number
): Promise<void> {
  const notificationTime = new Date(matchDate.getTime() - 60 * 60 * 1000); // 1h vorher
  
  await LocalNotifications.schedule({
    notifications: [{
      id: matchId,
      title: 'Match Erinnerung',
      body: `${title} startet bald!`,
      schedule: { at: notificationTime }
    }]
  });
}
```

#### Verwendung
- **Bei Anmeldung**: Automatische Erinnerung 1 Stunde vor Match
- **Persistent**: Bleibt auch nach App-Neustart

---

### 6.4 Preferences (Lokale Datenspeicherung)
**Plugin:** `@capacitor/preferences@5.0.8`

#### Funktionen
- Benutzerprofil speichern
- Einstellungen persistent halten
- Offline-Zugriff auf Daten

#### Implementation
```typescript
// storage.service.ts
async saveUserProfile(profile: UserProfile): Promise<void> {
  await Preferences.set({
    key: 'userProfile',
    value: JSON.stringify(profile)
  });
}

async getUserProfile(): Promise<UserProfile | null> {
  const { value } = await Preferences.get({ key: 'userProfile' });
  return value ? JSON.parse(value) : null;
}
```

#### Verwendung
- **Benutzerprofil**: Name, Email, Organisator-Status
- **Dark Mode**: Theme-Einstellung
- **UUID**: User-Identifikation

---

<div style="page-break-after: always;"></div>

## 7. IMPLEMENTATION

### 7.1 CRUD-Operationen

#### Create (Erstellen)
- **Matches erstellen**: Organisatoren können neue Matches anlegen
- **Teilnehmer registrieren**: Benutzer melden sich für Matches an

```typescript
async createMatch(match: Match): Promise<Match | null>
async registerForMatch(matchId: number, userId: string): Promise<boolean>
```

#### Read (Lesen)
- **Alle Matches**: Übersicht aller verfügbaren Matches
- **Match-Details**: Detailansicht mit Teilnehmerliste
- **Meine Matches**: Persönliche Anmeldungen

```typescript
async getMatches(): Promise<Match[]>
async getMatch(id: number): Promise<Match | null>
async getMyMatches(userId: string): Promise<Match[]>
```

#### Update (Aktualisieren)
- **Match bearbeiten**: Organisator kann Match-Daten ändern
- **Profil aktualisieren**: Benutzerdaten ändern

```typescript
async updateMatch(id: number, match: Partial<Match>): Promise<Match | null>
```

#### Delete (Löschen)
- **Match löschen**: Organisator kann Match entfernen
- **Abmelden**: Benutzer kann Anmeldung stornieren

```typescript
async deleteMatch(id: number): Promise<boolean>
async unregisterFromMatch(matchId: number, userId: string): Promise<boolean>
```

### 7.2 Benutzer-Management
- **Lokales Profil**: Name, Email, Organisator-Status
- **UUID-System**: Eindeutige User-Identifikation
- **Offline-First**: Profildaten werden lokal gespeichert

```typescript
interface UserProfile {
  name: string;
  email: string;
  isOrganizer: boolean;
  userId: string; // Automatisch generierte UUID
}
```

### 7.3 Supabase Integration

```typescript
// supabase.service.ts
constructor() {
  this.supabase = createClient(
    environment.supabase.url,
    environment.supabase.key
  );
}

// CRUD Beispiel
async getMatches(): Promise<Match[]> {
  const { data, error } = await this.supabase
    .from('matches')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
  return data || [];
}
```

---

<div style="page-break-after: always;"></div>

## 8. TESTING & QUALITÄT

### 8.1 Manuelle Tests

#### Funktionstests
- ✅ Match erstellen mit allen Feldern
- ✅ GPS-Standort abrufen
- ✅ Kamera/Galerie Zugriff
- ✅ Für Match anmelden/abmelden
- ✅ Meine Matches anzeigen
- ✅ Dark Mode umschalten
- ✅ Form Validierung
- ✅ Offline-Speicherung (Profil)

#### Gerätetests
- **Emulator**: Android API 36 (Medium Phone)
- **Berechtigungen**: Kamera, Standort, Notifications
- **Performance**: Flüssige Navigation, keine Lags
- **Offline**: Profildaten bleiben nach Neustart

### 8.2 Error Handling
**Try-Catch Blöcke** in allen async Funktionen:
```typescript
try {
  const result = await this.supabaseService.createMatch(matchData);
  // Success Handling
} catch (error: any) {
  console.error('Error:', error);
  // User Feedback via Toast
  const toast = await this.toastController.create({
    message: `Fehler: ${error.message}`,
    color: 'danger'
  });
  await toast.present();
}
```

### 8.3 Console Logging
**Debugging-Unterstützung** in allen Services:
```typescript
console.log('Fetching matches for userId:', userId);
console.log('Position obtained:', coordinates);
console.error('Supabase Error:', error.message);
```

**Chrome DevTools** Integration für Live-Debugging

### 8.3 Projektergebnis

**Anforderungen erfüllt:**
- ✅ 4 Geräteschnittstellen (Kamera, GPS, Notifications, Storage)
- ✅ 5 Views (Matches, My Matches, Create Match, Match Detail, Profile)
- ✅ Vollständige CRUD-Operationen
- ✅ Supabase Backend mit RLS
- ✅ Professional UX/UI mit Dark Mode
- ✅ Offline-Funktionalität

**Repository:** https://github.com/emilioJordan/match-organiser-mobile  
**Status:** ✅ Production Ready

---

**Projekt abgeschlossen:** Dezember 2025
