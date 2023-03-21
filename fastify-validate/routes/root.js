'use strict'
const { bicycle } = require('../model/model')
const { promisify } = require('util')

const readAsync = promisify(bicycle.read)
const updateAsync = promisify(bicycle.update)
const createAsync = promisify(bicycle.create)
const deleteAsync = promisify(bicycle.del)
const uid = bicycle.uid


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
    const newID = uid()
    const { data } = request.body
    try {
      const id = await createAsync(newID, data)
      reply.code(204)
      return { id }
    } catch (error) {
      throw error
    }
  })

  fastify.post('/:id/update', async function (request, reply) {
    const { id } = request.params
    const { data } = request.body
    try {
      await updateAsync(id, data)
      reply.code(204)
      return {}
    } catch (error) {
      if (error.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw error
    }
  })

  fastify.put('/:id', async function (request, reply) {
    const { id } = request.params
    const { data } = request.body
    try {
      await createAsync(id, data)
      reply.code(201)
      return {}
    } catch (error) {
      if (error.message === 'resource exists') {
        await updateAsync(id, data)
        reply.code(204)
      } else {
        throw error
      }
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
