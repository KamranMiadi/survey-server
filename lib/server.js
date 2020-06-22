/*jshint esversion: 6 */



const fastify = require('fastify')({
    logger: true
});
const path = require('path');

// Enable the fastify CORS plugin
fastify.register(require('fastify-cors'), {
    origin: '*',
    credentials: true
 });

 fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
  });

fastify.register(require('./personalInfo'));
fastify.register(require('./answers'));
fastify.register(require('./score'));

fastify.get('/', function (req, reply) {
    reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })

fastify.listen(3000,'0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`);
});