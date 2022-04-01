import "@testing-library/cypress/add-commands";
import Chance from "chance";

const chance = new Chance();
describe("Sign up", () => {
  const email = chance.email();
  const first = "John";
  const last = "Doe";
  const pass = "password123";

  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
  });

  it("has image logo", () => {
    cy.get("img");
  });
  //has canvas with particle background
  it("has a background with particles", () => {
    cy.get("canvas");
  });

  it("form to login for users", () => {
    cy.url().should("include", "signup");
    cy.get("[id=first-name]").type(first);
    cy.get("[id=last-name]").type(last);
    cy.get("[id=email]").type(email);
    cy.get("[id=password]").type(pass);
    cy.get("[id=confirm-password]").type(pass);
    cy.get("button[type=submit").click();
    cy.url().should("include", "login");
  });

    //redirects users when clicking sign up option to sign up form
    it("has a sign up option for new users", () => {
        cy.contains("Already have an account?");
        cy.contains("Sign in!").click();
        cy.url().should("include", "login");
      });
});
