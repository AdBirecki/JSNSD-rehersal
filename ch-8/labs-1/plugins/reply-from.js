'use strict'

const replyFrom = require('@fastify/reply-from')
const fp = require('fastify-plugin')
module.exports = fp(async function (fastify, opts) {
    fastify.register(replyFrom, {
        errorHandler: false
    })
})