describe('Blog app', function() {
  const port = 3000
  beforeEach(function() {
    cy.request('POST', `http://localhost:${port}/api/testing/reset`)
  })

  it('Login form is shown', function() {
    cy.visit(`http://localhost:${port}/`)

    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit(`http://localhost:${port}`)

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai-salainen logged in ')
    })

    it('fails with wrong credentials', function() {
      cy.visit(`http://localhost:${port}`)

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('#notification')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.get('#toggle-visibliy-btn').click()

      const blog = {
        title: 'Computing Machinery and Intelligence',
        author: 'Alan Turing',
        url: 'https://www.csee.umbc.edu/courses/471/papers/turing.pdf'
      }

      cy.get('input[placeholder="the title of blog"]').type(blog.title)
      cy.get('input[placeholder="the author of blog"]').type(blog.author)
      cy.get('input[placeholder="the url of blog"]').type(blog.url)

      cy.get('#create-blog').click()

      cy.contains(`new blog ${blog.title} just successfully added!`)
      cy.contains(blog.title)
    })

    describe('When a blog created', function() {
      beforeEach(function() {
        const blog = {
          title: 'Computing Machinery and Intelligence',
          author: 'Alan Turing',
          url: 'https://www.csee.umbc.edu/courses/471/papers/turing.pdf'
          user: '64e61a25e585512690c0c7c2',
        }
        cy.createBlog(blog)
      })

      it('A user can like a blog', function() {
        cy.get('#view-contents-btn').click()

        cy.contains('likes 0')
        cy.get('#like-blog-btn').click()
        cy.contains('likes 1')
      })

      it('A user who created a blog can delete it', function() {

      })

      it('Only the creator of blog can delete it not anyone else', function(){

      })

      it('The shown blogs are ordered according to number of likes, so the most likes are on top', function() {

      })
    })
  })
})