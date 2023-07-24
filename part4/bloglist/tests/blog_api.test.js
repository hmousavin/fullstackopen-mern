const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('../test_helpers/blogs')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs);
})

describe('receiving posts from server', () => {
    test('posts are returned as json', async () => {
        await api.get('/api/blogs')
                 .expect(200)
                 .expect('Content-Type', 'application\/json; charset=utf-8')
    }, 500)
    
    test('each post have a property, called "id" not "_id"', async () => {
        const response = await api.get('/api/blogs');
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    }, 500)
})

describe('making new blog post', () => {
    test('a valid blog post can be added', async () => {
        const newPost = {
            "title": "title100",
            "author": "author100",
            "url": "http://www.some_url.domain/page100.html",
            "likes": 100
        }
        
        const response = await api.post('/api/blogs', newPost)
        expect(response.status).toBe(201)
        expect(JSON.parse(response.text).v).toBe(0)
    }, 500)
    
    test('a post without likes property, could be added with default, zero likes', async () => {
        const newPost = {
            "title": "title200",
            "author": "author200",
            "url": "http://www.some_url.domain/page200.html",
        }
        
        await api.post('/api/blogs').send(newPost);
    
        const allBlogs = await helper.blogsInDb()
        expect(allBlogs.find(b => b.title == "title200").likes).toBe(0)
    }, 500)
    
    test('without a title, any new post is rejected with bad-request', async () => {
        const newPost = {
            "author": "author200",
            "url": "http://www.some_url.domain/page200.html",
            "likes": 10
        }
        
        const response = await api.post('/api/blogs').send(newPost);
        expect(response.status).toBe(400)
    }, 500)
})

describe('remove blog posts on server', () => {
    test('deleting a single blog post', async() => {
        const allBlogs = await helper.blogsInDb()
        const firstBlog = allBlogs[0]

        await api.delete(`/api/blogs/${firstBlog.id}`).expect(204)
    }, 500)
})

describe('modify a post on server', () => {
    test('updating number of likes on a target blog post', async() => {
        let allBlogs = await helper.blogsInDb()
        let justAnotherBlog = allBlogs[0]
        justAnotherBlog.likes += 10

        await api.put(`/api/blogs/${justAnotherBlog.id}`)
                 .send({likes: justAnotherBlog.likes})
                 .expect(200)

        allBlogs = await helper.blogsInDb()
        expect(allBlogs[0].likes).toBe(justAnotherBlog.likes)
    }, 500)
})

afterAll(async () => {
    await mongoose.connection.close()
})