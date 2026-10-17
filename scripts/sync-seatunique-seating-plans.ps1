# Seat Unique circuit seating plans (SVG/JPG track maps — not event hero banners).
param(
  [string]$Root = (Resolve-Path "$PSScriptRoot\..").Path
)

$base = "https://res.cloudinary.com/dw36awwm5/image/upload/q_auto,f_auto"
$plans = @{
  "public/experiences/venues/yas-marina-seating-plan.svg" = "$base/v1774536870/bizeqrugopznkd23ihvv.svg"
  "public/experiences/venues/yas-marina-north-seating-plan.svg" = "$base/v1774536887/xittwche4ifiptxsdrg2.svg"
  "public/experiences/venues/yas-marina-south-seating-plan.svg" = "$base/v1774536806/gjbroyjgg6cmg62a9hzs.svg"
  "public/experiences/venues/yas-marina-marina-seating-plan.svg" = "$base/v1774536812/ltqlteeom9efyhc8wqaq.svg"
  "public/experiences/venues/yas-marina-main-seating-plan.svg" = "$base/v1774536865/xc864trm9qfzgfccwi3s.svg"
  "public/experiences/venues/circuit-de-monaco-seating-plan.svg" = "$base/v1774535330/rgyld9ixdyhbdthooyer.svg"
  "public/experiences/venues/spa-francorchamps-seating-plan.svg" = "$base/v1774535682/hyfjht51gmjpanablq5s.svg"
  "public/experiences/venues/silverstone-seating-plan.jpg" = "$base/v1781191251/jmeoeem8260fsryt6pcb.jpg"
  "public/experiences/venues/monza-seating-plan.jpg" = "https://media.p1travel.com/monza5-scaled.jpg?tr=w-1400,q-75"
}

function Save-Img([string]$dest, [string]$url) {
  $full = Join-Path $Root $dest
  $dir = Split-Path $full -Parent
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  Invoke-WebRequest -Uri $url -OutFile $full -UseBasicParsing -TimeoutSec 120
}

$ok = 0
foreach ($entry in $plans.GetEnumerator()) {
  try {
    Save-Img $entry.Key $entry.Value
    $ok++
  } catch {
    Write-Warning "Failed $($entry.Key): $($_.Exception.Message)"
  }
}
Write-Output "Downloaded $ok / $($plans.Count) circuit seating plans."
