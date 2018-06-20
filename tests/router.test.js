const $ = require('./service')

let router = null
beforeAll(async () => {
  await $.onReady()
  router = $.router()
})

let code = ''
test('auth', async () => {
  let doc = await router.get(`/auth/${code}`)
  console.log(doc)
  expect(doc.uri).toBeTruthy()
})
