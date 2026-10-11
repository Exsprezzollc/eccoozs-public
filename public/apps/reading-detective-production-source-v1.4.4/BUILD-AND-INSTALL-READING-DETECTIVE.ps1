param(
  [string]$EccoozsPublicPath = "$env:USERPROFILE\Downloads\eccoozs-public"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$Target = Join-Path $EccoozsPublicPath "apps\reading-detective"
$BackupRoot = Join-Path $EccoozsPublicPath "_reading-detective-backups"
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"

Write-Host "Reading Detective v1.4.4 production hardening build" -ForegroundColor Cyan
Write-Host "Project: $ProjectRoot"
Write-Host "Target : $Target"

if (-not (Test-Path $EccoozsPublicPath)) {
  throw "ECCOOZS public folder was not found at: $EccoozsPublicPath"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js was not found. Install Node.js 20 or 22, then run this script again."
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm was not found. Install Node.js with npm, then run this script again."
}

Push-Location $ProjectRoot
try {
  Write-Host "`n1/4 Installing exact project dependencies..." -ForegroundColor Yellow
  npm install --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

  Write-Host "`n2/4 Running engineering verification..." -ForegroundColor Yellow
  npm run verify:all
  if ($LASTEXITCODE -ne 0) { throw "Verification failed. Nothing was copied into eccoozs-public." }

  Write-Host "`n3/4 Building production files..." -ForegroundColor Yellow
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "Production build failed. Nothing was copied into eccoozs-public." }

  if (-not (Test-Path (Join-Path $ProjectRoot "dist\index.html"))) {
    throw "Build completed without dist\index.html. Nothing was installed."
  }

  Write-Host "`n4/4 Installing into eccoozs-public..." -ForegroundColor Yellow
  if (Test-Path $Target) {
    $existing = Get-ChildItem -Force $Target -ErrorAction SilentlyContinue
    if ($existing.Count -gt 0) {
      New-Item -ItemType Directory -Force $BackupRoot | Out-Null
      $backup = Join-Path $BackupRoot $Stamp
      New-Item -ItemType Directory -Force $backup | Out-Null
      Copy-Item (Join-Path $Target "*") $backup -Recurse -Force -ErrorAction SilentlyContinue
      Write-Host "Existing Reading Detective files backed up to: $backup"
    }
  } else {
    New-Item -ItemType Directory -Force $Target | Out-Null
  }

  Get-ChildItem -Force $Target -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
  Copy-Item (Join-Path $ProjectRoot "dist\*") $Target -Recurse -Force

  Write-Host "`nSUCCESS" -ForegroundColor Green
  Write-Host "Reading Detective production files are now in:"
  Write-Host $Target -ForegroundColor Green
  Write-Host "`nExpected site path: /apps/reading-detective/"
}
finally {
  Pop-Location
}
