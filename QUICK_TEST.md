# 🚀 Quick Test Guide - Match Erstellung

## Schnellstart

### 1️⃣ App deployen
```bash
# Im Projekt-Ordner:
npm run build
npx cap sync android
npx cap run android
```

### 2️⃣ Match erstellen testen

**Minimale Test-Daten:**
- **Titel:** Test Match
- **Beschreibung:** Das ist ein Test Match für die App
- **Datum:** Heute
- **Zeit:** Jetzt
- **Ort:** Testplatz 123
- **Teilnehmer:** 10

**Standort-Button klicken:**
→ Berechtigung erlauben
→ Warte auf GPS
→ Koordinaten erscheinen im Ort-Feld

**Match erstellen klicken:**
→ Loading-Spinner
→ Grüner Toast: "✅ Match erfolgreich erstellt!"
→ Weiterleitung zur Match-Liste

### 3️⃣ Chrome DevTools öffnen (für Debugging)
```bash
# In Chrome Browser:
chrome://inspect
# Dann auf "Inspect" beim Device klicken
```

## ⚡ Häufige Fehler

| Fehler | Lösung |
|--------|--------|
| Standort geht nicht | GPS in Android aktivieren, Berechtigung erteilen |
| Match wird nicht erstellt | DevTools Console checken, User eingeloggt? |
| Validation Error | Alle Felder ausfüllen (min. 3/10 Zeichen) |

## 📋 Checkliste

- [ ] Android Permissions wurden hinzugefügt (AndroidManifest.xml)
- [ ] Build erfolgreich (`npm run build`)
- [ ] Sync erfolgreich (`npx cap sync android`)
- [ ] App startet auf Emulator/Device
- [ ] Standort-Button fragt nach Berechtigung
- [ ] Standort wird abgerufen
- [ ] Match kann erstellt werden
- [ ] Match erscheint in der Liste

## 🔍 Schnell-Debug

**Console Filter:** `Geolocation|Supabase|Match`

**Wichtigste Logs:**
```
✓ "Permission granted, getting position..."
✓ "Position obtained: {lat: ..., lng: ...}"
✓ "Match-Daten die gesendet werden: ..."
✓ "Supabase: Match created successfully: ..."
```

**Fehler Logs:**
```
✗ "Location permission denied"
✗ "Supabase Error:"
✗ "Formular ungültig"
```
