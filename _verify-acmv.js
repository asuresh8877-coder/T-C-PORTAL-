const fs = require('fs');
const path = require('path');
const vm = require('vm');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else q = false;
      } else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const src = fs.readFileSync(path.join(__dirname, 'tnc-workflow.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(src, sandbox);
const items = sandbox.window.WEPL_TNC.items;
const map = {
  'water-chiller': '02_Check_List_-01_Water_Cooled_Chi.csv',
  'cooling-tower': '03_Check_List_-_02_-_Cooling_Tower.csv',
  'pump': '04_Check_List_-_03_Chilled_Pump.csv',
  'chilled-ahu': '05_Check_List-04_Chilled_-AHU_PAHU.csv',
  'chilled-fcu': '06_Check_List-05_Chilled_-_FCU.csv',
  'mv-fan': '07_Check_List-06_-_MV_Fan.csv',
  'ahu-vrf': '08_Check_List-07-AHU-FCU-VRF.csv',
  'fcu-vrf': '09_Check_List-08-FCU_SPLIT.csv',
  'vsd': '10_Check_List-09_VSD.csv',
  'pipe-flush': '11_Check_List-10_Pipe_Work_Flushi.csv',
  'duct-leak': '12_Check_List-11_Duct_Leak_Test.csv'
};
const dir = path.join(__dirname, 'T&C Pre-Checklist');
let bad = 0;
Object.keys(map).forEach(function (key) {
  const rows = parseCsv(fs.readFileSync(path.join(dir, map[key]), 'utf8'));
  const start = rows.findIndex(function (r) { return String(r[0] || '').trim() === 'S/N'; });
  const got = [];
  for (let i = start + 2; i < rows.length; i++) {
    const sn = String(rows[i][0] || '').trim();
    if (!/^\d+$/.test(sn)) break;
    got.push({
      no: sn,
      section: String(rows[i][1] || '').replace(/\s+/g, ' ').trim(),
      text: String(rows[i][2] || '').replace(/\s+/g, ' ').trim()
    });
  }
  const have = (items[key] || []).map(function (it) {
    return { no: String(it.no), section: String(it.section || '').replace(/\s+/g, ' ').trim(), text: String(it.text || '').replace(/\s+/g, ' ').trim() };
  });
  const n = Math.max(got.length, have.length);
  const diffs = [];
  for (let i = 0; i < n; i++) {
    const a = got[i];
    const b = have[i];
    if (!a || !b || a.no !== b.no || a.section !== b.section || a.text !== b.text) diffs.push({ i: i + 1, csv: a, js: b });
  }
  if (diffs.length) {
    bad++;
    console.log('MISMATCH', key, 'csv', got.length, 'js', have.length);
    diffs.slice(0, 8).forEach(function (d) { console.log(JSON.stringify(d)); });
  } else console.log('OK', key, have.length);
});
if (!items['bms-mv'][0].section && !items['bms-ac'][0].section) console.log('OK bms-mv/bms-ac unchanged (no section)');
else { bad++; console.log('BMS unexpectedly has section'); }
process.exit(bad ? 1 : 0);
