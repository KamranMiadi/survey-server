
let sqlite = require('sqlite3').verbose();
const dbName = 'surveyDb';
let usersTableName = 'usersTable';

let db = new sqlite.Database(`${dbName}.db`, (err) => {
    if (err) {
        console.log('Could not connect to database', err);
    }
});

db.run(`CREATE TABLE ${usersTableName}(userId TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, major TEXT, age TEXT, gender TEXT, engPerc TEXT, year TEXT, province TEXT, answers TEXT, score TEXT)`)

db.close((err) => {
if (err) {
    console.error('error in createTable------------------->>', err.message);
}
});