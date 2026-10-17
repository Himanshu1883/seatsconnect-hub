# Demo images sourced from public listing pages (primarily P1 Travel media CDN).
# Replace with owned/licensed assets before production.
param(
  [string]$Root = (Resolve-Path "$PSScriptRoot\..").Path
)

$q = "?tr=w-1200,q-75"
$events = Join-Path $Root "public\experiences\events"
$venues = Join-Path $Root "public\experiences\venues"
$exp = Join-Path $Root "public\experiences"
New-Item -ItemType Directory -Force -Path $events | Out-Null
New-Item -ItemType Directory -Force -Path $venues | Out-Null

function Save-Img([string]$dest, [string]$url) {
  $full = Join-Path $Root $dest
  $dir = Split-Path $full -Parent
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  try {
    Invoke-WebRequest -Uri $url -OutFile $full -UseBasicParsing -TimeoutSec 120
    return (Test-Path $full)
  } catch {
    Write-Warning "Failed $dest : $($_.Exception.Message)"
    return $false
  }
}

$collection = @{
  "public/experiences/racing.jpg" = "https://media.p1travel.com/img20221120170256-oliver-malinowski-scaled.jpg$q"
  "public/experiences/tennis.jpg" = "https://media.p1travel.com/Website%20Banner%20Wimbledon.png$q"
  "public/experiences/concert.jpg" = "https://media.p1travel.com/concert-2.jpg$q"
  "public/experiences/rugby.jpg" = "https://media.p1travel.com/Website%20Banner%20Algemene%20Rugby%20pagina%20(1).png$q"
  "public/experiences/more-sports.jpg" = "https://media.p1travel.com/nfl-london-scaled.jpg$q"
}

$cards = @{
  "public/experiences/events/monaco.jpg" = "https://media.p1travel.com/GP%20Monaco%20-%20casino%20square%20terrace%205.jpg$q"
  "public/experiences/events/silverstone.jpg" = "https://media.p1travel.com/dsc2226-scaled.jpg$q"
  "public/experiences/events/monza.jpg" = "https://media.p1travel.com/monza2-scaled.jpg$q"
  "public/experiences/events/spa.jpg" = "https://ik.imagekit.io/p1/Belgian%20GP%20-%20Silver%203%20Granstand%202.jpg$q"
  "public/experiences/events/abudhabi.jpg" = "https://media.p1travel.com/Abu%20Dhabi%20GP%202024%20-%20Track%20Overview%202%20-%20GP%20Abu%20Dhabi.jpg$q"
  "public/experiences/events/austin.jpg" = "https://media.p1travel.com/familesf1qualms171-scaled.jpg$q"
  "public/experiences/events/wimbledon.jpg" = "https://media.p1travel.com/Website%20Banner%20Wimbledon.png$q"
  "public/experiences/events/rolandgarros.jpg" = "https://media.p1travel.com/rolandgarros.png$q"
  "public/experiences/events/usopen.jpg" = "https://media.p1travel.com/us-open-banner.jpg$q"
  "public/experiences/events/ausopen.jpg" = "https://media.p1travel.com/Australian%20Open%202026%20-%20Stadium%20overview%201%20-%20AO2026.jpg$q"
  "public/experiences/events/atpfinals.jpg" = "https://media.p1travel.com/Rolex%20Paris%20Masters%20-%20Centre%20Court%201%20-%20ATP%20-%20Tennis.jpg$q"
  "public/experiences/events/lavercup.jpg" = "https://media.p1travel.com/center-court-1-scaled.jpg$q"
  "public/experiences/events/stadium-tours.jpg" = "https://media.p1travel.com/Bon%20Jovi%20-%20Wembley%20-%201080x1080.jpg$q"
  "public/experiences/events/arena.jpg" = "https://media.p1travel.com/dua-lipa-square.jpg$q"
  "public/experiences/events/festivals.jpg" = "https://media.p1travel.com/foto-l-boom-marktplaats-deal-scaled.jpg$q"
  "public/experiences/events/residency.jpg" = "https://media.p1travel.com/microsoftteams-image-18.jpg$q"
  "public/experiences/events/westend.jpg" = "https://media.p1travel.com/concert-2.jpg$q"
  "public/experiences/events/openair.jpg" = "https://media.p1travel.com/Slipknot%20landscape.jpg$q"
  "public/experiences/events/sixnations.jpg" = "https://media.p1travel.com/wales-vs-england-six-nations.jpg$q"
  "public/experiences/events/premiership.jpg" = "https://media.p1travel.com/France%20Rugby%20-%20Pitch%20Action%208.jpg$q"
  "public/experiences/events/urc.jpg" = "https://media.p1travel.com/Ireland%20Rugby%20-%20Stadium%20overview%20-%20AI%20-%20Aviva%20Stadium.jpg$q"
  "public/experiences/events/autumn.jpg" = "https://media.p1travel.com/France%20Rugby%20-%20Fireworks%202.jpg$q"
  "public/experiences/events/championscup.jpg" = "https://media.p1travel.com/nz-ireland-2-min-scaled.jpg$q"
  "public/experiences/events/lions.jpg" = "https://media.p1travel.com/rugby-world-cup.webp$q"
  "public/experiences/events/boxing.jpg" = "https://media.p1travel.com/Fight%20Night%20Guard%20in%20a%20Packed%20Stadium.png$q"
  "public/experiences/events/nfl.jpg" = "https://media.p1travel.com/nfl-london-scaled.jpg$q"
  "public/experiences/events/nba.jpg" = "https://media.p1travel.com/nfl5.jpeg$q"
  "public/experiences/events/golf.jpg" = "https://media.p1travel.com/gettyimages-1425823821-scaled.jpg$q"
  "public/experiences/events/cricket.jpg" = "https://media.p1travel.com/australia-wales-min-scaled.jpg$q"
  "public/experiences/events/olympics.jpg" = "https://media.p1travel.com/courtney-cook-fwrjql5-zq-unsplash-scaled-524x349-c-center-1.jpg$q"
}

