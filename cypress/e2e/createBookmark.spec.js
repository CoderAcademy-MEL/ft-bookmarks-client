import { bookmarkBuilder } from '../support/generate'

describe("create bookmark", () => {
  beforeEach(() => {
    cy.fixture("token").then(({ jwt }) => {
      window.localStorage.setItem("token", jwt);
    });
  });
  it("create a new bookmark", () => {
    const bookmark = bookmarkBuilder()
    cy.visit("/bookmarks/create");
    cy.findByLabelText(/Title/).type(bookmark.title);
    cy.findByLabelText(/Url/).type(bookmark.url);
    cy.findByLabelText(/Description/).type(bookmark.description);
    cy.get('form').submit()
    .url()
    .should('eq', 'http://localhost:8080/bookmarks')
  });
});
