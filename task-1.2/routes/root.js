'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/param/:url', async function (request, reply) {
    const { url } = request.params

    if (!url) {
      throw fastify.httpErrors.badRequest()
    }
    return url.toUpperCase();
  })

  fastify.get('/url', async function (request, reply) {
    const { params } = request.query
    if (!params) {
      throw fastify.httpErrors.badRequest()
    }
    return params.toUpperCase();
  })
}
