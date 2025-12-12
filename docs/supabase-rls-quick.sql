-- ========================================
-- QUICK RLS SETUP - Match Organizer
-- Kopiere diese Befehle in Supabase SQL Editor
-- ========================================

-- MATCHES TABLE
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_matches" ON matches FOR SELECT TO public USING (true);
CREATE POLICY "public_insert_matches" ON matches FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "public_update_matches" ON matches FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_matches" ON matches FOR DELETE TO public USING (true);

-- PARTICIPANTS TABLE
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_participants" ON participants FOR SELECT TO public USING (true);
CREATE POLICY "public_insert_participants" ON participants FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "public_update_participants" ON participants FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_participants" ON participants FOR DELETE TO public USING (true);

-- VERIFY
SELECT tablename, policyname FROM pg_policies WHERE tablename IN ('matches', 'participants');
