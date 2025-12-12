# Match-Erstellung & Standort - Fehlerbehebungen

## 🔧 Durchgeführte Fixes

### 1. **Android Permissions (KRITISCH!)**
Die Geolocation- und Kamera-Berechtigungen fehlten im Android Manifest.

**Datei:** `android/app/src/main/AndroidManifest.xml`
**Hinzugefügt:**
```xml
<!-- Geolocation Permissions -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />

<!-- Camera Permissions -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
```

### 2. **Geolocation Service verbessert**
**Datei:** `src/app/services/geolocation.service.ts`

**Änderungen:**
- ✅ Bessere Error Handling mit try-catch
- ✅ Automatische Berechtigungsprüfung vor Standortabfrage
- ✅ Timeout und High Accuracy Optionen hinzugefügt
- ✅ Detailliertes Logging für Debugging

**Neue Features:**
```typescript
const coordinates = await Geolocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
});
```

### 3. **Create Match Page - useCurrentLocation()**
**Datei:** `src/app/pages/create-match/create-match.page.ts`

**Verbessert:**
- ✅ Klarer Berechtigungs-Dialog mit besseren Texten
- ✅ Detaillierte Fehlerbehandlung (Permission denied, Timeout, Unavailable)
- ✅ Bessere User-Feedback mit Icons
- ✅ Formatierte Koordinaten-Anzeige
- ✅ Console-Logging für Debugging

### 4. **Create Match - createMatch()**
**Datei:** `src/app/pages/create-match/create-match.page.ts`

**Verbessert:**
- ✅ Detaillierte Validierung mit Fehlerausgabe pro Feld
- ✅ Besseres Error Handling mit spezifischen Fehlermeldungen
- ✅ User-Profile Check vor dem Erstellen
- ✅ Umfangreiches Console-Logging
- ✅ Explizite Typ-Konvertierung für max_participants (parseInt)

### 5. **Supabase Service**
**Datei:** `src/app/services/supabase.service.ts`

**Änderungen:**
- ✅ Interface Match: null-Werte erlaubt für latitude, longitude, image_url
- ✅ createMatch() wirft jetzt Exceptions statt null zurückzugeben
- ✅ Detailliertes Error-Logging mit allen Supabase Error Details

### 6. **Form Validierung verbessert**
**Datei:** `src/app/pages/create-match/create-match.page.ts`

**Validators hinzugefügt:**
```typescript
location: ['', [Validators.required, Validators.minLength(3)]],
max_participants: [10, [Validators.required, Validators.min(2), Validators.max(100)]],
```

## 🧪 Testing Anleitung

### Schritt 1: App neu builden
```bash
npm run build
npx cap sync android
```

### Schritt 2: APK erstellen oder auf Emulator starten
**Option A - Emulator:**
```bash
npx cap run android
```

**Option B - Debug APK:**
```bash
cd android
.\gradlew.bat assembleDebug
```
APK Pfad: `android/app/build/outputs/apk/debug/app-debug.apk`

### Schritt 3: Test-Szenarien

#### 🗺️ **Standort-Test:**
1. Öffne "Match Erstellen"
2. Klicke auf "Aktuellen Standort verwenden"
3. **Erwartetes Verhalten:**
   - Bei erster Nutzung: Berechtigungs-Dialog
   - Nach Erlaubnis: Loading-Spinner → Erfolgs-Toast
   - Koordinaten im Location-Feld sichtbar

#### 📝 **Match-Erstellung-Test:**
1. Fülle alle Felder aus:
   - Titel (mind. 3 Zeichen)
   - Beschreibung (mind. 10 Zeichen)
   - Datum & Zeit
   - Ort (mind. 3 Zeichen)
   - Max. Teilnehmer (2-100)
2. Optional: Bild hinzufügen
3. Optional: Standort verwenden
4. Klicke "Match erstellen"
5. **Erwartetes Verhalten:**
   - Loading-Spinner
   - Erfolgs-Toast: "✅ Match erfolgreich erstellt!"
   - Navigation zu Match-Liste
   - Neues Match in Liste sichtbar

## 🐛 Debugging

### Console Logs aktiviert in:

1. **Geolocation Service:**
   - Permission Status
   - Position erhalten
   - Fehler

2. **Create Match Page:**
   - Form Initialisierung
   - Permission Flows
   - Position Details
   - Match-Daten die gesendet werden
   - Supabase Antworten

3. **Supabase Service:**
   - Gesendete Match-Daten
   - Supabase Error Details (message, code, hint, details)
   - Erfolgreiche Antworten

### Logs checken:
**Android Studio Logcat:**
```
Filter: "Ionic"
```

**Chrome DevTools (für Web):**
```
Filter: "Geolocation" oder "Supabase" oder "Match"
```

## ❗ Bekannte Probleme & Lösungen

### Problem: "Standortberechtigung verweigert"
**Lösung:**
- In Android Einstellungen → Apps → Match Organizer → Berechtigungen
- Standort auf "Erlauben" setzen

### Problem: "Standort konnte nicht ermittelt werden"
**Lösung:**
- GPS aktivieren
- Im Freien oder am Fenster testen
- Emulator: Location über Android Studio setzen

### Problem: "Match erstellen schlägt fehl"
**Debugging Schritte:**
1. Chrome DevTools öffnen
2. Console-Tab öffnen
3. Match erstellen klicken
4. Logs prüfen:
   - "Match-Daten die gesendet werden:" → Sind alle Felder korrekt?
   - "Supabase Error:" → Datenbankfehler?
   - "User Profile:" → Ist User eingeloggt?

### Problem: Validation Fehler
**Check:**
- Titel: mind. 3 Zeichen
- Beschreibung: mind. 10 Zeichen
- Ort: mind. 3 Zeichen
- Max. Teilnehmer: 2-100
- Datum & Zeit: gesetzt

## 📱 Emulator GPS Setup

### Android Studio:
1. Öffne Extended Controls (...) im Emulator
2. Location → Single Points
3. Setze Koordinaten (z.B. Zürich: 47.3769, 8.5417)
4. Klicke "Set Location"

### Alternative - Kommandozeile:
```bash
adb emu geo fix 8.5417 47.3769
```

## ✅ Erfolgskriterien

- [ ] Standortberechtigung wird beim ersten Mal angefordert
- [ ] Standort wird erfolgreich abgerufen (Koordinaten im Feld)
- [ ] Match kann mit allen Feldern erstellt werden
- [ ] Match erscheint in der Match-Liste
- [ ] Keine Console Errors
- [ ] Toast-Meldungen erscheinen korrekt

## 🔍 Nächste Schritte (Optional)

1. **Reverse Geocoding:** Koordinaten in lesbare Adressen umwandeln
2. **Map Preview:** Karte mit Standort-Pin anzeigen
3. **Offline Support:** Matches auch ohne Internet erstellen
4. **Image Compression:** Bilder vor Upload komprimieren

## 📞 Support

Bei weiteren Problemen:
1. Console Logs kopieren
2. Screenshot des Fehlers
3. Schritte zur Reproduktion beschreiben
