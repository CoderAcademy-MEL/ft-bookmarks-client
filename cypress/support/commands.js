<<<<<<< HEAD
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';
=======
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getUser', () => {
  cy.fixture("user.json").then((user) => user)
})

Cypress.Commands.add("typeInLoginCredentials", (email, password) => {
  cy.findByLabelText(/email/i).type(email)
  cy.findByLabelText(/password/i).type(password)
})

Cypress.Commands.add("typeInBookmarkDetails", (title, url, description) => {
  cy.findByLabelText(/Title/).type(title);
  cy.findByLabelText(/Url/).type(url);
  cy.findByLabelText(/Description/).type(description);
})

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/login",
    body: { auth: { email, password }}
  })
  .then((response) => {
    localStorage.setItem("token", response.body.jwt)
  })
})
>>>>>>> cypress-implementation-2
