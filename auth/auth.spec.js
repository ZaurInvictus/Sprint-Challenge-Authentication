const request = require('supertest')
const db = require('../database/dbConfig.js')
const router = require('./auth-router')

describe('router', () => {
  // guarantees the table is cleaned out before any tests run
  beforeEach(async () => {
    await db('auth')
  })


  // TESTING REGISTER
  describe('POST /register', () => {
    it('should add a user into the db', async () => {
       await request(router)
       .post('/register')
       .send({
          username: "Zaur",
          password: "123"
       })

       const users = await db('auth')
       expect(users).toHaveLength(1)
    })
  })

})