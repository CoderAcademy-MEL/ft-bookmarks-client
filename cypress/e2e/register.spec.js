import { userBuilder } from "../support/generate";

describe("signing up as user", () => {
  it("should register as a new user", () => {
    const user = userBuilder();
    cy.visit("/");
    cy.findByTestId("sign-up").click();
    cy.typeInLoginCredentials(user.email, user.password)
    cy.get('form').submit()
    cy.url().should("eq", "http://localhost:8080/bookmarks");
    cy.findByTestId("no-bookmarks", {timeout: 500}).should("exist")
  });
});
