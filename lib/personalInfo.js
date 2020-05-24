/*jshint esversion: 8 */
let DataBase = require('../db/db.js');
let db = new DataBase('surveyDb');
async function routes(fastify, options) {
    fastify.post('/personalInfo', async (request, reply) => {
        db.adUserToDb(request.data)
            .then(result => {
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({
                        message: 'userAdded',
                        response: result
                    });
            }).fail(err => {
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({
                        error: err
                    });
            });
    });
}

module.exports = routes