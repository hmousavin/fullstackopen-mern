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
      // log in user here
    })

    it('A blog can be created', function() {
      // ...
    })
  })
})