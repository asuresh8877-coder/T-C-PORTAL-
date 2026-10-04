const names = [
  'AIR TERMINALS.pdf',
  'Internal Training Slides/AIR TERMINALS.pdf',
  'Internal Training Slides.zip',
  'T&C Internal Training Slides.zip',
  'Training Slides.zip',
  'Winner Engineering Internal Training Series - Module I.pdf',
  '1. METHOD OF STATEMENT FOR  DUCT AIR LEAK TEST-R1.pdf',
  '1. Chilled AHU_FCU  Pre-Con Check  List Report  (1).pdf',
  'T&C Method of Statement.zip'
];
(async function () {
  for (const f of names) {
    const url = 'https://t-c-portal.vercel.app/' + f.split('/').map(encodeURIComponent).join('/');
    const r = await fetch(url, { method: 'HEAD' });
    console.log(r.status, r.headers.get('content-length') || '', f);
  }
})();
