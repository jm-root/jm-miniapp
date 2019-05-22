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

  const decrypt = async opts => {
    const {sessionKey, iv, encryptedData} = opts.data
    return service.decryptData(sessionKey, iv, encryptedData)
  }

  const getWxaCodeUnlimit = async opts => {
    const ret = await service.getWxaCodeUnlimit(opts.data)
    return {ret}
  }

  router
    .use(help(service))
    .use('/auth', auth(service, opts))
    .add('/decrypt', 'post', wrap(decrypt))
    .add('/wxacodeunlimit', 'get', wrap(getWxaCodeUnlimit))
  return router
}
