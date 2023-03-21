'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.type('application/octet-stream')
    return reply.sendFile('secondary.html')
  })
}
