const MS = require('jm-ms-core')
const wraper = require('./wraper')
const help = require('./help')
const auth = require('./auth')

let ms = new MS()
module.exports = function (opts = {}) {
  let service = this
  let router = ms.router()
  service.wrapRoute = wraper(service)
  let wrap = service.wrapRoute

  let decrypt = async opts => {
    return service.decryptData(opts.data)
  }

  router
    .use(help(service))
    .use('/auth', auth(service, opts))
    .add('/decrypt', 'post', wrap(decrypt))
  return router
}
