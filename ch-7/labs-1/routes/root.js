'use strict'
const { BRAND_SERVICE_PORT = 6000, BOAT_SERVICE_PORT = 4000 } = process.env
const BRAND_SERVICE_URL = `http://localhost:${BRAND_SERVICE_PORT}`
const BOAT_SERVICE_URL = `http://localhost:${BOAT_SERVICE_PORT}`
const got = require('got')

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
      if (!error.response) {
        throw error;
      }
      if (error.response.statusCode === 404) {
        const error = Error()
        error.statusCode = 404
        throw error
      }
      if (error.response.statusCode === 400) {
        const error = Error()
        error.statusCode = 400
        throw error
      }
      throw error;
    }
  })
}
