/*jshint esversion: 6 */


let sqlite = require('sqlite3').verbose();
let q = require('q');
const dbName = 'surveyDb';
let usersTableName = 'usersTable';

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
        db.run(`CREATE TABLE ${usersTableName}(userId TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, major TEXT, age TEXT, gender TEXT, engPerc TEXT, year TEXT, province TEXT, answers TEXT, score TEXT)`)
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
        db.run(`INSERT INTO ${usersTableName}(userId, firstName, lastName, major, age, gender, engPerc, year, province, answers, score) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.userId, data.firstName, data.lastName, data.major, data.age, data.gender, data.engPerc, data.year, data.province, data.answers, data.score],
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
                defered.resolve(`A row has been inserted with id: ${this.lastID}`);

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
                  firstName firstName,
                  lastName lastName,
                  major major,
                  age age,
                  gender gender, 
                  engPerc engPerc,
                  year year,
                  province province,
                  answers answers,
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
                      firstName firstName,
                      lastName lastName,
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