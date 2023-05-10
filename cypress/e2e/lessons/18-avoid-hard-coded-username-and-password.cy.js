// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from "./17-login.page"

it('logs out', () => {
  //By default, the Cypress.env...standard type will be any
  //The following will force the type to be string
  /** @type {{username: string, password: string}} */
  const user = Cypress.env("users").standard
  LoginPage.login(user.username, user.password);

  cy.visit("/inventory.html")
  cy.location("pathname").should("equal", "/inventory.html")

  cy.contains("button", "Open Menu")
    .should("be.visible")
    .click()
  cy.get(".bm-menu-wrap")
    .should("be.visible")
    .wait(1000)
    .contains(".menu-item", "Logout")
    .click()
  
  cy.location("pathname").should("equal", "/")
  cy.visit("/inventory.html")
  LoginPage.showsError("Epic sadface: You can only access '/inventory.html' when you are logged in.")
})
