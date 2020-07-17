import { userBuilder } from '../support/generate'

describe("when clicking on login from the homepage user", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId("login").click();
  });

  it("should go to the login page", () => {
    cy.url().should("include", "/login");
  });

  it("should be able to type into inputs", () => {
    const { email, password } = userBuilder()
    cy.typeInLoginCredentials(email, password)
    cy.get("form input").first().should("contain.value", email)
  })
});

describe("with the incorrect login credentials user", () => {  
  it("should receive an error message above the login form", () => {
    cy.visit("/login")
    const { email, password } = userBuilder()
    cy.typeInLoginCredentials(email, password)
    cy.get("form").submit()
    cy.findByTestId("login-error").should("contain.text", "Incorrect credentials")
  })
})

describe("with the correct login credentials user", () => {
  it("should be able to click on submit and be navigated to /bookmarks", () => {
    cy.getUser().then(({ email, password }) => {
      cy.visit("/login")
      cy.typeInLoginCredentials(email, password)
      cy.get("form").submit()
      cy.url().should('eql', "http://localhost:8080/bookmarks")
      .window().its('localStorage.token').should('be.a', 'string')
    })
  });
});