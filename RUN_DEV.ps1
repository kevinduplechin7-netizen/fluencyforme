Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "FluentHour - local dev runner" -ForegroundColor Cyan

if (Test-Path -LiteralPath "package-lock.json") {
  npm ci
} else {
  npm install
}

npm run dev
