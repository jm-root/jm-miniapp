const axios = require('axios')
const event = require('jm-event')
const log = require('jm-log4js')
let logger = log.getLogger('weapp')

class Miniapp {
  /**
   * weapp service
   * @param {Object} opts
   * @example
   * opts参数:{
   *  appid: appid
   *  appsecret: appsecret
   * }
   * @return {Object} service
   */
  constructor (opts = {}) {
    event.enableEvent(this)
    this.ready = true

    this.config = opts
  }

  async onReady () {
    return this.ready
  }

  async auth (code) {
    const appid = this.config.appid
    const appsecret = this.config.appsecret
    let uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
    logger.debug(`auth: ${uri}`)
    let doc = await axios.get(uri)
    doc = doc.data
    return doc
  }
}

module.exports = Miniapp
