// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const User = require('./auth/auth-users-model')
test('sanity', () => {
  expect(true).toBe(false)
})


describe('[POST] /auth/register', () => {
  test('Return the new User on valid credentials', () => {
    
  })
})