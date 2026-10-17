import fs from "fs";

const html = fs.readFileSync(process.argv[2], "utf8");
const re = /\\"url\\":\\"(https:\/\/res\.cloudinary\.com[^\\"]+\.png)\\",\\"alt_text\\":\\"([^\\"]*)\\"/g;
for (const m of html.matchAll(re)) {
  console.log(m[2] || "(no alt)", "->", m[1].slice(-40));
}
const reNull = /\\"alt_text\\":null,\\"lqip\\":[^,]+,\\"strict_ratio\\":[^,]+,\\"url\\":\\"(https:\/\/res\.cloudinary\.com[^\\"]+\.png)\\"/g;
let n = 0;
for (const m of html.matchAll(reNull)) {
  console.log("(null alt)", m[1].slice(-50));
  n++;
  if (n > 20) break;
}
