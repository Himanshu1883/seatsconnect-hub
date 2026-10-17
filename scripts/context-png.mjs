import fs from "fs";

const html = fs.readFileSync(process.argv[2], "utf8");
const id = process.argv[3];
const i = html.indexOf(id);
console.log(html.slice(i - 120, i + id.length + 120).replace(/\\n/g, " "));
