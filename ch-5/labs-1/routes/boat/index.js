'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')

const readAsync = promisify(boat.read)
const createAsync = promisify(boat.create)
const deleteAsync = promisify(boat.del)
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


  fastify.post('/', async function (request, reply) {
    const { data } = request.body
    const id = uid()
    try {
      await createAsync(id, data)
      reply.code(201)
      return { id }
    } catch (error) {
      if (error.message === 'resource exists') {
        throw fastify.httpErrors.conflict()
      }
      throw error
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
