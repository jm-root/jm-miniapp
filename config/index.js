require('log4js').configure(require('path').join(__dirname, 'log4js.json'))
let config = {
  development: {
    port: 3000,
    lng: 'zh_CN',
    appid: 'wxe11eaeeac8341a58',
    appsecret: 'eb25014cd299d6960b66933321fec9fb',
    modules: {
      miniapp: {
        module: process.cwd() + '/lib'
      }
    }
  },
  production: {
    port: 80,
    lng: 'zh_CN',
    redis: 'redis://redis.db',
    modules: {
      miniapp: {
        module: process.cwd() + '/lib'
      }
    }
  }
}

const env = process.env.NODE_ENV || 'development'
config = config[env] || config['development']
config.env = env

module.exports = config
