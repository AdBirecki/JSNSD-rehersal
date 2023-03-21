'use strict'
const fs = require('fs')
const path = require('path')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const dataStream = path.resolve(__dirname, '..', 'data', 'text.txt')
    const stream = fs.createReadStream(dataStream, 'utf8')
    reply.type('application/octet-stream')
    return stream
  })
}
