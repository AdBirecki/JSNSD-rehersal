'use strict'


const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
    fastify.addHook('onRequest', async function (request, reply) {
        if (request.ip === '::1' && request.method === 'POST') {
            const error = Error('forbidden error')
            error.status = 403
            throw error
        }
    })
})