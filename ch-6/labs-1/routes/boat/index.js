'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')

const uid = boat.uid
const asyncRead = promisify(boat.read);
const asyncCreate = promisify(boat.create)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await asyncRead(id);
    } catch (error) {
      if (error.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw error
    }
  })

  fastify.post('/', async function (request, reply) {
    const newId = uid()
    const { data } = request.body

    try {
      const id = await asyncCreate(newId, data)
      reply.code(201)
      return { id }
    } catch (error) {
      throw error;
    }
  })
}
