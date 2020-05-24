/*jshint esversion: 8 */
let DataBase = require('../db/db.js');
let db = new DataBase('surveyDb');
async function routes(fastify, options) {
    fastify.post('/answers', async (request, reply) => {
        db.updateUser(request.data, 'answers')
            .then(result => {
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({
                        message: 'user answers updated',
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