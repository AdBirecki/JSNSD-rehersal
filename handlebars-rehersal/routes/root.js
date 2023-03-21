'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    const { name, surname } = request.query

    return reply.view('index.hbs', { name, surname })
  })
}
