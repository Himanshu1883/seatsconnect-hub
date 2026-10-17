import fs from "fs";

const html = fs.readFileSync(process.argv[2], "utf8");
const urls = [...new Set([...html.matchAll(/https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+\.svg/gi)].map((m) => m[0]))];
for (const u of urls) console.log(u);
