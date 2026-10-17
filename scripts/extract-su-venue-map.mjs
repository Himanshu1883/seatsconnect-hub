import fs from "fs";

const pages = [
  ["monza", "tmp-su-monza.html"],
  ["silverstone", "tmp-su-silverstone.html"],
  ["monaco", "tmp-su-monaco.html"],
  ["spa", "tmp-su-spa.html"],
  ["yas", "tmp-su-yas.html"],
];

const root = "c:/Users/Gulab/Downloads/seatsconnect-sports/seatsconnect-sports/";

for (const [name, file] of pages) {
  const path = root + file;
  if (!fs.existsSync(path)) {
    console.log(name, "MISSING", file);
    continue;
  }
  const html = fs.readFileSync(path, "utf8");
  const venue = html.match(/"seating_map_image":"([^"]+)"/);
  const venueNull = html.includes('"seating_map_image":null');
  const maps = [...html.matchAll(/seating_map_image\\":\\"([^\\"]+)\\"/g)].map((m) => m[1]);
  const pngs = [...html.matchAll(/https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+\.png/gi)]
    .map((m) => m[0])
    .filter((u) => !u.includes("z7icxy")); // skip logos
  const uniquePng = [...new Set(pngs)];
  console.log("\n===", name, "===");
  console.log("seating_map_image field:", venue?.[1] ?? (venueNull ? "null" : "n/a"));
  console.log("escaped maps:", maps.slice(0, 3));
  // event level map often in venue object
  const ev = html.match(/"venue":\{[^}]+seating_map_image[^}]+\}/);
  if (ev) console.log("venue blob:", ev[0].slice(0, 300));
  // pick likely circuit overview pngs (many small icons - filter by v1785505 batch which looked like COTA maps)
  const circuit = uniquePng.filter((u) => u.includes("/v178") || u.includes("/v177"));
  console.log("circuit png candidates:", circuit.slice(0, 8).join("\n  "));
}
