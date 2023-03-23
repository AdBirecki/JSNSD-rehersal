'use strict'

const { Readable } = require("stream")


async function* toUpperCase(res) {
  for await (const chunk of res) {
    yield chunk.toString('utf8').toUpperCase()
  }
}

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (error) {
      throw fastify.httpErrors.badRequest()
    }
    return reply.from(url, {
      onResponse(request, reply, res) {
        reply.send(Readable.from(toUpperCase(res)))
      }
    })

  })
}
