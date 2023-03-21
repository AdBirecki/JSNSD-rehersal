'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
    fastify.addHook('onRequest', async function (request, reply) {
        if (request.ip === '::1') {
            throw fastify.httpErrors.forbidden();
        }
    })
})