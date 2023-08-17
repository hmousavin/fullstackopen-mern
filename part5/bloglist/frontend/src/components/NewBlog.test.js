import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlog from './NewBlog'

describe('newBlog component test', () => {
  test('when creating new blog, the event handler called with proper details', () => {
    const blog = {
      title: 'An elephant inspired by the Dutch National Flag',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD608.html'
    }

    const mockCreateBlog = jest.fn()

    render(
      <NewBlog blog={blog} createBlog={mockCreateBlog} newBlogVisibility={true} />
    )

    const titleInput = screen.getByPlaceholderText('the title of blog')
    userEvent.type(titleInput, blog.title)
    const authorInput = screen.getByPlaceholderText('the author of blog')
    userEvent.type(authorInput, blog.author)
    const urlInput = screen.getByPlaceholderText('the url of blog')
    userEvent.type(urlInput, blog.url)

    const sendButton = screen.getByText('create')
    userEvent.click(sendButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual(blog)
  })
})