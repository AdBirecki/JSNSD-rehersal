'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')

const readAsync = promisify(boat.read)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await readAsync(id)
    } catch (error) {
      if (error.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw error;
    }
  })
}
