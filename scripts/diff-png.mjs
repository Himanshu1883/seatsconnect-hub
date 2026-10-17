import fs from "fs";
const a = new Set([...fs.readFileSync(process.argv[2], "utf8").matchAll(/\/v\d+\/[a-z0-9]+\.png/gi)].map((m) => m[0]));
const b = new Set([...fs.readFileSync(process.argv[3], "utf8").matchAll(/\/v\d+\/[a-z0-9]+\.png/gi)].map((m) => m[0]));
for (const x of a) if (!b.has(x)) console.log(x);
