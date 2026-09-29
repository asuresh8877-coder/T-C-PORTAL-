const fs = require('fs');
const src = fs.readFileSync('app.js', 'utf8');
const m = src.match(/function preconSurveyCellSpec\([\s\S]*?\n  \}\n  function preconSurveyControlHtml/);
if (!m) throw new Error('no fn');
const fn = m[0].replace(/\n  function preconSurveyControlHtml$/, '');
eval(fn);
function rows(file) {
  const t = fs.readFileSync(file, 'utf8');
  const lines = t.split(/\r?\n/);
  let on = false;
  const out = [];
  for (const line of lines) {
    if (/^S\/N,/i.test(line)) { on = true; continue; }
    if (!on) continue;
    if (/^,?\s*Note/i.test(line) || /^Legends/i.test(line)) break;
    const parts = [];
    let c = '';
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"' && line[i + 1] === '"') { c += '"'; i++; }
        else if (ch === '"') q = false;
        else c += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',') { parts.push(c); c = ''; }
      else c += ch;
    }
    parts.push(c);
    const sn = (parts[0] || '').trim();
    const desc = (parts[1] || '').trim();
    if (!sn || !desc || /^\d+$/.test(sn)) continue;
    const a = preconSurveyCellSpec(desc, 'info');
    const b = preconSurveyCellSpec(desc, 'measure');
    out.push(sn + '\t' + a.kind + '\t' + a.placeholder + '\t' + b.kind + '\t' + b.placeholder + '\t' + desc);
  }
  return out;
}
[
  'T&C Pre-con Survey Report/Chilled_AHU_FCU.csv',
  'T&C Pre-con Survey Report/Mechanical_Fan.csv',
  'T&C Pre-con Survey Report/Split_Unit_VRF.csv'
].forEach(function (f) {
  console.log('\n== ' + f);
  rows(f).forEach(function (r) { console.log(r); });
});
