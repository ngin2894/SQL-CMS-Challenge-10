const db = require('./db/connections');

db.query('SELECT * FROM department', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to the database', res.rows);
    db.end();
});