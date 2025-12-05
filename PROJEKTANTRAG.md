# Projektantrag: Match Organizer

## Allgemeine Informationen

| **Projekt**           | Match Organizer - Mobile Hybrid App                          |
|-----------------------|--------------------------------------------------------------|
| **Modul**             | ÜK 335 - Mobile Applikation realisieren                      |
| **Lernender**         | [Ihr Name]                                                   |
| **Firma**             | [Ihre Firma]                                                 |
| **Betreuer**          | [Betreuer Name]                                              |
| **Datum**             | 4. Dezember 2025                                             |
| **Bearbeitungszeit**  | ca. 40-50 Stunden                                            |
| **Technologie**       | Ionic Framework 7, Angular 17, Capacitor 5, Supabase         |

---

## 1. Projektbeschreibung

### 1.1 Ausgangslage

In vielen Sportclubs, Freundesgruppen und Vereinen ist die Organisation von Matches (Fussball, Basketball, Volleyball etc.) oft chaotisch. WhatsApp-Gruppen werden überflutet, Excel-Listen sind schnell veraltet, und niemand hat den Überblick, wer sich an- oder abgemeldet hat.

### 1.2 Projektziel

Entwicklung einer **Mobile Hybrid App** (PWA + Android), die es ermöglicht:
- 🏟️ **Matches zu organisieren**: Organisatoren können Matches erstellen, bearbeiten und löschen
- 👥 **Teilnehmerverwaltung**: Spieler können sich unkompliziert an- und abmelden
- 📱 **Mobile-First**: Optimiert für Smartphones mit nativen Features
- 🔔 **Benachrichtigungen**: Push-Notifications bei wichtigen Ereignissen
- 📍 **Standortbasiert**: GPS-Integration für Match-Locations
- 📸 **Multimedial**: Fotos vom Match-Ort hochladen

### 1.3 Zielgruppe

- Sportvereine und Freizeitgruppen
- Hobbymannschaften ohne professionelle Verwaltung
- Organisatoren, die einfache digitale Tools suchen
- Spieler, die spontan an Matches teilnehmen möchten

---

## 2. Anforderungen (ÜK Modul 335)

### 2.1 Pflichtanforderungen

