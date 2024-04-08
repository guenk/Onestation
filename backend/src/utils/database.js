const sqlite3 = require('sqlite3').verbose();
let sql;

// Connection à la base de données
const db = new sqlite3.Database('db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

sql = `
    
`;

db.run(sql, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Tables created');
});

module.exports = db;