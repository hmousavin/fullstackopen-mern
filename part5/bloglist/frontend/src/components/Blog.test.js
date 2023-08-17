import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('blog component test', () => {
  test('renders both title & the author of blog', () => {
    const blog = {
      title: 'SelfTestingCode',
      author: 'martinfowler',
      likes: 1,
      url: 'https://martinfowler.com/bliki/SelfTestingCode.html'
    }

    const update = jest.fn()
    const remove = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={update} removeBlog={remove} />
    )
    const button = component.getByText('view')
    fireEvent.click(button) // press the show button

    expect(screen.getByText(blog.title)).toBeDefined()
    expect(screen.getByText(blog.author)).toBeDefined()
  })

  test('renders both url and the likes', () => {
    const blog = {
      title: 'The characterization of semantics',
      author: 'Edsger W. Dijkstra',
      likes: 1000,
      url: 'https://www.cs.utexas.edu/~EWD/ewd04xx/EWD401.PDF'
    }

    const update = jest.fn()
    const remove = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={update} removeBlog={remove} />
    )
    const button = component.getByText('view')
    fireEvent.click(button) // press the show button

    expect(screen.getByText(blog.url)).toBeDefined()
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('when the like button clicked twice, the event handler received as props called twice', () => {
    const blog = {
      title: '	Synchronisatie en sequencing',
      author: 'Edsger W. Dijkstra',
      likes: 2000,
      url: 'https://www.cs.utexas.edu/~EWD/ewd04xx/EWD405.PDF'
    }

    const mockUpdateBlog = jest.fn()
    const remove = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={remove} />
    )

    fireEvent.click(component.getByText('view')) // press the show button

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})