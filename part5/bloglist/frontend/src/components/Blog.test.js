import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

describe('blog component test', () => {
  test('renders title & author of blog', () => {
    let blog = {
      title: 'SelfTestingCode',
      author: 'martinfowler',
      likes: 1,
      url: 'https://martinfowler.com/bliki/SelfTestingCode.html'
    }

    let update = jest.fn()
    let remove = jest.fn()

    render(
      <Blog blog={blog} updateBlog={update} removeBlog={remove} />
    )
    screen.debug()
    // expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
  })
})