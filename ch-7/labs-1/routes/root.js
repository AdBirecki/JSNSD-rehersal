'use strict'
const got = require('got')

const { BOAT_SERVICE_PORT = 48096, BRAND_SERVICE_PORT = 48104 } = process.env

const BOAT_SERVICE_URL = `http://localhost:${BOAT_SERVICE_PORT}`
const BRAND_SERVICE_URL = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params

    if (!Number.isInteger(Number(id))) {
      throw fastify.httpErrors.badRequest()
    }

    try {
      const boat = await got(`${BOAT_SERVICE_URL}/${id}`).json()
      const brand = await got(`${BRAND_SERVICE_URL}/${boat.brand}`).json()

      return { id: boat.id, color: boat.color, brand: brand.name }
    } catch (error) {
      if (error.response.statusCode === 404) {
        throw fastify.httpErrors.notFound()
      }
      if (error.response.statusCode === 400)
        throw fastify.httpErrors.badRequest()
    }
    return { root: true }
  })
}
