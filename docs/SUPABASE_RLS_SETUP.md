# 🔒 Supabase Row Level Security (RLS) Setup

## Problem
Ohne RLS Policies blockiert Supabase alle Datenbank-Anfragen, auch wenn du den korrekten API Key verwendest.

## ✅ Lösung: RLS Policies erstellen

### Schritt 1: Supabase Dashboard öffnen
1. Gehe zu: https://supabase.com/dashboard
2. Wähle dein Projekt: **jisjhblyqlxeowtkydwh**
3. Im linken Menü: **SQL Editor** klicken

### Schritt 2: SQL Script ausführen
1. Klicke auf **"New Query"**
2. Öffne die Datei: `docs/supabase-policies.sql`
3. Kopiere den **gesamten Inhalt**
4. Füge ihn im SQL Editor ein
5. Klicke **"Run"** (unten rechts)

### Schritt 3: Verifizieren
Nach dem Ausführen solltest du sehen:
```
Success. No rows returned
```

**Policies prüfen:**
```sql
SELECT tablename, policyname
FROM pg_policies
WHERE tablename IN ('matches', 'participants');
```

**Erwartetes Ergebnis:**
| tablename    | policyname                          |
|--------------|-------------------------------------|
| matches      | Matches sind öffentlich lesbar      |
| matches      | Jeder kann Matches erstellen        |
| matches      | Nur Ersteller kann Match bearbeiten |
| matches      | Nur Ersteller kann Match löschen    |
| participants | Teilnehmer sind öffentlich lesbar   |
| participants | Jeder kann sich für Match anmelden  |
| participants | User kann eigene Anmeldung ändern   |
| participants | User kann eigene Anmeldung löschen  |

## 🎯 Was machen diese Policies?

### Matches Tabelle:
- ✅ **Lesen (SELECT)**: Jeder kann alle Matches sehen
- ✅ **Erstellen (INSERT)**: Jeder kann Matches erstellen
- ✅ **Bearbeiten (UPDATE)**: Jeder kann Matches bearbeiten (für Entwicklung)
- ✅ **Löschen (DELETE)**: Jeder kann Matches löschen (für Entwicklung)

### Participants Tabelle:
- ✅ **Lesen**: Jeder kann Teilnehmer sehen
- ✅ **Erstellen**: Jeder kann sich anmelden
- ✅ **Bearbeiten**: Jeder kann Anmeldungen ändern
- ✅ **Löschen**: Jeder kann Anmeldungen löschen

## ⚠️ Wichtig: Entwicklungs-Policies

Diese Policies sind **sehr offen** und für **Entwicklung/Testing** gedacht!

**Warum so offen?**
- Keine echte User-Authentifizierung
- UUIDs werden lokal generiert
- Vereinfacht Testing

**Für Produktion:** Später mit Supabase Auth und `auth.uid()` absichern.

## 🧪 Test nach Setup

### 1. App neu starten
```bash
npx cap run android
```

### 2. In der App testen:
1. **Profil speichern** (generiert UUID)
2. **Match erstellen**
3. **Match sollte jetzt ohne Fehler erstellt werden**

### 3. In Supabase prüfen:
1. Dashboard → **Table Editor**
2. Tabelle **matches** öffnen
3. Dein neues Match sollte dort erscheinen

## 🔧 Troubleshooting

### Problem: "new row violates row-level security policy"
**Lösung:**
```sql
-- RLS temporär deaktivieren (nur für Tests):
ALTER TABLE matches DISABLE ROW LEVEL SECURITY;
ALTER TABLE participants DISABLE ROW LEVEL SECURITY;
```

### Problem: Policies existieren bereits
**Lösung:**
```sql
-- Alte Policies löschen:
DROP POLICY IF EXISTS "Matches sind öffentlich lesbar" ON matches;
DROP POLICY IF EXISTS "Jeder kann Matches erstellen" ON matches;
-- usw...

-- Dann neue Policies erstellen
```

### Problem: Permissions Fehler
**Lösung:**
- Stelle sicher, dass du als **Service Role** angemeldet bist
- Oder verwende den **Postgres Role** mit Admin-Rechten

## 📊 Alternative: RLS über UI erstellen

Falls SQL nicht funktioniert, kannst du Policies auch über die UI erstellen:

1. **Dashboard → Authentication → Policies**
2. Wähle Tabelle: **matches**
3. Klicke **"New Policy"**
4. Wähle **"Custom policy"**
5. Name: "Matches sind öffentlich lesbar"
6. Policy command: **SELECT**
7. Target roles: **public**
8. USING expression: `true`
9. Klicke **"Review"** → **"Save policy"**
10. Wiederhole für alle anderen Policies

## ✅ Checkliste

- [ ] Supabase Dashboard geöffnet
- [ ] SQL Editor geöffnet
- [ ] SQL Script ausgeführt
- [ ] Policies verifiziert (8 Policies sollten existieren)
- [ ] App neu gestartet
- [ ] Profil gespeichert
- [ ] Match erstellen getestet
- [ ] Match erfolgreich erstellt

## 🔐 Zukünftige Verbesserungen

Für eine produktionsreife App solltest du später:

1. **Supabase Auth implementieren**
   ```typescript
   const { data, error } = await supabase.auth.signUp({
     email: 'user@example.com',
     password: 'password'
   });
   ```

2. **Policies mit auth.uid() absichern**
   ```sql
   CREATE POLICY "Nur Ersteller kann Match bearbeiten"
   ON matches
   FOR UPDATE
   USING (auth.uid()::text = created_by);
   ```

3. **created_by automatisch setzen**
   ```sql
   ALTER TABLE matches 
   ALTER COLUMN created_by 
   SET DEFAULT auth.uid()::text;
   ```

## 📚 Weitere Ressourcen

- [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Policies](https://www.postgresql.org/docs/current/sql-createpolicy.html)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
