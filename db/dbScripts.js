
let sqlite = require('sqlite3').verbose();
const dbName = 'surveyDb2';
let usersTableName = 'usersTable2';

let db = new sqlite.Database(`${dbName}.db`, (err) => {
    if (err) {
        console.log('Could not connect to database', err);
    }
});

db.run(`CREATE TABLE ${usersTableName}(userId TEXT PRIMARY KEY, major TEXT, age TEXT, gender TEXT, engPerc TEXT, year TEXT, province TEXT,accessToMedia TEXT, accessToEngMen TEXT, hasTraveled TEXT, startedLearningAt TEXT, learningTime TEXT,score TEXT)`)

db.close((err) => {
if (err) {
    console.error('error in createTable------------------->>', err.message);
}
});