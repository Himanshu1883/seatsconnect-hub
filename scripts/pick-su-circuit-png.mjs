import fs from "fs";

const files = {
  cota: "tmp-su-cota.html",
  monza: "tmp-su-monza.html",
  silverstone: "tmp-su-silverstone.html",
  monaco: "tmp-su-monaco.html",
  spa: "tmp-su-spa.html",
  yas: "tmp-su-yas.html",
};

const root = "c:/Users/Gulab/Downloads/seatsconnect-sports/seatsconnect-sports/";

function pngs(html) {
  return [...html.matchAll(/https:\/\/res\.cloudinary\.com\/dw36awwm5\/image\/upload\/v\d+\/[a-z0-9]+\.png/gi)].map((m) => m[0]);
}

const allCounts = new Map();
for (const html of Object.values(files).map((f) => fs.readFileSync(root + f, "utf8"))) {
  for (const u of new Set(pngs(html))) allCounts.set(u, (allCounts.get(u) ?? 0) + 1);
}

for (const [name, file] of Object.entries(files)) {
  const set = new Set(pngs(fs.readFileSync(root + file, "utf8")));
  const unique = [...set].filter((u) => allCounts.get(u) === 1);
  const rare = [...set].filter((u) => allCounts.get(u) <= 2);
  console.log("\n", name, "unique:", unique.length, "rare<=2:", rare.length);
  console.log(unique.join("\n"));
}
