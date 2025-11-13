# Simple smoke test for local API

param(
  [int]$Port = 3001
)

function Test-Endpoint($Path) {
  try {
    $r = Invoke-RestMethod -Uri $Path -TimeoutSec 5
    return @{ ok = $true; body = $r }
  } catch {
    return @{ ok = $false; error = $_.Exception.Message }
  }
}

$base = "http://localhost:$Port"
Write-Host "Testing API at $base"

$root = Test-Endpoint "$base/"
if ($root.ok) { Write-Host "[PASS] GET /" } else { Write-Host "[FAIL] GET / -> $($root.error)" }

$products = Test-Endpoint "$base/products"
if ($products.ok -and $products.body.Count -gt 0) {
  Write-Host "[PASS] GET /products (count=$($products.body.Count))"
} elseif ($products.ok) {
  Write-Host "[WARN] GET /products returned 0 items"
} else {
  Write-Host "[FAIL] GET /products -> $($products.error)"
}

if ($root.ok -and $products.ok) { exit 0 } else { exit 1 }
