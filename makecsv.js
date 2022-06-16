import { CSV } from "https://js.sabae.cc/CSV.js";

const data = JSON.parse(await Deno.readTextFile("data.json"));
data.forEach(d => {
  d.lng = d.x;
  d.lat = d.y;
  delete d.x;
  delete d.y;
});
const data2 = data.filter(d => d.data_name_e == "BOREHOLE_FUKUI");
await Deno.writeTextFile("./data.csv", CSV.stringify(data2.splice(0, 500)));
//await Deno.writeTextFile("./data.csv", CSV.stringify(data));
