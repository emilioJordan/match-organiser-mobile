-- ========================================
-- SUPABASE ROW LEVEL SECURITY POLICIES
-- Match Organizer App
-- ========================================

-- WICHTIG: Führe diese SQL-Befehle in Supabase SQL Editor aus
-- Dashboard → SQL Editor → New Query → Code einfügen → Run


-- ========================================
-- 1. MATCHES TABLE - RLS POLICIES
-- ========================================

-- RLS aktivieren (falls nicht schon aktiv)
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann Matches lesen (SELECT)
CREATE POLICY "Matches sind öffentlich lesbar"
ON matches
FOR SELECT
TO public
USING (true);

-- Policy: Jeder kann Matches erstellen (INSERT)
CREATE POLICY "Jeder kann Matches erstellen"
ON matches
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Nur der Ersteller kann sein Match bearbeiten (UPDATE)
CREATE POLICY "Nur Ersteller kann Match bearbeiten"
ON matches
FOR UPDATE
TO public
USING (true)  -- Temporär: Jeder kann updaten (für Entwicklung)
WITH CHECK (true);

-- Policy: Nur der Ersteller kann sein Match löschen (DELETE)
CREATE POLICY "Nur Ersteller kann Match löschen"
ON matches
FOR DELETE
TO public
USING (true);  -- Temporär: Jeder kann löschen (für Entwicklung)


-- ========================================
-- 2. PARTICIPANTS TABLE - RLS POLICIES
-- ========================================

-- RLS aktivieren
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann Teilnehmer lesen
CREATE POLICY "Teilnehmer sind öffentlich lesbar"
ON participants
FOR SELECT
TO public
USING (true);

-- Policy: Jeder kann sich anmelden
CREATE POLICY "Jeder kann sich für Match anmelden"
ON participants
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: User kann seine eigene Anmeldung ändern
CREATE POLICY "User kann eigene Anmeldung ändern"
ON participants
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Policy: User kann seine eigene Anmeldung löschen
CREATE POLICY "User kann eigene Anmeldung löschen"
ON participants
FOR DELETE
TO public
USING (true);


-- ========================================
-- VERIFIZIERUNG
-- ========================================

-- Prüfe ob RLS aktiviert ist:
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('matches', 'participants');

-- Zeige alle Policies:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('matches', 'participants');


-- ========================================
-- OPTIONAL: POLICIES LÖSCHEN (bei Problemen)
-- ========================================

-- Alle Policies für matches löschen:
-- DROP POLICY IF EXISTS "Matches sind öffentlich lesbar" ON matches;
-- DROP POLICY IF EXISTS "Jeder kann Matches erstellen" ON matches;
-- DROP POLICY IF EXISTS "Nur Ersteller kann Match bearbeiten" ON matches;
-- DROP POLICY IF EXISTS "Nur Ersteller kann Match löschen" ON matches;

-- Alle Policies für participants löschen:
-- DROP POLICY IF EXISTS "Teilnehmer sind öffentlich lesbar" ON participants;
-- DROP POLICY IF EXISTS "Jeder kann sich für Match anmelden" ON participants;
-- DROP POLICY IF EXISTS "User kann eigene Anmeldung ändern" ON participants;
-- DROP POLICY IF EXISTS "User kann eigene Anmeldung löschen" ON participants;

-- RLS deaktivieren (nur für Tests):
-- ALTER TABLE matches DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE participants DISABLE ROW LEVEL SECURITY;


-- ========================================
-- NOTES / WICHTIGE HINWEISE
-- ========================================

/*
AKTUELLE KONFIGURATION:
- Sehr permissive Policies für Entwicklung
- Jeder kann alles machen (public access)
- Gut für Testing und Entwicklung
- NICHT für Produktion!

FÜR PRODUKTION (später):
- Auth.uid() verwenden statt 'true'
- Policies basierend auf created_by einschränken
- Beispiel:
  USING (auth.uid()::text = created_by)

WARUM SO OFFEN?
- Keine echte User-Authentifizierung implementiert
- UUID wird lokal generiert
- Für Entwicklung/Testing ausreichend

SICHERHEIT VERBESSERN (Zukunft):
1. Supabase Auth implementieren
2. created_by mit auth.uid() verknüpfen
3. Policies auf auth.uid() basieren
*/
