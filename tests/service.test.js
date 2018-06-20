const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})
