import fs from "fs";

const file = process.argv[2];
const html = fs.readFileSync(file, "utf8");
// event venue map in listings metadata
const blocks = [...html.matchAll(/"images":\[\{[^]]+cloudinary[^]]+\]/g)].slice(0, 5);
for (const b of blocks) console.log(b[0].slice(0, 250), "\n---");
const venueMap = html.match(/"venue_map[^"]*":"(https:[^"]+)"/);
console.log("venue_map:", venueMap?.[1]);
const all = [...html.matchAll(/https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+/gi)].map((m) => m[0]);
const jpg = all.filter((u) => !u.endsWith("png") || u.includes(".jpg"));
const withExt = [...html.matchAll(/https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+\.(jpg|png|webp)/gi)].map((m) => m[0]);
const counts = {};
for (const u of withExt) counts[u] = (counts[u] ?? 0) + 1;
const sorted = Object.entries(counts).sort((a, b) => a[1] - b[1]);
console.log("low freq images:");
for (const [u, c] of sorted.filter(([, c]) => c <= 3).slice(-15)) console.log(c, u);
