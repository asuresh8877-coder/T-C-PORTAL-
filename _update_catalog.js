const fs = require('fs');
const vm = require('vm');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('catalog.js', 'utf8'), ctx);
const cat = ctx.window.WEPL_CATALOG;

const mosByNum = {
  '1': {
    path: '1. METHOD OF STATEMENT FOR  DUCT AIR LEAK TEST-R1.pdf',
    title: '1. METHOD OF STATEMENT FOR DUCT AIR LEAK TEST-R1'
  },
  '2': {
    path: '2. METHOD OF STATEMENT FOR CHILLED WATER PIPE PRESSURE TEST-R1.pdf',
    title: '2. METHOD OF STATEMENT FOR CHILLED WATER PIPE PRESSURE TEST -R1'
  },
  '3': {
    path: '3. METHOD OF STATEMENT FOR PRESSURE TESTING OF COPPER PIPE (RE.pdf',
    title: '3. METHOD OF STATEMENT FOR PRESSURE TESTING OF COPPER PIPE (REFRIGERANT)-R1'
  },
  '4': {
    path: '4. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANIC.pdf',
    title: '4. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANICAL VENTILATION TESTING AND AIR BALANCING (AHU CHWP SYSTEM) R1'
  },
  '5': {
    path: '5. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANICAL VE.pdf',
    title: '5. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANICAL VENTILATION TESTING AND AIR BALANCING (FCU DUCTED CHWP SYSTEM ) R1'
  },
  '6': {
    path: '6. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANIC.pdf',
    title: '6. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANICAL VENTILATION TESTING AND AIR BALANCING (AHU REF.PIPE SYSTEM) R1'
  },
  '7': {
    path: '7. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANIC.pdf',
    title: '7. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANICAL VENTILATION TESTING AND AIR BALANCING ( FCU DUCTED REF.PIPE SYSTEM) R1'
  },
  '10': {
    path: '10.METHOD OF SATEMENT FOR MECHANICAL VENTILATION FAN (.pdf',
    title: '10. METHOD OF STATEMENT FOR MECHANICAL VENTILATION FAN (FAF & EAF)-R1'
  },
  '11': {
    path: '11. ROOM PRESSURE TESTING (POSITIVE & NEGATIVE) FOR ACMV S.pdf',
    title: '11. METHOD OF STATEMENT FOR ROOM PRESSURE TESTING (POSITIVE & NEGATIVE) FOR ACMV SYSTEMS'
  },
  '12': {
    path: '12. AIR BALANCING USING OF WITH EQUIPMENT-R1.pdf',
    title: '12. METHOD OF STATEMENT FOR AIR CONDITIONING & MECHANICAL VENTILATION (ACMV) SYSTEM TESTING, COMMISSIONING, AIR BALANCING USING OF WITH EQUIPMENT-R1'
  },
  '13': {
    path: '13. METHOD OF STATEMENT FOR LOCAL CONTROL PANEL FOR AC.pdf',
    title: '13. METHOD OF STATEMENT FOR LOCAL CONTROL PANEL FOR ACMV EQUIPMENT-R1'
  }
};

const oldByNum = {};
cat.mos.forEach(function (item) {
  const num = String(item.file).match(/^(\d+)/);
  if (num) oldByNum[num[1]] = item.path;
});

const chwp = '8. METHOD OF STATEMENT FOR CEILING CASSETTE & WALL MOUNTED UNI.pdf';
const vrf = '8. METHOD OF STATEMENT FOR CEILING CASSETTE & WALL MOU.pdf';
mosByNum['8'] = {
  path: chwp,
  title: '8. METHOD OF STATEMENT FOR CEILING CASSETTE & WALL MOUNTED UNIT (CHWP FCU) SYSTEM AIR BALANCING- R1'
};
mosByNum['9'] = {
  path: vrf,
  title: '9. METHOD OF STATEMENT FOR CEILING CASSETTE & WALL MOUNTED UNIT (VRF FCU) SYSTEM AIR BALANCING - R1'
};

cat.mos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'].map(function (num) {
  const row = mosByNum[num];
  const item = {
    id: row.path,
    file: row.path,
    path: row.path,
    title: row.title
  };
  if (oldByNum[num]) item.local = oldByNum[num];
  return item;
});

const preconPublic = {
  '1': '1. Chilled AHU_FCU  Pre-Con Check  List Report  (1).pdf',
  '2': '2. Mechanical Fan  Pre-Con Check  List Report  (1).pdf',
  '3': '3. Split Unit _VRF  Pre-Con  Check  List Report  (1).pdf'
};
cat.precon.forEach(function (item) {
  const num = String(item.file).match(/^(\d+)/);
  if (!num || !preconPublic[num[1]]) return;
  item.local = item.path;
  item.path = preconPublic[num[1]];
  item.file = item.path;
  item.id = item.path;
});

cat.trainingSlides.forEach(function (item) {
  item.local = item.path;
  item.path = item.file;
  item.id = item.file;
});

fs.writeFileSync('catalog.js', 'window.WEPL_CATALOG = ' + JSON.stringify(cat, null, 2) + ';\n');
console.log('mos', cat.mos.length, 'precon', cat.precon.length, 'slides', cat.trainingSlides.length);
