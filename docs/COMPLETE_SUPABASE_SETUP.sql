-- ========================================
-- MATCH ORGANIZER - KOMPLETTES DATENBANK SETUP
-- ========================================
-- ANLEITUNG:
-- 1. Supabase Dashboard → SQL Editor → New Query
-- 2. Diesen GANZEN Code kopieren und einfügen
-- 3. "Run" klicken
-- 4. Fertig! ✅
-- ========================================

-- ========================================
-- SCHRITT 1: ALTE TABELLEN LÖSCHEN (falls vorhanden)
-- ========================================

-- Lösche Policies
DROP POLICY IF EXISTS "public_read_matches" ON matches;
DROP POLICY IF EXISTS "public_insert_matches" ON matches;
DROP POLICY IF EXISTS "public_update_matches" ON matches;
DROP POLICY IF EXISTS "public_delete_matches" ON matches;
DROP POLICY IF EXISTS "Matches sind öffentlich lesbar" ON matches;
DROP POLICY IF EXISTS "Jeder kann Matches erstellen" ON matches;
DROP POLICY IF EXISTS "Nur Ersteller kann Match bearbeiten" ON matches;
DROP POLICY IF EXISTS "Nur Ersteller kann Match löschen" ON matches;

DROP POLICY IF EXISTS "public_read_participants" ON participants;
DROP POLICY IF EXISTS "public_insert_participants" ON participants;
DROP POLICY IF EXISTS "public_update_participants" ON participants;
DROP POLICY IF EXISTS "public_delete_participants" ON participants;
DROP POLICY IF EXISTS "Teilnehmer sind öffentlich lesbar" ON participants;
DROP POLICY IF EXISTS "Jeder kann sich für Match anmelden" ON participants;
DROP POLICY IF EXISTS "User kann eigene Anmeldung ändern" ON participants;
DROP POLICY IF EXISTS "User kann eigene Anmeldung löschen" ON participants;

-- Lösche Tabellen (in richtiger Reihenfolge wegen Foreign Keys)
DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS matches CASCADE;


-- ========================================
-- SCHRITT 2: MATCHES TABELLE ERSTELLEN
-- ========================================

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
  created_by TEXT NOT NULL,  -- UUID als TEXT (keine Foreign Key Constraint!)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für bessere Performance
CREATE INDEX idx_matches_date ON matches(date);
CREATE INDEX idx_matches_created_by ON matches(created_by);


-- ========================================
-- SCHRITT 3: PARTICIPANTS TABELLE ERSTELLEN
-- ========================================

CREATE TABLE participants (
  id BIGSERIAL PRIMARY KEY,
  match_id BIGINT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,  -- UUID als TEXT
  status TEXT NOT NULL DEFAULT 'registered',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Verhindere Doppel-Anmeldungen
  UNIQUE(match_id, user_id)
);

-- Index für bessere Performance
CREATE INDEX idx_participants_match_id ON participants(match_id);
CREATE INDEX idx_participants_user_id ON participants(user_id);


-- ========================================
-- SCHRITT 4: ROW LEVEL SECURITY (RLS) AKTIVIEREN
-- ========================================

-- RLS für Matches aktivieren
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- RLS für Participants aktivieren
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;


-- ========================================
-- SCHRITT 5: RLS POLICIES FÜR MATCHES
-- ========================================

-- Jeder kann Matches lesen
CREATE POLICY "matches_select_policy"
ON matches
FOR SELECT
TO public
USING (true);

-- Jeder kann Matches erstellen
CREATE POLICY "matches_insert_policy"
ON matches
FOR INSERT
TO public
WITH CHECK (true);

-- Jeder kann Matches bearbeiten (für Entwicklung)
CREATE POLICY "matches_update_policy"
ON matches
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Jeder kann Matches löschen (für Entwicklung)
CREATE POLICY "matches_delete_policy"
ON matches
FOR DELETE
TO public
USING (true);


-- ========================================
-- SCHRITT 6: RLS POLICIES FÜR PARTICIPANTS
-- ========================================

-- Jeder kann Teilnehmer lesen
CREATE POLICY "participants_select_policy"
ON participants
FOR SELECT
TO public
USING (true);

-- Jeder kann sich anmelden
CREATE POLICY "participants_insert_policy"
ON participants
FOR INSERT
TO public
WITH CHECK (true);

-- Jeder kann Anmeldungen bearbeiten
CREATE POLICY "participants_update_policy"
ON participants
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Jeder kann Anmeldungen löschen
CREATE POLICY "participants_delete_policy"
ON participants
FOR DELETE
TO public
USING (true);


-- ========================================
-- SCHRITT 7: TEST-DATEN EINFÜGEN (Optional)
-- ========================================

-- Test-Match erstellen
INSERT INTO matches (
  title,
  description,
  date,
  time,
  location,
  max_participants,
  latitude,
  longitude,
  created_by
) VALUES (
  'Test Fussball Match',
  'Ein Test-Match zum Ausprobieren der App',
  CURRENT_DATE + INTERVAL '7 days',
  '18:00:00',
  'Sportplatz Zürich',
  12,
  47.3769,
  8.5417,
  'test-uuid-12345'
);

-- Test-Teilnehmer hinzufügen
INSERT INTO participants (
  match_id,
  user_id,
  status
) VALUES (
  1,  -- ID vom ersten Match
  'test-user-uuid-1',
  'registered'
);


-- ========================================
-- SCHRITT 8: VERIFIZIERUNG
-- ========================================

-- Zeige alle Tabellen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Zeige RLS Status
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('matches', 'participants');

-- Zeige alle Policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE tablename IN ('matches', 'participants')
ORDER BY tablename, policyname;

-- Zeige Matches
SELECT id, title, location, created_by, created_at
FROM matches
ORDER BY created_at DESC;

-- Zeige Participants
SELECT p.id, m.title as match_title, p.user_id, p.status
FROM participants p
JOIN matches m ON p.match_id = m.id
ORDER BY p.created_at DESC;


-- ========================================
-- FERTIG! ✅
-- ========================================

/*
ERFOLGSKRITERIEN:
- ✅ 2 Tabellen erstellt: matches, participants
- ✅ RLS aktiviert für beide Tabellen
- ✅ 8 Policies erstellt (4 pro Tabelle)
- ✅ 1 Test-Match erstellt
- ✅ 1 Test-Teilnehmer erstellt

NÄCHSTE SCHRITTE:
1. Prüfe ob Verifizierung erfolgreich war
2. Starte die App neu: npx cap run android
3. Gehe zu Profil → Speichern (UUID wird generiert)
4. Erstelle ein Match
5. Sollte jetzt funktionieren! 🎉

WICHTIG:
- created_by ist TEXT (keine Foreign Key Constraint mehr!)
- UUIDs werden in der App generiert
- Keine User-Tabelle nötig
- Perfekt für Entwicklung

TROUBLESHOOTING:
Falls Fehler auftreten:
1. Prüfe Verifizierung am Ende des Scripts
2. Stelle sicher, dass alle 8 Policies existieren
3. Prüfe ob RLS aktiviert ist (rowsecurity = true)
4. Stelle sicher, dass Test-Match erstellt wurde
*/
