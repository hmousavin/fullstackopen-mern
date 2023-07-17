// TODO step1: test GET api/blogs using promises 
/* TODO step2: Once the test is finished, refactor the route handler 
               to use the async/await syntax instead of promises. */

const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(() => {
    Blog.deleteMany({})
    Blog.insertMany(helper.initialBlogs);
})

test('blogs are returned as json', () => {
    api.get('/api/blogs')
       .expect(200)
       .expect('Content-Type', '/application\/json')
}, 5000)

test('all blogs are returned', () => {
    api.get('/api/blogs').then((response) => {
        expect(response).toHaveLength(helper.initialBlogs.length)
    })
}, 5000)

test('blogs have a property, called _id', () => {
    api.get('/api/blogs').then((response) => {        
        expect(response.body[0]._id2).toBeDefined()
    })
}, 5000)

afterAll(() => {
    mongoose.connection.close()
})