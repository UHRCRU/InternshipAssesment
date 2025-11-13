# Frontend dev startup script

Push-Location "$PSScriptRoot/project_ui"

if (-Not (Test-Path node_modules)) {
  Write-Host 'Installing frontend dependencies...'
  npm install
}

if ($args.Length -ge 1) {
  $apiPort = $args[0]
  $envLine = "VITE_API_URL=http://localhost:$apiPort"
  $envPath = ".env"
  if (Test-Path $envPath) {
    (Get-Content $envPath | Where-Object {$_ -notmatch 'VITE_API_URL'}) | Set-Content $envPath
  }
  Add-Content $envPath $envLine
  Write-Host "Set $envLine in $envPath"
}

Write-Host 'Starting frontend (Vite)...'
npm run dev

Pop-Location