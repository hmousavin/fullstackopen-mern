const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "title1",
        "author": "author1",
        "url": "http://www.some_url.domain/page1.html",
        "likes": 15
    },
    {
        "title": "title2",
        "author": "author2",
        "url": "http://www.some_url.domain/page2.html",
        "likes": 31
    }        
]

beforeEach(() => {
    Blog.deleteMany({})
    
    let blogObject = new Blog(initialBlogs[0])
    blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    blogObject.save()
})

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}