# Fixture hero slugs (vertical event pages)
$heroes = @{
  "public/experiences/events/monaco-grand-prix.jpg" = $cards["public/experiences/events/monaco.jpg"]
  "public/experiences/events/british-grand-prix.jpg" = $cards["public/experiences/events/silverstone.jpg"]
  "public/experiences/events/italian-grand-prix.jpg" = $cards["public/experiences/events/monza.jpg"]
  "public/experiences/events/belgian-grand-prix.jpg" = $cards["public/experiences/events/spa.jpg"]
  "public/experiences/events/abu-dhabi-grand-prix.jpg" = $cards["public/experiences/events/abudhabi.jpg"]
  "public/experiences/events/wimbledon-finals-weekend.jpg" = $cards["public/experiences/events/wimbledon.jpg"]
  "public/experiences/events/roland-garros-finals-weekend.jpg" = $cards["public/experiences/events/rolandgarros.jpg"]
  "public/experiences/events/us-open-finals-weekend.jpg" = $cards["public/experiences/events/usopen.jpg"]
  "public/experiences/events/australian-open-finals-weekend.jpg" = $cards["public/experiences/events/ausopen.jpg"]
  "public/experiences/events/atp-finals-finals-day.jpg" = $cards["public/experiences/events/atpfinals.jpg"]
  "public/experiences/events/wembley-stadium-tour.jpg" = $cards["public/experiences/events/stadium-tours.jpg"]
  "public/experiences/events/the-o2-arena-show.jpg" = $cards["public/experiences/events/arena.jpg"]
  "public/experiences/events/glastonbury-festival.jpg" = $cards["public/experiences/events/festivals.jpg"]
  "public/experiences/events/las-vegas-residency.jpg" = $cards["public/experiences/events/residency.jpg"]
  "public/experiences/events/west-end-at-drury-lane.jpg" = $cards["public/experiences/events/westend.jpg"]
  "public/experiences/events/england-rugby-vs-wales-rugby.jpg" = $cards["public/experiences/events/sixnations.jpg"]
  "public/experiences/events/ireland-rugby-vs-france-rugby.jpg" = $cards["public/experiences/events/autumn.jpg"]
  "public/experiences/events/saracens-vs-leicester-tigers.jpg" = $cards["public/experiences/events/premiership.jpg"]
  "public/experiences/events/leinster-vs-munster.jpg" = $cards["public/experiences/events/urc.jpg"]
  "public/experiences/events/northampton-vs-toulouse.jpg" = $cards["public/experiences/events/championscup.jpg"]
  "public/experiences/events/world-title-fight-las-vegas.jpg" = $cards["public/experiences/events/boxing.jpg"]
  "public/experiences/events/nfl-london-at-wembley.jpg" = $cards["public/experiences/events/nfl.jpg"]
  "public/experiences/events/new-york-knicks-at-msg.jpg" = $cards["public/experiences/events/nba.jpg"]
  "public/experiences/events/the-open-final-round.jpg" = $cards["public/experiences/events/golf.jpg"]
  "public/experiences/events/australia-cricket-vs-england-cricket.jpg" = $cards["public/experiences/events/cricket.jpg"]
}