| Nr. | Anforderung | Umsetzung | Status |
|-----|-------------|-----------|--------|
| 1 | Ionic Framework | Ionic 7 mit Angular 17 | ✅ |
| 2 | Minimum 4 Views | 5 Views: Matches, My Matches, Create, Detail, Profile | ✅ |
| 3 | Supabase Integration | PostgreSQL DB mit Auth & Storage | ✅ |
| 4 | CRUD Operationen | Create, Read, Update, Delete für Matches & Participants | ✅ |
| 5 | Device Interface 1 | **Camera** - Fotos hochladen | ✅ |
| 6 | Device Interface 2 | **Geolocation** - GPS-Standort erfassen | ✅ |
| 7 | Device Interface 3 | **Local Notifications** - Erinnerungen | ✅ |
| 8 | Device Interface 4 | **Preferences** - Offline-Speicherung | ✅ |
| 9 | Custom Theming | Primary Blue (#1e40af) + Dark Mode | ✅ |
| 10 | App Icon & Splash | Custom Branding | ✅ |

### 2.2 Optionale Erweiterungen

- 🔍 **Suchfunktion**: Matches nach Titel, Location, Beschreibung filtern
- 🔄 **Pull-to-Refresh**: Aktualisierung der Match-Liste
- ⚡ **Reactive Forms**: Validierung bei Match-Erstellung
- 🎨 **Manual Dark Mode**: Toggle-Switch statt Auto-Detection
- 📊 **Participant Count**: Automatische Berechnung freier Plätze

---

## 3. User Stories

### US-01: Match-Übersicht anzeigen
**Als** Spieler  
**möchte ich** alle verfügbaren Matches sehen  
**damit** ich einen Überblick über kommende Spiele habe.

**Akzeptanzkriterien:**
- Liste zeigt: Titel, Datum, Location, freie Plätze
- Sortierung nach Datum (neueste zuerst)
- Leere Liste zeigt "Keine Matches verfügbar"

---

### US-02: Nach Matches suchen
**Als** Spieler  
**möchte ich** Matches nach Titel oder Ort suchen  
**damit** ich schnell relevante Spiele finde.

**Akzeptanzkriterien:**
- Suchfeld durchsucht Titel, Location und Beschreibung
- Echtzeit-Filterung während Eingabe
- Clear-Button zum Zurücksetzen

---

### US-03: Match erstellen
**Als** Organisator  
**möchte ich** ein neues Match erstellen  
**damit** Spieler sich anmelden können.

**Akzeptanzkriterien:**
- Pflichtfelder: Titel, Datum, Location, Max. Teilnehmer
- Optional: Beschreibung, Foto, GPS-Koordinaten
- Validierung: Datum in der Zukunft, Max. Teilnehmer > 0
- Erfolgsmeldung nach Speichern

---

### US-04: Foto vom Match-Ort hochladen
**Als** Organisator  
**möchte ich** ein Foto vom Spielfeld hochladen  
**damit** Spieler den Ort besser finden.

**Akzeptanzkriterien:**
- Auswahl: Kamera oder Galerie
- Vorschau vor dem Hochladen
- Automatischer Upload zu Supabase Storage
- Fehlermeldung bei Upload-Problemen

---

### US-05: GPS-Standort erfassen
**Als** Organisator  
**möchte ich** meinen aktuellen Standort als Match-Location speichern  
**damit** ich nicht manuell Koordinaten eingeben muss.

**Akzeptanzkriterien:**
- Button "Aktueller Standort"
- Berechtigungsabfrage für Standortzugriff
- Anzeige von Latitude/Longitude im Formular
- Fehlerbehandlung bei fehlender Berechtigung

---

### US-06: An Match anmelden
**Als** Spieler  
**möchte ich** mich für ein Match anmelden  
**damit** der Organisator weiss, dass ich teilnehme.

**Akzeptanzkriterien:**
- Button "Anmelden" nur wenn Plätze frei sind
- Bestätigung "Erfolgreich angemeldet"
- Automatische Aktualisierung der Teilnehmerzahl
- Notification-Planung für Erinnerung

---

### US-07: Von Match abmelden
**Als** Spieler  
**möchte ich** mich von einem Match abmelden  
**damit** mein Platz für andere frei wird.

**Akzeptanzkriterien:**
- Button "Abmelden" nur wenn bereits angemeldet
- Bestätigungsdialog "Wirklich abmelden?"
- Automatische Aktualisierung der Teilnehmerzahl
- Stornierung geplanter Notifications

---

### US-08: Match bearbeiten
**Als** Organisator  
**möchte ich** meine Matches bearbeiten oder löschen  
**damit** ich Änderungen vornehmen kann.

**Akzeptanzkriterien:**
- Edit/Delete-Buttons nur für eigene Matches
- Bearbeitung öffnet Formular mit Vorbelegung
- Löschung nach Bestätigungsdialog
- Erfolgsmeldung nach Aktion

---

### US-09: Dark Mode aktivieren
**Als** Benutzer  
**möchte ich** zwischen hellem und dunklem Design wechseln  
**damit** ich die App auch nachts angenehm nutzen kann.

**Akzeptanzkriterien:**
- Toggle-Switch im Profil
- Sofortige Anwendung ohne Neustart
- Persistierung der Einstellung
- Anpassung aller Farben (Primary, Secondary, Background)

---

### US-10: Meine Matches anzeigen
**Als** Spieler  
**möchte ich** nur Matches sehen, bei denen ich angemeldet bin  
**damit** ich meine Termine im Blick habe.

**Akzeptanzkriterien:**
- Separate Tab "My Matches"
- Filter: Matches mit user_id = aktueller User
- Sortierung nach Datum
- Direkte Navigation zu Match-Details

---

## 4. Storyboard / UI-Mockup

```
┌─────────────────────────────────────────────────────────┐
│                    MATCH ORGANIZER                      │
└─────────────────────────────────────────────────────────┘

┌─────────── 1. MATCHES (Liste) ────────────┐
│  🔍 [Suche nach Titel, Ort...]           │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ ⚽ Fussball am Dienstag             │ │
│  │ 📍 Sportplatz Zürich                │ │
│  │ 📅 10.12.2025 18:00                 │ │
│  │ 👥 8/12 Plätze belegt               │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ 🏀 Basketball Turnier               │ │
│  │ 📍 Halle Bern                       │ │
│  │ 📅 15.12.2025 16:00                 │ │
│  │ 👥 10/10 Plätze belegt (VOLL)       │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  [+ Neues Match]                         │
└───────────────────────────────────────────┘
        │ Tap auf Match
        ▼
┌─────────── 2. MATCH DETAILS ──────────────┐
│  ⚽ Fussball am Dienstag                  │
│  📍 Sportplatz Zürich (47.3769, 8.5417)  │
│  📅 10. Dezember 2025, 18:00 Uhr         │
│  👥 8/12 Teilnehmer                      │
│                                           │
│  📝 Beschreibung:                         │
│  "Lockeres Freundschaftsspiel, alle      │
│   Niveaus willkommen!"                   │
│                                           │
│  📸 [Foto vom Spielfeld]                 │
│                                           │
│  ✅ Teilnehmer:                           │
│    • Max Mustermann                      │
│    • Anna Schmidt                        │
│    • Tom Weber                           │
│    • ...                                 │
│                                           │
│  [✅ Anmelden] [❌ Abmelden]              │
│  [✏️ Bearbeiten] [🗑️ Löschen]            │
└───────────────────────────────────────────┘


┌─────────── 3. CREATE MATCH ───────────────┐
│  Neues Match erstellen                    │
│                                           │
│  Titel *                                  │
│  [Fussball am Dienstag____________]      │
│                                           │
│  Datum & Zeit *                           │
│  [10.12.2025] [18:00]                    │
│                                           │
│  Location *                               │
│  [Sportplatz Zürich_______________]      │
│  [📍 Aktueller Standort]                 │
│                                           │
│  Max. Teilnehmer *                        │
│  [12___]                                  │
│                                           │
│  Beschreibung                             │
│  [Lockeres Spiel für alle Niveaus...]   │
│                                           │
│  Foto                                     │
│  [📷 Foto aufnehmen] [🖼️ Aus Galerie]    │
│  [Vorschau: spielfeld.jpg]               │
│                                           │
│  [Speichern] [Abbrechen]                 │
└───────────────────────────────────────────┘


┌─────────── 4. MY MATCHES ─────────────────┐
│  Meine angemeldeten Matches               │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ ⚽ Fussball am Dienstag             │ │
│  │ 📅 10.12.2025 18:00                 │ │
│  │ 📍 Sportplatz Zürich                │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ ⚽ Donnerstag-Kick                   │ │
│  │ 📅 12.12.2025 19:00                 │ │
│  │ 📍 Arena Basel                      │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  [Noch keine Anmeldungen]                │
└───────────────────────────────────────────┘


┌─────────── 5. PROFILE ────────────────────┐
│  Profil                                   │
│                                           │
│  👤 User ID: user-abc-123                │
│                                           │
│  ⚙️ Einstellungen                         │
│                                           │
│  🌙 Dark Mode                             │
│  [ ━━━━●══ ]  (Toggle Switch)            │
│                                           │
│  📊 Statistiken                           │
│  • Angemeldete Matches: 2                │
│  • Erstellte Matches: 5                  │
│                                           │
│  🔔 Benachrichtigungen                    │
│  [x] Match-Erinnerungen                  │
│  [x] Neue Anmeldungen (als Organisator)  │
│                                           │
│  📱 App-Infos                             │
│  Version: 1.0.0                          │
│  Framework: Ionic 7 + Angular 17         │
└───────────────────────────────────────────┘


┌─────────── BOTTOM TABS ───────────────────┐
│  [🏟️ Matches] [⚡ My] [➕ Create] [👤 Profile] │
└───────────────────────────────────────────┘
```

---

## 5. Datenbank-Modell

### 5.1 ER-Diagramm (Entity-Relationship)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE BACKEND                                 │
│                                                                          │
│  ┌───────────────────────────┐         ┌───────────────────────────┐   │
│  │    MATCHES (Tabelle)      │         │  PARTICIPANTS (Tabelle)   │   │
│  ├───────────────────────────┤         ├───────────────────────────┤   │
│  │ 🔑 id (PK, UUID)          │◄────────┤ 🔑 id (PK, UUID)          │   │
│  │ 📝 title (TEXT)           │       1:N│ 🔗 match_id (FK, UUID)    │   │
│  │ 📄 description (TEXT)     │         │ 👤 user_id (TEXT)         │   │
│  │ 📅 date (TIMESTAMP)       │         │ 👤 user_name (TEXT)       │   │
│  │ 📍 location (TEXT)        │         │ ⏰ registered_at          │   │
│  │ 🌍 latitude (FLOAT)       │         └───────────────────────────┘   │
│  │ 🌍 longitude (FLOAT)      │                                         │
│  │ 👥 max_participants (INT) │         🔒 RLS Policy:                  │
│  │ 🖼️ image_url (TEXT)       │         • INSERT: Alle                  │
│  │ 👤 organizer_id (TEXT)    │         • DELETE: Nur eigene            │
│  │ ⏰ created_at (TIMESTAMP) │         • SELECT: Alle                  │
│  │ ⏰ updated_at (TIMESTAMP) │                                         │
│  └───────────────────────────┘                                         │
│                                                                          │
│  🔒 RLS Policy:                                                         │
│  • SELECT: Alle Matches lesbar                                         │
│  • INSERT: Alle können erstellen                                       │
│  • UPDATE: Nur organizer_id = aktueller User                           │
│  • DELETE: Nur organizer_id = aktueller User                           │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │           SUPABASE STORAGE (match-images Bucket)              │     │
│  ├───────────────────────────────────────────────────────────────┤     │
│  │  📁 Bucket: "match-images"                                    │     │
│  │  🔓 Public: true                                               │     │
│  │  📤 Allowed: image/jpeg, image/png, image/webp                │     │
│  │  📏 Max Size: 5 MB                                             │     │
│  │                                                                 │     │
│  │  Beispiel-URL:                                                 │     │
│  │  https://[project].supabase.co/storage/v1/object/             │     │
│  │         public/match-images/abc123.jpg                         │     │
│  └───────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────────┘
```

**Entitäten:**
- **MATCHES**: Speichert alle Matches mit Details (Titel, Datum, Location, GPS)
- **PARTICIPANTS**: Speichert Anmeldungen (welcher User bei welchem Match)
- **STORAGE**: Speichert hochgeladene Fotos vom Match-Ort

**Relationen:**
- Ein Match kann viele Teilnehmer haben (1:N)
- Ein Teilnehmer ist immer einem Match zugeordnet
- Beim Löschen eines Matches werden alle Teilnehmer automatisch gelöscht (CASCADE)
- Jedes Match kann ein Foto haben (0:1 Relation zu Storage)

**Constraints:**
- `UNIQUE(match_id, user_id)`: Ein User kann sich nur einmal pro Match anmelden
- `CHECK (max_participants > 0)`: Mindestens 1 Teilnehmer erforderlich
- `ON DELETE CASCADE`: Beim Löschen eines Matches werden Teilnehmer mitgelöscht

### 5.2 SQL Schema (Supabase Setup)

#### Schritt 1: Tabellen erstellen

```sql
-- UUID Extension aktivieren (falls nicht vorhanden)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabelle: matches
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    max_participants INTEGER NOT NULL CHECK (max_participants > 0),
    image_url TEXT,
    organizer_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabelle: participants
CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    registered_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(match_id, user_id)
);

