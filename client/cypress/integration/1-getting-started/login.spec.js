import "@testing-library/cypress/add-commands";

describe("Sign in", () => {
  const email = "test@testtest.com";
  const pass = "123123";

  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("has image logo", () => {
    cy.get("img");
  });
  //has canvas with particle background
  it("has a background with particles", () => {
    cy.get("canvas");
  });

  //redirects users when clicking sign up option to sign up form
  it("has a sign up option for new users", () => {
    cy.contains("Don't have an account?");
    cy.contains("Sign up!").click();
    cy.url().should("include", "signup");
  });

  it("form to login for users", () => {
    cy.url().should("include", "login");
    cy.findByRole("textbox").type(email);
    cy.get("form").type(pass);
    cy.get("button[type=submit").click();
  });
});
