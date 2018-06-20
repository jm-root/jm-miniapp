const MS = require('jm-ms-core')
const wraper = require('./wraper')
const help = require('./help')
const auth = require('./auth')

let ms = new MS()
module.exports = function (opts = {}) {
  let service = this
  let router = ms.router()
  service.wrapRoute = wraper(service)
  router
    .use(help(service))
    .use('/auth', auth(service, opts))
  return router
}
