import fs from "fs";

const file = process.argv[2];
const html = fs.readFileSync(file, "utf8");
const keys = ["seating", "Seating", "seat_map", "seatMap", "venue_map", "trackMap", "circuit"];
for (const k of keys) {
  let i = 0;
  while ((i = html.indexOf(k, i)) !== -1) {
    console.log(html.slice(Math.max(0, i - 80), i + 200).replace(/\s+/g, " "));
    i += k.length;
    if (i > 500000) break;
  }
}

const full = [...html.matchAll(/https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+\.(png|jpg|webp)/gi)];
const uniq = [...new Set(full.map((m) => m[0]))];
console.log("\n--- full image ids ---\n", uniq.filter((u) => u.includes("png")).slice(0, 40).join("\n"));
