const request = require('supertest')
const db = require('../database/dbConfig.js')
const server = require('../api/server')
const Users = require('../jokes/users-model')

describe("server", () => {

  // REGISTER TEST
  describe("Register", () => {
    //clear db data before testing
    beforeEach(async () => {
        await db("users").truncate();
    });

    const credentials = { username: "zaur", password: "123" };

    it("should return a status 201", () => {
        let response
        return request(server)
        .post('/api/auth/register')
        .send(credentials)
        .then(res => {
            response = res
            expect(response.status).toBe(201)
        })
    });

    it('should return a welcome message', () => {
        const message = "Welcome zaur! You have been successfully registered!"
        let response
        return request(server)
        .post('/api/auth/register')
        .send(credentials)
        .then(res => {
            response = res
            expect(response.body.message).toEqual(message)
        })
    })
   })


  // LOGIN TEST
  describe('Login', () => {
    const credentials = { username: "zaur", password: "123" };   

    it('should return a successful status code', () => {
        let response
        return request(server)
        .post('/api/auth/login')
        .send(credentials)
        .then(res => {
            response = res
            expect(response.status).toBe(200)
        })
    })

    it('should return a welcome message', () => {
        let message = "Welcome zaur! Token"
        
        let response
        return request(server)
        .post('/api/auth/login')
        .send(credentials)
        .then(res => {
            response = res
            expect(response.body.message).toEqual(message)
        })
      })
     })

})
