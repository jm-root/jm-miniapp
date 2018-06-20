const MS = require('jm-ms-core')
let ms = new MS()

module.exports = function (service, opts = {}) {
  let auth = async opts => {
    let doc = await service.auth(opts.params.code)
    return doc
  }

  let wrap = service.wrapRoute
  let router = ms.router()
  router
    .add('/:code', 'get', wrap(auth))
  return router
}
