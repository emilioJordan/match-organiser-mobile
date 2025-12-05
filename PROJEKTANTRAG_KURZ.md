# Projektantrag: Match Organizer
**ÜK Modul 335 - Mobile Applikation realisieren**

---

## 1. Projektübersicht

### Ausgangslage
Sport-Matches in Freundesgruppen werden oft chaotisch über WhatsApp organisiert. Niemand hat Überblick über An-/Abmeldungen.

### Projektziel
Mobile Hybrid App (PWA + Android) zur Organisation von Sport-Matches mit:
- ⚽ **CRUD für Matches**: Erstellen, Bearbeiten, Löschen
- 👥 **Teilnehmerverwaltung**: An-/Abmeldungen
- 📱 **Native Features**: Kamera, GPS, Push-Notifications, Offline-Storage
- 🗄️ **Supabase Backend**: PostgreSQL + Storage

---

## 2. Anforderungen ÜK 335

| Nr. | Anforderung | Umsetzung | Status |
|-----|-------------|-----------|--------|
| 1 | Ionic Framework | Ionic 7 + Angular 17 | ✅ |
| 2 | Min. 4 Views | 5 Pages: Matches, My Matches, Create, Detail, Profile | ✅ |
| 3 | Supabase | PostgreSQL DB + Storage | ✅ |
| 4 | CRUD | Create, Read, Update, Delete (Matches + Participants) | ✅ |
| 5-8 | Device APIs | Camera, GPS, Notifications, Preferences | ✅ |
| 9 | Theming | Custom Colors + Dark Mode | ✅ |
| 10 | Branding | App Icon + Splashscreen | ✅ |

---

## 3. User Stories (Auswahl)

**US-01: Match-Liste** - Spieler sehen alle Matches mit Datum, Ort, freien Plätzen, Suchfunktion

**US-02: Match erstellen** - Organisator erstellt Match mit Foto (Kamera) und GPS-Standort

**US-03: An-/Abmelden** - Spieler melden sich an (mit Push-Notification) oder ab (Bestätigungsdialog)

**US-04: Dark Mode** - Benutzer wechselt zwischen hellem/dunklem Design (persistiert)

**US-05: Eigene Matches** - Separate Ansicht für Matches bei denen User angemeldet ist

---

## 4. Datenbank-Modell

### Supabase Schema

![ER-Diagramm](docs/supabase-schema.png)

**Tabellen:**
- **matches**: id, title, description, date, time, location, latitude, longitude, max_participants, image_url, created_by, created_at
- **participants**: id, match_id (FK), user_id, status, created_at
- **Storage**: `match-images` Bucket (öffentlich, 5MB Limit)

**Relationen:**
- 1 Match → N Participants (CASCADE DELETE)
- UNIQUE(match_id, user_id)

### SQL Schema (gekürzt)

```sql
-- Matches Table
CREATE TABLE matches (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Participants Table
CREATE TABLE participants (
  id BIGSERIAL PRIMARY KEY,
  match_id BIGINT REFERENCES matches(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(match_id, user_id)
);

-- Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Policies: SELECT public, INSERT/UPDATE/DELETE nur eigene
CREATE POLICY "matches_select" ON matches FOR SELECT USING (true);
CREATE POLICY "matches_insert" ON matches FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "participants_insert" ON participants FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 5. Technische Umsetzung

**Stack:**
- Ionic 7 + Angular 17 + Capacitor 5
- Supabase (PostgreSQL + Storage)
- TypeScript 5.2

**Services:**
- `SupabaseService` - CRUD-Operationen
- `CameraService` - Foto-Upload (@capacitor/camera)
- `GeolocationService` - GPS (@capacitor/geolocation)
- `NotificationService` - Push (@capacitor/local-notifications)
- `StorageService` - Offline (@capacitor/preferences)
- `ThemeService` - Dark Mode

**Projektstruktur:**
```
src/app/
├── pages/         # 5 Views
├── services/      # 6 Services
├── tabs/          # Tab-Navigation
└── theme/         # Custom Theming
```

---

## 6. Zeitplan & Status

| Phase | Aufgabe | Dauer | Status |
|-------|---------|-------|--------|
| 1 | Projektplanung & DB-Design | 4h | ✅ |
| 2 | Ionic Setup & Supabase Config | 5h | ✅ |
| 3 | Services (CRUD + Device APIs) | 6h | ✅ |
| 4 | Pages/Views (5 Views) | 12h | ✅ |
| 5 | Theming & Dark Mode | 3h | ✅ |
| 6 | Testing (Browser + Emulator) | 4h | ⏳ |
| 7 | APK Build & Dokumentation | 4h | ⏳ |
| **TOTAL** | | **38h** | **80%** |

---

## 7. Testing

**Umgebungen:** Chrome DevTools, Android Emulator (API 36), Physisches Gerät (optional)

**Kritische Tests:**
- T01: Match-Liste lädt aus Supabase ✅
- T02: Match erstellen mit Foto + GPS ✅
- T03: An-/Abmeldung mit Notifications ⏳
- T04: Dark Mode Toggle persistiert ✅
- T05: RLS Policies (nur eigene Matches bearbeiten) ⏳

---

## 8. Lessons Learned

**Positiv:**
- Ionic = sehr schnelle UI-Entwicklung
- Supabase = einfache Backend-Integration
- Capacitor = moderne Alternative zu Cordova

**Herausforderungen:**
- Supabase RLS Policies Syntax gewöhnungsbedürftig
- Android SDK Pfad-Konfiguration unter Windows

**Verbesserungen:**
- Supabase Auth aktivieren (aktuell Mock-User-IDs)
- Unit Tests schreiben (Jasmine/Karma vorhanden)

---

## 9. Abnahmekriterien

✅ **Funktional:**
- Alle 5 User Stories implementiert
- CRUD-Operationen funktionieren
- 4 Device-APIs integriert

✅ **Technisch:**
- TypeScript ohne Compile-Fehler
- Ionic 7 + Angular 17 + Supabase

✅ **Dokumentation:**
- README.md, SETUP.md, QUICK_REFERENCE.md

⏳ **Deliverables:**
- Source Code (GitHub: emilioJordan/match-organiser-mobile)
- APK-Datei

---

## 10. Referenzen

- Ionic: https://ionicframework.com/docs
- Supabase: https://supabase.com/docs
- Capacitor: https://capacitorjs.com/docs

---

**Unterschriften**

**Lernender:** ___________________________  **Datum:** ___________________________

**Betreuer:** ___________________________  **Datum:** ___________________________

**ÜK-Instruktor:** ___________________________  **Datum:** ___________________________

---

**Ende des Projektantrags**
