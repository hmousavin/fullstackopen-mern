const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    test('dummy returns one', () => {
        const blogs = []
    
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })

    const listOfBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'title1',
        author: 'author1',
        url: 'http://www.some_url.domain/page1.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '4a676234d17f85a422aa71b5',
        title: 'title2',
        author: 'author2',
        url: 'http://www.some_url.domain/page2.html',
        likes: 12,
        __v: 0
      }
    ]
  
    test('when list has only two blog, equals the likes of both of them', () => {
      expect(listHelper.totalLikes(listOfBlogs)).toBe(17)
    })
})

describe('favorite blog', () => {
    const listOfBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'title1',
          author: 'author1',
          url: 'http://www.some_url.domain/page1.html',
          likes: 15,
          __v: 0
        },
        {
          _id: '4a676234d17f85a422aa71b5',
          title: 'title2',
          author: 'author2',
          url: 'http://www.some_url.domain/page2.html',
          likes: 102,
          __v: 0
        },
        {
            _id: '4a642234aa77685a12d17fb5',
            title: 'title3',
            author: 'author3',
            url: 'http://www.some_url.domain/page3.html',
            likes: 7,
            __v: 0
        }
    ]
    
    test('when give a list of blogs, return the object which has most likes', () => {
        expect(listHelper.favoriteBlog(listOfBlogs)).toEqual(listOfBlogs[1]);
    })
})

describe('most blog', () => {
    const listOfBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'title1',
          author: 'author1',
          url: 'http://www.some_url.domain/page1.html',
          likes: 15,
          __v: 0
        },
        {
          _id: '4a676234d17f85a422aa71b5',
          title: 'title2',
          author: 'author2',
          url: 'http://www.some_url.domain/page2.html',
          likes: 102,
          __v: 0
        },
        {
            _id: '4a642234aa77685a12d17fb5',
            title: 'title3',
            author: 'author1',
            url: 'http://www.some_url.domain/page3.html',
            likes: 7,
            __v: 0
        },
        {
            _id: '4a676234d17f85a422aa71b5',
            title: 'title4',
            author: 'author3',
            url: 'http://www.some_url.domain/page4.html',
            likes: 23,
            __v: 0
        },
    ]
    
    test('when give a list of blogs, return the author with most blogs', () => {
        expect(listHelper.mostBlogs(listOfBlogs)).toEqual({'author': 'author1', 'blogs': 2});
    })
})

describe('most likes', () => {
    const listOfBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'title1',
          author: 'author1',
          url: 'http://www.some_url.domain/page1.html',
          likes: 15,
          __v: 0
        },
        {
          _id: '4a676234d17f85a422aa71b5',
          title: 'title2',
          author: 'author2',
          url: 'http://www.some_url.domain/page2.html',
          likes: 102,
          __v: 0
        },
        {
            _id: '4a642234aa77685a12d17fb5',
            title: 'title3',
            author: 'author3',
            url: 'http://www.some_url.domain/page3.html',
            likes: 7,
            __v: 0
        },
        {
            _id: '4a676234d17f85a422aa71b5',
            title: 'title4',
            author: 'author2',
            url: 'http://www.some_url.domain/page4.html',
            likes: 203,
            __v: 0
        }
    ]
    
    test('when give a list of blogs, return the author with most likes', () => {
debugger        
        expect(listHelper.mostLikes(listOfBlogs)).toEqual({'author': 'author2', 'likes': 305});
    })
})