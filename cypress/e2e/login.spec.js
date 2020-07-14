describe("testing login", () => {
  it("can login with valid username and password", function () {
    const { email, password } = this.user;
    cy.visit("/login");
    cy.findByLabelText(/email/i)
      .type(email)
      .should("have.value", "ed@gmail.com");
    cy.findByLabelText(/password/i).type(password);
    cy.findByText(/submit/i)
      .click()
      .url()
      .should("eq", "http://localhost:8080/bookmarks");
  });
});
