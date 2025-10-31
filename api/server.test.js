// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const User = require('./auth/auth-users-model')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /auth/register', () => {
  const user = { username: 'juan', password: '1234' }
  test('Return the new User on valid credentials', async () => {
    const res = await request(server).post('/api/auth/register').send(user)
        expect(res.body.username).toMatch(user.username)
  })
  test('returns correct error message on empty username', async () => {
     const res = await request(server).post('/api/auth/register').send({})
      expect(res.body).toMatchObject({message: "username and password required"})
  })
  describe('[POST] /auth/login', () => {
    const user = { username: 'juan', password: '1234' }
    test('Returns the correct message on user login', async () => {
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(user)
      expect(res.body.message).toMatch('welcome, juan')
    })
    test('expect correct message on invalid user', async () => {
       await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send({ username: 'pedro', password: 'mango' })
      expect(res.body).toMatch('invalid credentials')
    })
  })
  describe('[GET] /api/jokes', () => {
     const user = { username: 'juan', password: '1234' }
    test('logged in users can get the jokes', async () => {
      await request(server).post('/api/auth/register').send(user)
      await request(server).post('/api/auth/login').send(user)
      const res = await request(server).get('/api/jokes').set({ authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Imp1YW4iLCJpYXQiOjE3NjE5Mzc4MDEsImV4cCI6MTc2MjAyNDIwMX0.bK0NyhtmS0Y64Gz-tuix_unyl5Yo4zohNcoXsk_pxa8' })
      expect(res.body).toHaveLength(3)
    })
    test('cannot get jokes on invalid token', async () => {
       const res = await request(server).get('/api/jokes').set({ authorization: 'Bearer 213as9cj123908hj40rfhn1d98n9183h9b8d9n90fj1028nd9n9a09cx019j2098813029-wmkasasjknakjnkscaod01dnakscnkefjccosmaliwnhd'})
       expect(res.body.message).toMatch('token invalid')
    })
  })
})