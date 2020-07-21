/*jshint esversion: 6 */


let sqlite = require('sqlite3').verbose();
let q = require('q');
const dbName = 'surveyDb2';
let usersTableName = 'usersTable2';

class DataBase {

    constructor(dbName) {
        this.dbName = dbName;
        this.db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            }
        });
    }

    createTable() {
        let self = this;
        db.run(`CREATE TABLE ${usersTableName}(userId TEXT PRIMARY KEY, major TEXT, age TEXT, gender TEXT, engPerc TEXT, year TEXT, province TEXT,accessToMedia TEXT, accessToEngMen TEXT, hasTraveled TEXT, startedLearningAt TEXT, learningTime TEXT,score TEXT)`)
            .then(function (result) {}).fail(function (err) {
                console.error('error in createTable------------------->', err);
            });
        db.close((err) => {
            if (err) {
                console.error('error in createTable------------------->>', err.message);
            }
        });
    }

    addUserToDb(data) {
        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.error('Could not connect to database----------->', err);
            }

        });
        let defered = q.defer();
        data.userId = Math.floor(100000 + Math.random() * 900000);
        console.log('---------userId---------', data.userId);
        db.run(`INSERT INTO ${usersTableName}(userId, major, age, gender, engPerc, year, province, accessToMedia, accessToEngMen, hasTraveled, startedLearningAt, learningTime, score) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.userId, data.major, data.age, data.gender, data.engPerc, data.year, data.province, data.accessToMedia, data.accessToEngMen, data.hasTraveled, data.startedLearningAt, data.learningTime, data.score],
            function (err) {
                if (err) {
                    console.trace(err.message);
                    db.close((err) => {
                        if (err) {
                            console.error('errorInAddToDB------------->', err);
                        }
                    });
                    defered.reject({
                        code: 'userExists',
                        message: err
                    });
                }
                db.close((err) => {
                    if (err) {
                        console.error('errorInAddToDB------------->>', err);
                    }
                });
                defered.resolve({
                    message: `A row has been inserted with id: ${this.lastID}}`,
                    data: data.userId
                });

            });
        return defered.promise;
    }

    updateUser(data, feild) {
        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            }

        });
        let defered = q.defer();
        let sql = `UPDATE ${usersTableName}
            SET ${feild} = ?
            WHERE userId = ?`;
        db.run(sql, [data[feild], data.userId], function (err) {
            if (err) {
                console.trace(err.message);
                db.close((err) => {
                    if (err) {
                        console.error('errorInUpdate------------->', err);
                    }
                });
                defered.reject({
                    code: 'dbError',
                    message: err
                });
            }
            db.close((err) => {
                if (err) {
                    console.error('errorInUpdate------------->>', err);
                }
            });
            defered.resolve(`Row(s) updated: ${this.changes}`);
        });
        return defered.promise;
    }

    getUserFromDb(data) {
        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            }

        });
        let defered = q.defer();
        let sql = `SELECT userId userId,
                  major major,
                  age age,
                  gender gender, 
                  engPerc engPerc,
                  year year,
                  province province,
                  accessToMedia accessToMedia,
                  accessToEngMen accessToEngMen,
                  hasTraveled hasTraveled,
                  startedLearningAt startedLearningAt,
                  learningTime learningTime,
                  score score
           FROM ${usersTableName}
           WHERE userId  = ?`;
        db.get(sql, [data.userId], (err, row) => {
            if (err) {
                console.error('errorInGetFromDb------------->', err);
                db.close((err) => {
                    if (err) {
                        console.error('errorInGetFromDb------------->>', err);
                    }
                });
                defered.reject({
                    code: 'dbError',
                    message: err
                });
            }
            db.close((err) => {
                if (err) {
                    console.error('errorInGetFromDb------------->>>', err);
                }
            });
            defered.resolve(row);
        });
        return defered.promise;
    }

    getAllUsersFromDb() {
        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            }

        });
        let defered = q.defer();
        let sql = `SELECT userId userId,
                score score
               FROM ${usersTableName}`;
        db.get(sql, (err, rows) => {
            if (err) {
                console.error('errorInGetFromDb------------->', err);
                db.close((err) => {
                    if (err) {
                        console.error('errorInGetFromDb------------->>', err);
                    }
                });
                defered.reject({
                    code: 'dbError',
                    message: err
                });
            }
            db.close((err) => {
                if (err) {
                    console.error('errorInGetFromDb------------->>>', err);
                }
            });
            defered.resolve(rows);
        });
        return defered.promise;
    }

}

module.exports = DataBase;