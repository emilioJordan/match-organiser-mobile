# 🎯 KOMPLETT-LÖSUNG: Supabase Setup

## ⚡ Schnellstart (5 Minuten)

### Schritt 1: SQL Script öffnen
📁 Öffne die Datei: **`docs/COMPLETE_SUPABASE_SETUP.sql`**

### Schritt 2: Supabase öffnen
1. Gehe zu: https://supabase.com/dashboard
2. Wähle dein Projekt
3. Klicke links auf **"SQL Editor"**
4. Klicke **"New Query"**

### Schritt 3: Script ausführen
1. **Kopiere den GANZEN Inhalt** von `COMPLETE_SUPABASE_SETUP.sql`
2. **Füge ihn ein** im SQL Editor
3. Klicke **"Run"** (unten rechts)
4. ⏳ Warte 5-10 Sekunden

### Schritt 4: Prüfen ob es funktioniert hat
Scroll nach unten in den Results. Du solltest sehen:

**Tabellen:**
```
table_name
----------
matches
participants
```

**RLS Status:**
```
tablename      rowsecurity
----------     -----------
matches        true
participants   true
```

**Policies (8 Stück):**
```
tablename      policyname
----------     --------------------------
matches        matches_select_policy
matches        matches_insert_policy
matches        matches_update_policy
matches        matches_delete_policy
participants   participants_select_policy
participants   participants_insert_policy
participants   participants_update_policy
participants   participants_delete_policy
```

**Test-Match:**
```
id   title                    location
--   ----------------------   -----------------
1    Test Fussball Match      Sportplatz Zürich
```

✅ **Wenn du das alles siehst: PERFEKT! Weiter zu Schritt 5**

### Schritt 5: App testen
```bash
npx cap run android
```

**In der App:**
1. Tab **"Profil"** → Profil speichern
2. Tab **"Match Erstellen"** → Alle Felder ausfüllen
3. Klicke **"Match erstellen"**
4. 🎉 **Sollte jetzt funktionieren!**

---

## 🔧 Was wurde geändert?

### ❌ Alter Fehler:
```
insert or update on table "matches" violates foreign key constraint 
'matches_created_by_fkey'
```

### ✅ Lösung:
- **`created_by` ist jetzt TEXT** (keine Foreign Key mehr!)
- Keine User-Tabelle nötig
- UUIDs werden lokal in der App generiert
- Perfekt für Entwicklung/Testing

---

## 📊 Datenbank-Struktur

### Tabelle: `matches`
| Spalte           | Typ        | Beschreibung                    |
|------------------|------------|---------------------------------|
| id               | BIGSERIAL  | Automatische ID                 |
| title            | TEXT       | Match-Titel                     |
| description      | TEXT       | Beschreibung                    |
| date             | DATE       | Match-Datum                     |
| time             | TIME       | Match-Zeit                      |
| location         | TEXT       | Standort                        |
| max_participants | INTEGER    | Max. Teilnehmer                 |
| latitude         | DECIMAL    | GPS-Koordinate (optional)       |
| longitude        | DECIMAL    | GPS-Koordinate (optional)       |
| image_url        | TEXT       | Bild-URL (optional)             |
| **created_by**   | **TEXT**   | **User-UUID (keine FK!)**       |
| created_at       | TIMESTAMPTZ| Erstellungszeitpunkt            |

### Tabelle: `participants`
| Spalte     | Typ        | Beschreibung                    |
|------------|------------|---------------------------------|
| id         | BIGSERIAL  | Automatische ID                 |
| match_id   | BIGINT     | Foreign Key → matches(id)       |
| user_id    | TEXT       | User-UUID                       |
| status     | TEXT       | Status (z.B. 'registered')      |
| created_at | TIMESTAMPTZ| Anmeldungszeitpunkt             |

---

## ⚠️ Troubleshooting

### Problem: "permission denied for table matches"
**Lösung:** Script nochmals ausführen, RLS Policies werden neu erstellt

### Problem: "relation matches already exists"
**Lösung:** Das ist OK! Script löscht zuerst alte Tabellen und erstellt sie neu

### Problem: Test-Match wird nicht angezeigt
**Lösung:** 
```sql
SELECT * FROM matches;
```
Sollte mindestens 1 Match zeigen

### Problem: App zeigt immer noch Fehler
**Lösung:**
1. Prüfe ob alle 8 Policies existieren
2. Prüfe ob RLS aktiviert ist (rowsecurity = true)
3. Chrome DevTools öffnen und Console checken
4. Profil neu speichern (UUID generieren)

---

## 🎯 Erwartetes Ergebnis

### ❌ Vorher:
- UUID Fehler
- Foreign Key Fehler
- Permission Denied Fehler

### ✅ Nachher:
- Match wird erfolgreich erstellt
- Grüner Toast: "✅ Match erfolgreich erstellt!"
- Match erscheint in der Liste
- Keine Fehler mehr

---

## 🚀 Ready to Test!

**Alles bereit?**
- [x] SQL Script ausgeführt
- [x] 8 Policies erstellt
- [x] Test-Match vorhanden
- [ ] App gestartet
- [ ] Profil gespeichert
- [ ] Match erstellt

**Los geht's! 🎉**