# Per-venue heroes + track/stadium overview (package explorer & venue section)
$venueImages = @{
  "public/experiences/venues/circuit-de-monaco.jpg" = "https://media.p1travel.com/GP%20Monaco%20-%20casino%20square%20terrace%205.jpg$q"
  "public/experiences/venues/circuit-de-monaco-map.jpg" = "https://media.p1travel.com/GP%20Monaco%20-%20casino%20square%20terrace%205.jpg$q"
  "public/experiences/venues/silverstone.jpg" = "https://media.p1travel.com/dsc2226-scaled.jpg$q"
  "public/experiences/venues/silverstone-map.jpg" = "https://media.p1travel.com/img20221120170256-oliver-malinowski-scaled.jpg$q"
  "public/experiences/venues/monza.jpg" = "https://media.p1travel.com/monza2-scaled.jpg$q"
  "public/experiences/venues/monza-map.jpg" = "https://media.p1travel.com/monza5-scaled.jpg$q"
  "public/experiences/venues/spa-francorchamps.jpg" = "https://ik.imagekit.io/p1/Belgian%20GP%20-%20Silver%203%20Granstand%202.jpg$q"
  "public/experiences/venues/spa-francorchamps-map.jpg" = "https://ik.imagekit.io/p1/Belgian%20GP%20-%20Silver%203%20Granstand%202.jpg$q"
  "public/experiences/venues/yas-marina.jpg" = "https://media.p1travel.com/Abu%20Dhabi%20GP%202024%20-%20Track%20Overview%202%20-%20GP%20Abu%20Dhabi.jpg$q"
  "public/experiences/venues/yas-marina-map.jpg" = "https://media.p1travel.com/Abu%20Dhabi%20GP%202024%20-%20Track%20Overview%202%20-%20GP%20Abu%20Dhabi.jpg$q"
  "public/experiences/venues/all-england-club.jpg" = "https://media.p1travel.com/Website%20Banner%20Wimbledon.png$q"
  "public/experiences/venues/all-england-club-map.jpg" = "https://media.p1travel.com/center-court-1-scaled.jpg$q"
  "public/experiences/venues/roland-garros.jpg" = "https://media.p1travel.com/rolandgarros.png$q"
  "public/experiences/venues/roland-garros-map.jpg" = "https://media.p1travel.com/rolandgarros.png$q"
  "public/experiences/venues/ustas-billie-jean-king.jpg" = "https://media.p1travel.com/us-open-banner.jpg$q"
  "public/experiences/venues/ustas-billie-jean-king-map.jpg" = "https://media.p1travel.com/us-open-banner.jpg$q"
  "public/experiences/venues/melbourne-park.jpg" = "https://media.p1travel.com/Australian%20Open%202026%20-%20Stadium%20overview%201%20-%20AO2026.jpg$q"
  "public/experiences/venues/melbourne-park-map.jpg" = "https://media.p1travel.com/Australian%20Open%202026%20-%20Stadium%20overview%201%20-%20AO2026.jpg$q"
  "public/experiences/venues/pala-alpitour.jpg" = "https://media.p1travel.com/Rolex%20Paris%20Masters%20-%20Centre%20Court%201%20-%20ATP%20-%20Tennis.jpg$q"
  "public/experiences/venues/pala-alpitour-map.jpg" = "https://media.p1travel.com/Rolex%20Paris%20Masters%20-%20Centre%20Court%201%20-%20ATP%20-%20Tennis.jpg$q"
  "public/experiences/venues/wembley-stadium.jpg" = "https://media.p1travel.com/Bon%20Jovi%20-%20Wembley%20-%201080x1080.jpg$q"
  "public/experiences/venues/wembley-stadium-map.jpg" = "https://media.p1travel.com/nfl-london-scaled.jpg$q"
  "public/experiences/venues/the-o2.jpg" = "https://media.p1travel.com/dua-lipa-square.jpg$q"
  "public/experiences/venues/the-o2-map.jpg" = "https://media.p1travel.com/concert-2.jpg$q"
  "public/experiences/venues/worthy-farm.jpg" = "https://media.p1travel.com/foto-l-boom-marktplaats-deal-scaled.jpg$q"
  "public/experiences/venues/worthy-farm-map.jpg" = "https://media.p1travel.com/Slipknot%20landscape.jpg$q"
  "public/experiences/venues/sphere-las-vegas.jpg" = "https://media.p1travel.com/microsoftteams-image-18.jpg$q"
  "public/experiences/venues/sphere-las-vegas-map.jpg" = "https://media.p1travel.com/microsoftteams-image-18.jpg$q"
  "public/experiences/venues/theatre-royal-drury-lane.jpg" = "https://media.p1travel.com/concert-2.jpg$q"
  "public/experiences/venues/theatre-royal-drury-lane-map.jpg" = "https://media.p1travel.com/concert-2.jpg$q"
  "public/experiences/venues/twickenham.jpg" = "https://media.p1travel.com/wales-vs-england-six-nations.jpg$q"
  "public/experiences/venues/twickenham-map.jpg" = "https://media.p1travel.com/wales-vs-england-six-nations.jpg$q"
  "public/experiences/venues/aviva-stadium.jpg" = "https://media.p1travel.com/Ireland%20Rugby%20-%20Stadium%20overview%20-%20AI%20-%20Aviva%20Stadium.jpg$q"
  "public/experiences/venues/aviva-stadium-map.jpg" = "https://media.p1travel.com/Ireland%20Rugby%20-%20Stadium%20overview%20-%20AI%20-%20Aviva%20Stadium.jpg$q"
  "public/experiences/venues/stonex-stadium.jpg" = "https://media.p1travel.com/France%20Rugby%20-%20Pitch%20Action%208.jpg$q"
  "public/experiences/venues/stonex-stadium-map.jpg" = "https://media.p1travel.com/France%20Rugby%20-%20Pitch%20Action%208.jpg$q"
  "public/experiences/venues/aviva-rds.jpg" = "https://media.p1travel.com/Ireland%20Rugby%20-%20Stadium%20overview%20-%20AI%20-%20Aviva%20Stadium.jpg$q"
  "public/experiences/venues/aviva-rds-map.jpg" = "https://media.p1travel.com/nz-ireland-2-min-scaled.jpg$q"
  "public/experiences/venues/franklins-gardens.jpg" = "https://media.p1travel.com/nz-ireland-2-min-scaled.jpg$q"
  "public/experiences/venues/franklins-gardens-map.jpg" = "https://media.p1travel.com/nz-ireland-2-min-scaled.jpg$q"
  "public/experiences/venues/t-mobile-arena.jpg" = "https://media.p1travel.com/Fight%20Night%20Guard%20in%20a%20Packed%20Stadium.png$q"
  "public/experiences/venues/t-mobile-arena-map.jpg" = "https://media.p1travel.com/Fight%20Night%20Guard%20in%20a%20Packed%20Stadium.png$q"
  "public/experiences/venues/madison-square-garden.jpg" = "https://media.p1travel.com/nfl5.jpeg$q"
  "public/experiences/venues/madison-square-garden-map.jpg" = "https://media.p1travel.com/nfl5.jpeg$q"
  "public/experiences/venues/royal-birkdale.jpg" = "https://media.p1travel.com/gettyimages-1425823821-scaled.jpg$q"
  "public/experiences/venues/royal-birkdale-map.jpg" = "https://media.p1travel.com/gettyimages-1425823821-scaled.jpg$q"
  "public/experiences/venues/mcg.jpg" = "https://media.p1travel.com/australia-wales-min-scaled.jpg$q"
  "public/experiences/venues/mcg-map.jpg" = "https://media.p1travel.com/australia-wales-min-scaled.jpg$q"
}

$all = $collection + $cards + $heroes + $venueImages
$ok = 0
foreach ($entry in $all.GetEnumerator()) {
  if (Save-Img $entry.Key $entry.Value) { $ok++ }
}
Write-Output "Downloaded $ok / $($all.Count) images."
