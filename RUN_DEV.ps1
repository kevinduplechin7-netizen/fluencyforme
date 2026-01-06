Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Run from the extracted folder
if (Test-Path "package-lock.json") {
  npm ci
} else {
  npm install
}

npm run dev
