import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { parseFlatXML } from "./parseFlatXML.js";

const files = (await dir2array("data")).filter(f => f.endsWith(".xml"));
const list = {};
for (const file of files) {
  const fn = "data/" + file;
  const name = file.substring(0, file.lastIndexOf("_"));
  const xml = await Deno.readTextFile(fn);
  console.log(name, fn);
  const json = parseFlatXML(xml);
  //console.log(json);
  if (!list[name]) {
    list[name] = [];
  }
  list[name].push(json);
}
for (const name in list) {
  await Deno.writeTextFile("csv/" + name + ".csv", CSV.stringify(list[name]));
}
