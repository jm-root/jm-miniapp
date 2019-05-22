const axios = require('axios')
const error = require('jm-err')
const event = require('jm-event')
const log = require('jm-log4js')
const Redis = require('ioredis')
const WXBizDataCrypt = require('./WXBizDataCrypt')
let logger = log.getLogger('weapp')

class Miniapp {
  /**
   * weapp service
   * @param {Object} opts
   * @example
   * opts参数:{
   *  appid: appid
   *  appsecret: appsecret
   *  redis: redis server
   * }
   * @return {Object} service
   */
  constructor (opts = {}) {
    event.enableEvent(this)
    this.redis = new Redis(opts.redis || {})
    this.ready = true

    this.config = opts
  }

  async onReady () {
    return this.ready
  }

  async getAccessToken () {
    const {appid, appsecret} = this.config
    const {redis} = this
    const key = `weapp:${appid}:accessToken`
    const token = await redis.get(key)
    if (token) return token
    {
      const uri = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
      const doc = await axios.get(uri)
      const {access_token: token, expires_in: expire, errcode: err, errmsg: msg} = doc.data
      if (err) {
        throw error.err({err, msg})
      }
      await redis.set(key, token, 'EX', expire)
      return token
    }
  }

  async auth (code) {
    const {appid, appsecret} = this.config
    let uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
    logger.debug(`auth: ${uri}`)
    let doc = await axios.get(uri)
    doc = doc.data
    return doc
  }

  async getWxaCodeUnlimit (opts) {
    const {appid} = this.config
    const {redis} = this
    const key = `weapp:${appid}:wxaCodeUnlimit:${JSON.stringify(opts)}`
    const doc = await redis.get(key)
    if (doc) return doc
    {
      const token = await this.getAccessToken()
      let uri = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`
      let doc = await axios.post(uri, opts)
      const {errcode: err, errmsg: msg} = doc.data
      if (err) {
        throw error.err({err, msg})
      }
      const data = doc.data.toString()
      await redis.set(key, data)
      return data
    }
  }

  decryptData (sessionKey, iv, encryptedData) {
    const pc = new WXBizDataCrypt(this.config.appid, sessionKey)
    return pc.decryptData(encryptedData, iv)
  }
}

module.exports = Miniapp
