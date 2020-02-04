const MS = require('jm-ms-core')
const help = require('./help')
const auth = require('./auth')

const ms = new MS()
module.exports = function (opts = {}) {
  const service = this
  const router = ms.router()

  const decrypt = async opts => {
    const { sessionKey, iv, encryptedData } = opts.data
    return service.decryptData(sessionKey, iv, encryptedData)
  }

  const getWxaCodeUnlimit = async opts => {
    const ret = await service.getWxaCodeUnlimit(opts.data)
    return { ret }
  }

  router
    .use(help(service))
    .use('/auth', auth(service, opts))
    .add('/decrypt', 'post', decrypt)
    .add('/wxacodeunlimit', 'get', getWxaCodeUnlimit)
  return router
}
