import { userBuilder } from "../support/generate";

describe("signing up as user", () => {
  it("should register as a new user", () => {
    const user = userBuilder();
    cy.visit("/");
    cy.findByText(/Sign Up/i).click();
    cy.findByLabelText(/Email/).type(user.email);
    cy.findByLabelText(/Password/).type(user.password);
    cy.findByText(/Submit/).click();
    cy.url().should("eq", "http://localhost:8080/bookmarks");
    cy.window().its("localStorage.token").should("be.a", "string");
    cy.findByTestId("no-bookmarks", {timeout: 500});
  });
});