-- Indizes für Performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_organizer ON matches(organizer_id);
CREATE INDEX idx_participants_match ON participants(match_id);
CREATE INDEX idx_participants_user ON participants(user_id);
```

#### Schritt 2: Row Level Security (RLS) Policies

```sql
-- RLS aktivieren
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- MATCHES Policies
-- Policy: Alle können Matches lesen
CREATE POLICY "Matches sind öffentlich lesbar"
ON matches FOR SELECT
USING (true);

-- Policy: Alle können Matches erstellen
CREATE POLICY "Jeder kann Matches erstellen"
ON matches FOR INSERT
WITH CHECK (true);

-- Policy: Nur Organisator kann eigene Matches bearbeiten
CREATE POLICY "Organisator kann eigene Matches bearbeiten"
ON matches FOR UPDATE
USING (organizer_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: Nur Organisator kann eigene Matches löschen
CREATE POLICY "Organisator kann eigene Matches löschen"
ON matches FOR DELETE
USING (organizer_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- PARTICIPANTS Policies
-- Policy: Alle können Teilnehmer sehen
CREATE POLICY "Teilnehmer sind öffentlich lesbar"
ON participants FOR SELECT
USING (true);

-- Policy: Alle können sich registrieren
CREATE POLICY "Teilnehmer können sich registrieren"
ON participants FOR INSERT
WITH CHECK (true);

-- Policy: Alle können eigene Registrierungen löschen
CREATE POLICY "Teilnehmer können sich abmelden"
ON participants FOR DELETE
USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');
```

#### Schritt 3: Storage Bucket für Bilder erstellen

**In Supabase Dashboard → Storage:**

1. **Neuen Bucket erstellen:**
   - Name: `match-images`
   - Public: ✅ Yes (damit Bilder ohne Auth abrufbar sind)

2. **Bucket Policies:**
```sql
-- Policy: Alle können Bilder lesen
CREATE POLICY "Bilder sind öffentlich lesbar"
ON storage.objects FOR SELECT
USING (bucket_id = 'match-images');

-- Policy: Alle können Bilder hochladen
CREATE POLICY "Jeder kann Bilder hochladen"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'match-images');

-- Policy: Nur Uploader kann eigene Bilder löschen
CREATE POLICY "Uploader kann eigene Bilder löschen"
ON storage.objects FOR DELETE
USING (bucket_id = 'match-images' AND auth.uid()::text = owner);
```

#### Schritt 4: Test-Daten einfügen (optional)

```sql
-- Test-Match erstellen
INSERT INTO matches (title, description, date, location, max_participants, organizer_id)
VALUES 
('Fussball am Dienstag', 'Lockeres Freundschaftsspiel für alle Niveaus', 
 '2025-12-10 18:00:00', 'Sportplatz Zürich', 12, 'test-user-123');

-- Test-Teilnehmer hinzufügen
INSERT INTO participants (match_id, user_id, user_name)
SELECT id, 'user-456', 'Max Mustermann' FROM matches WHERE title = 'Fussball am Dienstag';
```

#### Schritt 5: Environment Variables konfigurieren

Nach Setup in Supabase Dashboard → Settings → API:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  supabase: {
    url: 'https://YOUR-PROJECT-ID.supabase.co',
    key: 'YOUR-ANON-PUBLIC-KEY'
  }
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  supabase: {
    url: 'https://YOUR-PROJECT-ID.supabase.co',
    key: 'YOUR-ANON-PUBLIC-KEY'
  }
};
```

### 5.3 Supabase API Endpoints (automatisch generiert)

Nach dem Setup sind folgende REST-Endpunkte verfügbar:

```typescript
// Matches abrufen
GET https://YOUR-PROJECT-ID.supabase.co/rest/v1/matches
Headers: { apikey: 'YOUR-ANON-KEY', Authorization: 'Bearer YOUR-ANON-KEY' }

// Match erstellen
POST https://YOUR-PROJECT-ID.supabase.co/rest/v1/matches
Body: { title, description, date, location, max_participants, organizer_id }

// Match aktualisieren
PATCH https://YOUR-PROJECT-ID.supabase.co/rest/v1/matches?id=eq.UUID

// Match löschen
DELETE https://YOUR-PROJECT-ID.supabase.co/rest/v1/matches?id=eq.UUID

// Bild hochladen
POST https://YOUR-PROJECT-ID.supabase.co/storage/v1/object/match-images/FILENAME
```

**Im Code wird das über den Supabase-Client abstrahiert:**

```typescript
// src/app/services/supabase.service.ts
async getMatches() {
  const { data, error } = await this.supabase
    .from('matches')
    .select('*, participants(*)') // Join mit participants
    .order('date', { ascending: true });
  return data;
}
```

---

## 6. Technische Umsetzung

### 6.1 Architektur

```
┌─────────────────────────────────────────────┐
│              FRONTEND (Angular)             │
│  ┌─────────────────────────────────────┐   │
│  │         Pages (5 Views)             │   │
│  │  - matches, my-matches, create,     │   │
│  │    match-detail, profile            │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │        Services Layer               │   │
│  │  - SupabaseService (CRUD)           │   │
│  │  - CameraService                    │   │
│  │  - GeolocationService               │   │
│  │  - NotificationService              │   │
│  │  - StorageService                   │   │
│  │  - ThemeService                     │   │
│  └──────────────┬──────────────────────┘   │
│                 │                           │
│  ┌──────────────▼──────────────────────┐   │
│  │      Capacitor Plugins              │   │
│  │  @capacitor/camera                  │   │
│  │  @capacitor/geolocation             │   │
│  │  @capacitor/local-notifications     │   │
│  │  @capacitor/preferences             │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│        BACKEND (Supabase)                   │
│  ┌─────────────────────────────────────┐   │
│  │    PostgreSQL Database              │   │
│  │    - matches table                  │   │
│  │    - participants table             │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │    Supabase Storage                 │   │
│  │    - match-images bucket            │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │    Supabase Auth                    │   │
│  │    - User Management (optional)     │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 6.2 Technologie-Stack

| Komponente | Technologie | Version |
|------------|-------------|---------|
| Framework | Ionic Framework | 7.5.0 |
| Frontend | Angular | 17.0.0 |
| Native Bridge | Capacitor | 5.x |
| Backend | Supabase | Cloud |
| Datenbank | PostgreSQL | 15+ |
| Sprache | TypeScript | 5.2+ |
| Styling | SCSS + Ionic CSS Variables | - |
| State Management | Angular Services (kein NgRx) | - |
| Forms | Reactive Forms | - |
| Build Tool | Angular CLI + Capacitor CLI | - |

### 6.3 Capacitor Plugins

```json
{
  "@capacitor/camera": "^5.0.0",
  "@capacitor/geolocation": "^5.0.0",
  "@capacitor/local-notifications": "^5.0.0",
  "@capacitor/preferences": "^5.0.0"
}
```

### 6.4 Projektstruktur

```
MatchOrganiser/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── matches/           # Liste aller Matches
│   │   │   ├── my-matches/        # Meine Anmeldungen
│   │   │   ├── create-match/      # Match erstellen
│   │   │   ├── match-detail/      # Match-Details
│   │   │   └── profile/           # Profil & Settings
│   │   ├── services/
│   │   │   ├── supabase.service.ts
│   │   │   ├── camera.service.ts
│   │   │   ├── geolocation.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── storage.service.ts
│   │   │   └── theme.service.ts
│   │   ├── tabs/
│   │   │   ├── tabs.page.ts
│   │   │   └── tabs.page.html
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── theme/
│   │   └── variables.scss         # Custom Theming
│   ├── assets/
│   │   ├── icon/                  # App Icon
│   │   └── splash/                # Splashscreen
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── index.html
├── android/                       # Android Platform
├── capacitor.config.ts
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 7. Zeitplan

### 7.1 Phasen-Übersicht

| Phase | Aufgabe | Dauer | Status |
|-------|---------|-------|--------|
| 1 | Projektplanung & Anforderungsanalyse | 4h | ✅ |
| 2 | Ionic-Projekt Setup & Konfiguration | 3h | ✅ |
| 3 | Supabase Backend Setup (DB + Storage) | 2h | ✅ |
| 4 | Services entwickeln (6 Services) | 6h | ✅ |
| 5 | Pages/Views implementieren (5 Views) | 12h | ✅ |
| 6 | Styling & Theming (Dark Mode) | 3h | ✅ |
| 7 | Capacitor Plugins integrieren | 4h | ✅ |
| 8 | Testing (Browser + Android Emulator) | 4h | ⏳ |
| 9 | APK Build & Finale Anpassungen | 3h | ⏳ |
| 10 | Dokumentation & Präsentation | 4h | ✅ |
| **TOTAL** | | **45h** | **80%** |

### 7.2 Detaillierter Zeitplan

#### Woche 1: Setup & Backend (9h)
- **Tag 1-2**: Projektplanung, User Stories, Datenbank-Design
- **Tag 3**: Ionic-Projekt erstellen, Dependencies installieren
- **Tag 4**: Supabase-Account, Datenbank-Tabellen, Storage-Bucket

#### Woche 2: Services & Core Logic (10h)
- **Tag 5**: SupabaseService mit CRUD-Operationen
- **Tag 6**: CameraService, GeolocationService
- **Tag 7**: NotificationService, StorageService, ThemeService

#### Woche 3: UI/UX Implementation (15h)
- **Tag 8-9**: Matches-Liste, My-Matches, Tab-Navigation
- **Tag 10-11**: Create-Match-Formular, Validierung
- **Tag 12-13**: Match-Detail, Profile, Dark-Mode-Toggle

#### Woche 4: Testing & Finalisierung (11h)
- **Tag 14**: Browser-Testing, Bug-Fixes
- **Tag 15**: Android-Emulator, APK-Build
- **Tag 16**: Dokumentation, README, PROJEKTANTRAG

---

## 8. Risikomanagement

| Risiko | Wahrscheinlichkeit | Auswirkung | Massnahme |
|--------|-------------------|------------|-----------|
| Supabase-Konfiguration fehlerhaft | Mittel | Hoch | Ausführliche Anleitung in SETUP.md, Test-Credentials |
| Android Emulator startet nicht | Mittel | Mittel | EMULATOR-VSCODE.md mit Troubleshooting, Browser als Fallback |
| Capacitor Plugins nicht kompatibel | Gering | Hoch | Getestete Versionen (5.x), Web-Fallbacks implementiert |
| Zeitüberschreitung | Mittel | Mittel | MVP-Ansatz, optionale Features abgrenzbar |
| Build-Fehler bei APK-Erstellung | Mittel | Mittel | Detaillierte Build-Anleitung, Gradle-Konfiguration dokumentiert |
| Dark Mode nicht korrekt | Gering | Gering | Alle CSS-Variablen in variables.scss zentral definiert |

---

## 9. Testing-Strategie

### 9.1 Test-Umgebungen

1. **Browser (Chrome DevTools)**
   - Entwicklung: 90% der Zeit
   - Device-Emulation für Responsive-Testing
   - Ionic serve mit Live-Reload

2. **Android Emulator**
   - Native Features testen (Camera, GPS, Notifications)
   - Performance-Tests
   - APK-Installation

3. **Physisches Android-Gerät** (optional)
   - Finale Abnahme
   - Real-World GPS-Testing

### 9.2 Test-Cases

| Test-ID | Beschreibung | Erwartetes Ergebnis |
|---------|--------------|---------------------|
| T01 | Match-Liste lädt beim Start | Alle Matches aus Supabase werden angezeigt |
| T02 | Suchfunktion filtert Matches | Nur Matches mit Suchbegriff sichtbar |
| T03 | Match erstellen mit Foto | Match wird in DB gespeichert, Foto in Storage |
| T04 | GPS-Standort erfassen | Latitude/Longitude werden ins Formular eingetragen |
| T05 | An vollem Match anmelden | Button "Anmelden" ist disabled, Meldung "Voll" |
| T06 | Von Match abmelden | Confirmation-Dialog, dann Abmeldung erfolgreich |
| T07 | Dark Mode aktivieren | Alle Farben ändern sich sofort, Einstellung bleibt |
| T08 | Match bearbeiten (als Organisator) | Edit-Buttons sichtbar, Änderungen gespeichert |
| T09 | Match löschen (als fremder User) | Delete-Button nicht sichtbar |
| T10 | Notification planen | LocalNotification wird für Match-Datum erstellt |

---

## 10. Abnahmekriterien

### 10.1 Funktionale Anforderungen

- ✅ Alle 10 User Stories implementiert
- ✅ CRUD-Operationen für Matches funktionieren
- ✅ 4+ Device-Interfaces integriert und getestet
- ✅ Dark Mode funktioniert und persistiert
- ✅ App läuft im Browser und auf Android

### 10.2 Nicht-Funktionale Anforderungen

- ✅ Code ist strukturiert und kommentiert
- ✅ TypeScript ohne Compile-Fehler
- ✅ Responsive Design (Mobile-First)
- ✅ Ladezeiten < 3 Sekunden
- ✅ Keine bekannten kritischen Bugs

### 10.3 Dokumentation

- ✅ README.md mit Projektübersicht
- ✅ SETUP.md mit Installationsanleitung
- ✅ QUICK_REFERENCE.md mit Command-Referenz
- ✅ PROJECT_STATUS.md mit Fortschrittstracking
- ✅ EMULATOR-VSCODE.md für Android-Entwicklung
- ✅ PROJEKTANTRAG.md (dieses Dokument)

### 10.4 Deliverables

1. ✅ **Source Code** - Vollständiger Code im Repository
2. ⏳ **APK-Datei** - Installierbare Android-App
3. ✅ **Dokumentation** - Alle MD-Dateien
4. ⏳ **Präsentation** - Slides für ÜK-Abgabe (optional)

---

## 11. Lessons Learned & Reflexion

### 11.1 Was lief gut?

- **Ionic Framework**: Sehr schnelle Entwicklung durch vorgefertigte Komponenten
- **Supabase**: Einfache Backend-Integration, kein eigener Server nötig
- **Capacitor**: Moderne Alternative zu Cordova, bessere TypeScript-Unterstützung
- **Reactive Forms**: Validierung out-of-the-box, klare Fehlerbehandlung
- **VS Code Integration**: Tasks + Keybindings = effizienter Workflow

### 11.2 Herausforderungen

- **Android SDK Setup**: Pfad-Konfiguration unter Windows manchmal tricky
- **Supabase RLS Policies**: Row Level Security Syntax gewöhnungsbedürftig
- **Dark Mode**: Alle Ionic-Komponenten manuell anpassen für konsistentes Design
- **Type Safety**: Supabase-Client gibt `any` zurück, manuelle Interface-Definition nötig

### 11.3 Verbesserungspotenzial

- **Authentifizierung**: Aktuell nur Mock-User-IDs, echtes Supabase Auth integrieren
- **Unit Tests**: Jasmine/Karma-Setup vorhanden, aber keine Tests geschrieben
- **Offline-Support**: Service Workers für PWA-Offline-Funktionalität
- **Real-time Updates**: Supabase Realtime für Live-Teilnehmer-Updates

---

## 12. Referenzen & Quellen

### 12.1 Offizielle Dokumentationen

- **Ionic Framework**: https://ionicframework.com/docs
- **Angular**: https://angular.io/docs
- **Capacitor**: https://capacitorjs.com/docs
- **Supabase**: https://supabase.com/docs

### 12.2 Tutorials & Guides

- Ionic + Angular Tutorial: https://ionicframework.com/docs/angular/your-first-app
- Supabase JavaScript Client: https://supabase.com/docs/reference/javascript
- Capacitor Camera Plugin: https://capacitorjs.com/docs/apis/camera
- Android Studio Emulator Setup: https://developer.android.com/studio/run/emulator

### 12.3 Community & Support

- Ionic Forum: https://forum.ionicframework.com
- Stack Overflow: Tags `ionic-framework`, `capacitor`, `supabase`
- GitHub Issues: Für Plugin-spezifische Probleme

---

## 13. Unterschriften

### Lernender

Hiermit bestätige ich, dass ich den Projektantrag gelesen habe und die Anforderungen verstanden habe.

**Name:** ___________________________  
**Datum:** ___________________________  
**Unterschrift:** ___________________________

---

### Betreuer / Berufsbildner

Hiermit bestätige ich, dass ich den Projektantrag gelesen und genehmigt habe.

**Name:** ___________________________  
**Datum:** ___________________________  
**Unterschrift:** ___________________________

---

### ÜK-Instruktor

Hiermit bestätige ich, dass das Projekt die Anforderungen von ÜK Modul 335 erfüllt.

**Name:** ___________________________  
**Datum:** ___________________________  
**Unterschrift:** ___________________________

---

## Anhang

### A. Glossar

| Begriff | Bedeutung |
|---------|-----------|
| **APK** | Android Package - Installationsdatei für Android-Apps |
| **Capacitor** | Native Bridge für Web-Apps, Nachfolger von Cordova |
| **CRUD** | Create, Read, Update, Delete - Basis-Datenbankoperationen |
| **Hybrid App** | App die Web-Technologien nutzt, aber als native App läuft |
| **Ionic** | Framework für mobile Apps mit Web-Technologien |
| **PWA** | Progressive Web App - Web-App mit App-Funktionen |
| **RLS** | Row Level Security - Datenbankrechte auf Zeilen-Ebene |
| **Supabase** | Open-Source Firebase Alternative (Backend-as-a-Service) |

### B. Checkliste für Abgabe

- [ ] Repository auf GitHub/GitLab veröffentlicht
- [ ] README.md enthält Installation Guide
- [ ] Supabase-Setup dokumentiert
- [ ] APK-Datei erstellt (android/app/build/outputs/apk/debug/)
- [ ] Alle 10 User Stories getestet
- [ ] Screenshots von allen 5 Views erstellt
- [ ] Dark Mode demonstriert
- [ ] Device-Features gefilmt (Camera, GPS, Notifications)
- [ ] Projektantrag (dieses Dokument) ausgefüllt
- [ ] Unterschriften eingeholt

---

**Ende des Projektantrags**

*Viel Erfolg beim ÜK Modul 335! 🚀*
