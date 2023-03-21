'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    schema: {
        query: {
          type: 'object',
          required: ['url'],
          additionalProperties: false,
          properties: {
            url: { type: 'string' }
          }
        }
    }
  }, async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (error) {
      throw fastify.httpErrors.badRequest('my bad reuest')
    }
    return reply.from(url)
  })
}
