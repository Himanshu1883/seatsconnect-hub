import fs from "fs";

const html = fs.readFileSync(process.argv[2], "utf8");
const event = process.argv[3] ?? "";
if (!html.includes(event) && event) {
  console.log("event string not in html");
}
const re = /\\"alt_text\\":null,\\"lqip\\":[^}]+\\"url\\":\\"(https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+\.png)\\"/g;
for (const m of html.matchAll(re)) console.log(m[1]);
