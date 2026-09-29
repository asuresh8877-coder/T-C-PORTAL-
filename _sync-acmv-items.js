const fs = require('fs');
const path = require('path');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
    else if (c !== '\r') cur += c;
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

function itemsFrom(file) {
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  return rows.filter(function (r) { return /^\d+$/.test(String(r[0] || '').trim()); }).map(function (r) {
    return {
      no: String(r[0]).trim(),
      section: String(r[1] || '').replace(/\s+/g, ' ').trim(),
      text: String(r[2] || '').replace(/\s+/g, ' ').trim()
    };
  });
}

const dir = path.join(__dirname, 'T&C Pre-Checklist');
const map = [
  ['02_Check_List_-01_Water_Cooled_Chi.csv', 'water-chiller'],
  ['03_Check_List_-_02_-_Cooling_Tower.csv', 'cooling-tower'],
  ['04_Check_List_-_03_Chilled_Pump.csv', 'pump'],
  ['05_Check_List-04_Chilled_-AHU_PAHU.csv', 'chilled-ahu'],
  ['06_Check_List-05_Chilled_-_FCU.csv', 'chilled-fcu'],
  ['07_Check_List-06_-_MV_Fan.csv', 'mv-fan'],
  ['08_Check_List-07-AHU-FCU-VRF.csv', 'ahu-vrf'],
  ['09_Check_List-08-FCU_SPLIT.csv', 'fcu-vrf'],
  ['10_Check_List-09_VSD.csv', 'vsd'],
  ['11_Check_List-10_Pipe_Work_Flushi.csv', 'pipe-flush'],
  ['12_Check_List-11_Duct_Leak_Test.csv', 'duct-leak']
];

const wfPath = path.join(__dirname, 'tnc-workflow.js');
let src = fs.readFileSync(wfPath, 'utf8');

function replaceArray(key, items) {
  const needle = '"' + key + '": [';
  const start = src.indexOf(needle);
  if (start < 0) throw new Error('missing ' + key);
  let i = start + needle.length - 1;
  let depth = 0;
  let end = -1;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end < 0) throw new Error('unclosed ' + key);
  const json = JSON.stringify(items, null, 2).replace(/\n/g, '\n    ');
  src = src.slice(0, start + needle.length - 1) + json + src.slice(end + 1);
}

map.forEach(function (pair) {
  const items = itemsFrom(path.join(dir, pair[0]));
  if (!items.length) throw new Error('no rows ' + pair[0]);
  replaceArray(pair[1], items);
  console.log(pair[1], items.length);
});

fs.writeFileSync(wfPath, src);
