import "@testing-library/cypress/add-commands";

describe("Create Listings", () => {
  const title = "Aero on 24th";
  const address = "3658 SW 24th Ave, Gainesville, FL 32607";
  const description = "Near Regal Butler Plaza";
  const price = "800";
  const term = "15";
  const bedrooms = "2";
  const bathrooms = "2";

  beforeEach(() => {
    cy.visit("http://localhost:3000/create-listing");
  });

  it("has create listing text", () => {
    cy.contains("Create Listing");
    cy.url().should("include", "create-listing");
  });

  it("form for users to fill out to create listing", () => {
    cy.url().should("include", "create-listing");
    cy.get("[id=title]").type(title);
    cy.get("[id=address]").type(address);
    cy.get("[id=description]").type(description);
    cy.get("[id=price]").type("{backspace}" + price);
    cy.get("[id=term]").type("{backspace}" + term);
    cy.get("[id=bedrooms]").type("{backspace}" + bedrooms);
    cy.get("[id=bathrooms]").type("{backspace}" + bathrooms);
    cy.get("button[type=submit").click();
    // cy.location("pathname").should("eq", "/dashboard");
  });

  it("has a logout option for users", () => {
    cy.contains("Logout");
    cy.contains("Logout").click();
    cy.location("pathname").should("eq", "/login");
  });
});
