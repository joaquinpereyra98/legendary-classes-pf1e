import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { promises as fs } from "fs";

const somePack = [
  //"legendary-classes",
  //"legendary-alchemist-abilities",
  //"alchemist_discoveries",
  //"alchemical_disciplines",
  //"legendary-barbarian-abilities",
  //"rage-forms",
  //"rage-powers",
  //"legendary-cleric-abilities",
  "legendary-domains",
  "legendary-domains-abilities",
];

const MODULE_ID = process.cwd();
const yaml = true;

const packs = await fs.readdir("./src/packs");
let fileTotal = 0;

for (const pack of packs) {
  if (pack === ".gitattributes" || !somePack.includes(pack)) continue;

  const packPath = `${MODULE_ID}/src/packs/${pack}`;

  const files = await fs.readdir(packPath);
  const fileCount = files.length;
  fileTotal += fileCount;
  console.log(`Packing ${pack} (${fileCount} files)`);

  await compilePack(packPath, `${MODULE_ID}/packs/${pack}`, { yaml });
}
console.log(`Packed ${fileTotal} items`);
