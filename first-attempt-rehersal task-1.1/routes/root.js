'use strict'

const { Readable, Stream } = require('stream')
const fs = require('fs')
const path = require('path')

module.exports = async function (fastify, opts) {
  fastify.get('/red', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/blue', async function (request, reply) {
    return 'plain text'
  })

  fastify.get('/green', async function (request, reply) {
    const pathToFile = path.resolve(__dirname, '../', 'mock-data/text.txt');
    const fileStream = fs.createReadStream(pathToFile, 'utf8')
    reply.type('application/octet-stream')
    return fileStream;
  })

  fastify.get('/green/reply', async function (request, reply) {
    const pathToFile = path.resolve(__dirname, '../', 'mock-data/text.txt');
    const fileStream = fs.createReadStream(pathToFile, 'utf8')
    setImmediate(() => {
      reply.type('application/octet-stream')
      reply.send(fileStream);
    })

    await reply
  })

  fastify.post('/green', async function (request, reply) {
    return 'blocked post'
  })
}
