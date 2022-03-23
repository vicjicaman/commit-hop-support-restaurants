const fs = require("fs");

const data = fs
  .readFileSync("./support-restaurants - messages.tsv")
  .toLocaleString();

const lines = data.split("\n");

const res = {};
const index = {};

for (const idx in lines) {
  const line = lines[idx];
  const columns = line.trim().split("\t");

  for (const icx in columns) {
    const value = columns[icx];

    if (idx === "0") {
      if (icx !== "0") {
        res[value] = {};
        index[icx] = value;
      }
    } else {
      if (icx !== "0") {
        res[index[icx]] = { ...res[index[icx]], [columns["0"]]: value };
      }
    }
  }
}

console.log(JSON.stringify([res, index], null, 2));

for (const code in res) {
  fs.writeFileSync(`./dist/${code}.json`, JSON.stringify(res[code], null, 2));
}
