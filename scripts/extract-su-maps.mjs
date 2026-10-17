import fs from "fs";

const file = process.argv[2];
const html = fs.readFileSync(file, "utf8");
const re = /seating_map[^}]{0,400}/gi;
for (const m of html.match(re) ?? []) {
  if (m.includes("cloudinary") || m.includes("http")) console.log(m.slice(0, 500));
}
const re2 = /"seating[^"]*":\s*"[^"]+"/gi;
for (const m of html.match(re2) ?? []) console.log(m);
const re3 = /seat_map[^,]{0,200}/gi;
let c = 0;
for (const m of html.match(re3) ?? []) {
  if (m.includes("cloudinary") || m.includes("upload")) {
    console.log(m);
    c++;
    if (c > 30) break;
  }
}
