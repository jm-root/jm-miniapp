const MS = require('jm-ms-core')
const ms = new MS()

module.exports = function (service) {
  let auth = async opts => {
    return service.auth(opts.params.code)
  }

  const router = ms.router()
  router
    .add('/:code', 'get', auth)
  return router
}
