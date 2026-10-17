import fs from "fs";

const html = fs.readFileSync(process.argv[2], "utf8");
const urls = [
  ...new Set([
    ...html.matchAll(/https:\\\/\\\/res\.cloudinary\.com\\\/dw36awwm5\\\/image\\\/upload\\\/v\d+\\\/[a-z0-9]+\.svg/g),
  ].map((m) => m[0].replace(/\\\//g, "/"))),
];
console.log(urls.join("\n"));
