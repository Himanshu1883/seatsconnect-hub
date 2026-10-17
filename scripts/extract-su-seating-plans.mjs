import fs from "fs";

const file = process.argv[2];
const html = fs.readFileSync(file, "utf8");
const re = /seating_map_image\\":(null|\\"([^\\"]+)\\")/g;
const vals = new Set();
for (const m of html.matchAll(re)) {
  if (m[1] !== "null" && m[2]) vals.add(m[2]);
}
console.log("seating_map_image urls:", [...vals]);
// first package image (often grandstand map)
const firstImg = html.match(/"images":\[\{"id":"[^"]+","position":0,"url":"(https:[^"]+)"/);
console.log("first listing image:", firstImg?.[1]);
// all position 0 images unique
const imgs = [...html.matchAll(/"position":0,"url":"(https:\/\/res\.cloudinary\.com[^"]+)"/g)].map((m) => m[1]);
console.log("position 0 count", imgs.length, "unique", new Set(imgs).size);
console.log([...new Set(imgs)].slice(0, 5).join("\n"));
