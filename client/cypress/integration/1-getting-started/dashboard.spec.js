import "@testing-library/cypress/add-commands";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  it("contains the app bar", () => {
    cy.get("#app-bar");
    cy.get("img");
    cy.findByRole("button", { name: /account of current user/i });
    cy.findByRole("button", { name: /logout/i });
    cy.url().should("include", "dashboard");
  });

  it("contains options for profile and my listings", () => {
    cy.findByRole("button", { name: /account of current user/i }).click();
    cy.findByRole("link", { name: /profile/i });
    cy.findByRole("link", { name: /my listings/i });
  });

  it("sublease listing redirects to sublease page", () => {
    cy.contains("Aero on 24th").click({ force: true });
    cy.url().should("include", "sublease");
    cy.contains("Aero on 24th").click({ force: true });
    cy.url().should("include", "sublease");
  });

  it("has a logout option for users", () => {
    cy.contains("Logout");
    cy.contains("Logout").click();
    cy.location("pathname").should("eq", "/login");
  });

  it("has a create listing button", () => {
    cy.contains("Create Listing");
    cy.contains("Create Listing").click();
    cy.url().should("include", "create-listing");
  });

  //has a search bar
  it("has a search bar", () => {
    cy.get("[id=search-suggest]");
    cy.get("[id=search-suggest]").type("Aero on 24th");
    cy.findByRole("button", { name: /search/i }).click({ force: true });
  });

  it("has a sort function", () => {
    cy.findByTestId("sort-by").click();
  });
});
