const fs = require('fs');
const html = fs.readFileSync('room-airflow.html', 'utf8');
const last = html.split('<script>').pop().split('</script>')[0];
fs.writeFileSync('_room_syntax.js', last);
