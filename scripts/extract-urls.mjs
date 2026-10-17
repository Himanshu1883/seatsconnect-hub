import fs from "fs";

const file = process.argv[2];
const html = fs.readFileSync(file, "utf8");
const re = /https:\/\/res\.cloudinary\.com[^"'\\s)<>]+/g;
const urls = [...new Set([...html.matchAll(re)].map((m) => m[0]))];
for (const u of urls) console.log(u);
