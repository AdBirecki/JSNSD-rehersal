'use strict'

const { boat } = require('../../model')
const { promisify } = require('util')

const readAsync = promisify(boat.read)
const deleteAsync = promisify(boat.del)
const createAsync = promisify(boat.create)
const uid = boat.uid

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await readAsync(id)
    } catch (error) {
      if (error.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw error
    }
  })

  fastify.post('/:id', async function (request, reply) {
    const { id } = request.params
    const { data } = request.data
    try {
      await createAsync(id, data)
      reply.code(201)
      return { id }
    } catch (error) {
      throw error;
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      await deleteAsync(id)
      reply.code(204)
    } catch (error) {
      if (error.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw error
    }
  })
}
