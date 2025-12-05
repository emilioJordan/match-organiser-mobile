# ========================================
#  Match Organizer - Emulator Quick Start
# ========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Match Organizer - Emulator Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Prüfe ANDROID_HOME
if (-not $env:ANDROID_HOME) {
    Write-Host "❌ ERROR: ANDROID_HOME not set!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Set ANDROID_HOME with:" -ForegroundColor Yellow
    Write-Host "  [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\$env:USERNAME\AppData\Local\Android\Sdk', 'User')" -ForegroundColor Gray
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ ANDROID_HOME: $env:ANDROID_HOME" -ForegroundColor Green

# Prüfe ob emulator existiert
$emulatorPath = "$env:ANDROID_HOME\emulator\emulator.exe"
if (-not (Test-Path $emulatorPath)) {
    Write-Host "❌ ERROR: Emulator not found at: $emulatorPath" -ForegroundColor Red
    Write-Host "Install Android SDK via Android Studio" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "✅ Emulator found" -ForegroundColor Green
Write-Host ""

# Liste verfügbare Emulatoren
Write-Host "[1/4] Available emulators:" -ForegroundColor Cyan
$avds = & "$emulatorPath" -list-avds 2>$null

if ($avds.Count -eq 0) {
    Write-Host "❌ ERROR: No emulators found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Create an emulator in Android Studio:" -ForegroundColor Yellow
    Write-Host "  1. Open Android Studio" -ForegroundColor Gray
    Write-Host "  2. Tools → Device Manager" -ForegroundColor Gray
    Write-Host "  3. Create Device → Pixel 5 → API 31" -ForegroundColor Gray
    Write-Host ""
    pause
    exit 1
}

$avds | ForEach-Object { 
    Write-Host "  • $_" -ForegroundColor White 
}

# Wähle ersten Emulator
$selectedAvd = $avds[0]
Write-Host ""
Write-Host "[2/4] Starting emulator: $selectedAvd" -ForegroundColor Cyan

# Starte Emulator im Hintergrund
try {
    $emulatorProcess = Start-Process -FilePath $emulatorPath -ArgumentList "-avd", $selectedAvd -PassThru -WindowStyle Hidden
    Write-Host "✅ Emulator process started (PID: $($emulatorProcess.Id))" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Failed to start emulator" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    pause
    exit 1
}

# Warte auf Emulator
Write-Host ""
Write-Host "[3/4] Waiting for emulator to boot..." -ForegroundColor Cyan
Write-Host "  (This may take 30-60 seconds)" -ForegroundColor Gray

Start-Sleep -Seconds 5

# Prüfe ob ADB verfügbar ist
$adbPath = "$env:ANDROID_HOME\platform-tools\adb.exe"
if (-not (Test-Path $adbPath)) {
    Write-Host "⚠️  WARNING: ADB not found, cannot verify emulator status" -ForegroundColor Yellow
} else {
    & $adbPath wait-for-device 2>$null
    Write-Host "✅ Emulator ready!" -ForegroundColor Green
}

# Starte Dev-Server
Write-Host ""
Write-Host "[4/4] Starting development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🚀 Ready for development!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Wait for dev server to start" -ForegroundColor Gray
Write-Host "  2. Open another terminal" -ForegroundColor Gray
Write-Host "  3. Run: npx cap run android" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop dev server" -ForegroundColor Yellow
Write-Host ""

# Starte Dev-Server (blockiert bis Ctrl+C)
npm start
