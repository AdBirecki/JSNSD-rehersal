'use strict'
const dataStream = require('../../stream')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return dataStream()
  })
}
