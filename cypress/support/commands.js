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
