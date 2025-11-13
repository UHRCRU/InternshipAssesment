# Backend dev startup script

Push-Location "$PSScriptRoot/project_api"

if (-Not (Test-Path node_modules)) {
  Write-Host 'Installing backend dependencies...'
  npm install
}

if (-Not (Test-Path .env)) {
  'DATABASE_URL="file:./dev.db"' | Out-File -Encoding utf8 .env
  Write-Host 'Created default .env'
}

if (-Not (Test-Path dev.db)) {
  Write-Host 'Running initial migration & seed...'
  npx prisma migrate dev --name init
  npm run seed
}

Write-Host 'Starting backend (nodemon)...'
npm run dev

Pop-Location