import { bookmarkBuilder } from '../support/generate'

describe("when adding text to make a new bookmark user", () => {
  it.only("should be able to submit the form and be redirected to the /bookmarks page", () => {
    cy.getUser().then((user) => {
      cy.login(user.email, user.password)
      const { title, url, description } = bookmarkBuilder()
      cy.visit("/bookmarks/create");
      cy.typeInBookmarkDetails(title, url, description)
      cy.get('form').submit()
      .url()
      .should('eq', 'http://localhost:8080/bookmarks')
    })
  });
});