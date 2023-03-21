'use strict'
const { bicycle } = require('../model/model')
const { promisify } = require('util')

const readAsync = promisify(bicycle.read)
const updateAsync = promisify(bicycle.update)
const createAsync = promisify(bicycle.create)
const deleteAsync = promisify(bicycle.del)
const uid = bicycle.uid

const dataSchema = {
  type: 'object',
  required: ['brand', 'color'],
  additionalProperties: false,
  properties: {
    brand: { type: 'string' },
    color: { type: 'string' }
  }
}
const bodySchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data'],
  properties: {
    data: dataSchema
  }
}

const idSchema = {
  id: { type: 'integer' }
}

const createResponseSchema = {
  201: idSchema
}

const readResponseSchema = {
  200: dataSchema
}

module.exports = async function (fastify, opts) {
  fastify.get('/:id', {
    schema: {
      params: idSchema,
      response: readResponseSchema
    }
  }, async function (request, reply) {
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

  fastify.post('/',
    {
      schema: {
        body: bodySchema,
        response: createResponseSchema
      }
    }, async function (request, reply) {
      const newID = uid()
      const { data } = request.body
      try {
        const id = await createAsync(newID, data)
        reply.code(201)
        return { id }
      } catch (error) {
        throw error
      }
    })

  fastify.post('/:id/update', {
    schema: {
      params: idSchema,
      body: bodySchema
    }
  }, async function (request, reply) {
    const { id } = request.params
    const { data } = request.body
    try {
      await updateAsync(id, data)
      reply.code(204)
    } catch (error) {
      if (error.message === 'not found') {
        throw fastify.httpErrors.notFound()
      }
      throw error
    }
  })

  fastify.put('/:id', {
    schema: {
      params: idSchema,
      body: bodySchema
    }
  }, async function (request, reply) {
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


  fastify.delete('/:id',
    {
      schema: {
        params: idSchema
      }
    }
    , async function (request, reply) {
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
