const request = require('supertest')
const db = require('../database/dbConfig.js')
const server = require('../api/server')


describe("Server", () => {

  // REGISTER TEST
  describe("Register", () => {
    //clear db data before testing
    beforeEach(async () => {
        await db("users").truncate();
    });

    const credentials = { username: "zaur", password: "123" };

    it("should return a status 201", () => {
        return request(server)
        .post('/api/auth/register')
        .send(credentials)
        .then(res => {
            expect(res.status).toBe(201)
        })
    });

    it('should return a welcome message', () => {
        const message = "Welcome zaur! You have been successfully registered!"
        return request(server)
        .post('/api/auth/register')
        .send(credentials)
        .then(res => {
            expect(res.body.message).toEqual(message)
        })
    })
   })


  // LOGIN TEST
  describe('Login', () => {
    const credentials = { username: "zaur", password: "123" };   

    it('should return a successful status code', () => {
        return request(server)
        .post('/api/auth/login')
        .send(credentials)
        .then(res => {
            expect(res.status).toBe(200)
        })
    })

    it('should return a welcome message', () => {
        let message = "Welcome zaur! Token"
        
        return request(server)
        .post('/api/auth/login')
        .send(credentials)
        .then(res => {
            expect(res.body.message).toEqual(message)
        })
      })
     })

})
