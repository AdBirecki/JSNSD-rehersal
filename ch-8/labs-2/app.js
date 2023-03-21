'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastifyHttpProxy = require('@fastify/http-proxy')
const fastifySensible = require('@fastify/sensible')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines
  fastify.register(fastifySensible)

  fastify.register(fastifyHttpProxy, {
    upstream: 'https://news.ycombinator.com/',
    // async preHandler(request, reply) {
    //   if (request.query.token !== 'abc') {
    //     throw fastify.httpErrors.unauthorized()
    //   }
    // }
  })

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'plugins'),
  //   options: Object.assign({}, opts)
  // })

  // // This loads all plugins defined in routes
  // // define your routes in one of these
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'routes'),
  //   options: Object.assign({}, opts)
  // })
}
