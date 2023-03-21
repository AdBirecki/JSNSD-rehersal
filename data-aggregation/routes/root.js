'use strict'
const got = require('got');
const { err } = require('pino-std-serializers');

const paramsSchema = {
  id: { type: 'integer' }
}

const { BRAND_SRV_PORT = 28026, BOAT_SRV_PORT = 28017 } = process.env;
const BRAND_SRV_URL = `http://localhost:${BRAND_SRV_PORT}`
const BOAT_SRV_URL = `http://localhost:${BOAT_SRV_PORT}`

module.exports = async function (fastify, opts) {
  fastify.get('/:id', {
    schema: {
      params: paramsSchema
    }
  }, async function (request, reply) {
    const { id } = request.params
    try {
      const brandSrv = got(`${BRAND_SRV_URL}/${id}`)
      const boatSrv = got(`${BOAT_SRV_URL}/${id}`)

      const [brand, boat] = await Promise.all([brandSrv.json(), boatSrv.json()])
      return { ...brand, ...boat }
    } catch (error) {
      if (!error.response) throw error
      if (error.response.statusCode === 404) {
        throw fastify.httpErrors.notFound()
      }
      if(error.response.statusCode === 400) {
        throw fastify.httpErrors.badRequest()
      }
      throw error
    }
  })
}
