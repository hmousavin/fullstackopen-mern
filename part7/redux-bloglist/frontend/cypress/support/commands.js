/// <reference types="Cypress" />

const port = 3000;

Cypress.Commands.add("createUser", ({ name, username, password }) => {
  cy.request("POST", `http://localhost:${port}/api/users`, {
    username,
    name,
    password,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.visit(`http://localhost:${port}`);

  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.get('input[placeholder="the title of blog"]').type(title);
  cy.get('input[placeholder="the author of blog"]').type(author);
  cy.get('input[placeholder="the url of blog"]').type(url);
  cy.get("#create-blog").click();
});
