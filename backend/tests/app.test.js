const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../app')

const dotenv = require('dotenv');
dotenv.config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
await mongoose.connection.close();
});

describe("GET /", () => {
    it('should return \"Express Server\"', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("Express Server")
    })
})

describe("GET /texts", () => {
    it("should return an empty array or an array of elements", async () => {
        const res = await request(app).get('/texts')
        expect(res.statusCode).toBe(200)
        expect(res.body.texts.filter(e => typeof e !== 'string')).toStrictEqual([])
    })
})

describe("POST /text", () => {
    it("should return an array in which the string \"hello world\" is the last element", async () => {
        const res = await request(app).post('/text').send({
            text: 'hello world'
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.texts.slice(-1)[0]).toBe('hello world')
    })

    it("should return an error message", async () => {
        const res = await request(app).post('/text').send({})
        expect(res.statusCode).toBe(400)
        expect(res.body.err).toBe('invalid text')
    })
})

describe("DELETE /text", () => {
    it("should return the element deleted", async () => {
        let res = await request(app).get('/texts')
        const ogLength = res.body.texts.length
        res = await request(app).delete('/text').send({
            text: "hello world"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.text).toBe('hello world')
        if(ogLength > 0) {
            expect(res.body.texts.length < ogLength).toBe(true)
        }
    })

    it('should return an error message', async () => {
        const res = await request(app).delete('/text').send({})
        expect(res.statusCode).toBe(400)
        expect(res.body.err).toBe('invalid text')
    })
})