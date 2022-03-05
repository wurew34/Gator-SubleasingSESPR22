describe("Landing", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has a title", () => {
    cy.contains("Welcome to Gator Subleasing!");
  });

  it("has subtext", () => {
    cy.contains(
      "The web application we wish to move forward with will be an augmented subleasing platform for UF Students. The features we wish to implement include viewing, posting, chat messaging, and possibly web scraping the data off of facebook marketplace."
    );
  });

  it("has a navbar", () => {
    cy.get("#app-bar");
  });

  it("has a clickable button to redirect to homepage", () => {
    cy.get('[alt="logo"]').click();
  });

  it("has a clickable button to redirect to login form", () => {
    cy.get("button").click();
    cy.contains("Sign in");
    cy.get("form");
  });
});
