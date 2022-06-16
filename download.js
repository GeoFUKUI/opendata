import { fetchPOST } from "https://js.sabae.cc/fetchPOST.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

// 36.465482, 135.313655
// 35.34426502184729, 137.00554912397973

const [minx, maxx] = [137.00554912397973, 135.313655];
const [miny, maxy] = [35.34426502184729, 36.465482];

const limit = 100000;
const url = "https://www.geo-stn.bosai.go.jp/api/hyodai.php";
const param = {
  limit,
  minx,
  miny,
  maxx,
  maxy,
  datatype: 1,
  boring: 1,
  model: 0,
};
/*
const param = {
  limit: 1000000,
  minx: 139,
  miny: 36.666666666666664,
  maxx: 140,
  maxy: 37.333333333333336,
  datatype: 1,
  boring: 1,
  model: 0,
};
*/

const data = await fetchPOST(url, param);
await Deno.writeTextFile("data.json", JSON.stringify(data, 0, null));
//const data = JSON.parse(await Deno.readTextFile("data.json"));
//console.log(data);

for (const d of data) {
  console.log(d);
  const churl = `https://www.geo-stn.bosai.go.jp/api/dlBoring.php?type=xml&file=${d.data_name_e},${d.file_name}`;
  const xmlbin = await (await fetch(churl)).arrayBuffer();
  const xml0 = SJIS.decode(new Uint8Array(xmlbin));
  const xml = xml0.replace('encoding="Shift_JIS"', 'encoding="utf-8"');
  const fn = d.data_name_e + "_" + d.file_name;
  console.log(fn);
  await Deno.writeTextFile("data/" + fn + ".xml", xml);
}

