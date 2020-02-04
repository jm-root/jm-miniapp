const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})

test('getAccessToken', async () => {
  const token = await service.getAccessToken()
  console.log(token)
  expect(token).toBeTruthy()
})

test('getWxaCodeUnlimit', async () => {
  const doc = await service.getWxaCodeUnlimit({ scene: '123' })
  console.log(doc)
  expect(doc).toBeTruthy()
})
