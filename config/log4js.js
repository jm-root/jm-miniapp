module.exports = {
  appenders: {
    console: { type: 'console' },
    weapp: {
      type: 'dateFile',
      filename: 'logs/weapp',
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'console' ], level: 'info' },
    weapp: { appenders: [ 'console', 'weapp' ], level: 'info' }
  }
}
