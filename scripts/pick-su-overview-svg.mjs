import fs from "fs";

const html = fs.readFileSync(process.argv[2], "utf8");
const re =
  /\\"name\\":\\"Tickets\\"[^]{0,8000}?\\"images\\":\[\{[^}]*\\"url\\":\\"(https:\/\/res\.cloudinary\.com[^\\"]+\.svg)\\"/;
const m = html.match(re);
if (m) {
  console.log(m[1]);
  process.exit(0);
}
// fallback: first svg in listing images
const re2 =
  /\\"name\\":\\"([^\\"]+)\\"[^]{0,6000}?\\"images\\":\[\{[^}]*\\"url\\":\\"(https:\/\/res\.cloudinary\.com[^\\"]+\.svg)\\"/;
for (const x of html.matchAll(re2)) {
  console.log("fallback", x[1], x[2]);
  break;
}
