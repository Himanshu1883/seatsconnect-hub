import fs from "fs";

const file = process.argv[2];
const html = fs.readFileSync(file, "utf8");
// Event-level seating map on venue
const m1 = html.match(/"seating_map_image":"(https:[^"]+)"/);
const m2 = html.match(/"seating_map_image":\{"url":"(https:[^"]+)"/);
const m3 = html.match(/"circuit_seating_map":"(https:[^"]+)"/);
console.log("direct:", m1?.[1] ?? m2?.[1] ?? m3?.[1] ?? "none");
// search all seating_map occurrences
for (const m of html.matchAll(/seating_map_image\\":\\"(https:[^\\"]+)\\"/g)) {
  console.log("escaped:", m[1]);
}
// venue seating - large png only once per page
const idx = html.indexOf('"slug":"circuit');
if (idx > 0) console.log(html.slice(idx, idx + 800));
