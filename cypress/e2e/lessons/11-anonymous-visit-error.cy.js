// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from "./10-login.page"

describe('login', () => {
  context('anonymous user', () => {
    it('should validate error when directly visiting the inventory page', () => {
        cy.visit('/inventory.html')
        cy.location("pathname").should("equal", "/")

        cy.log("**check that the errors appear**")
        LoginPage.getUserName().should("have.class", "error")
        LoginPage.getPassword().should("have.class", "error")
        LoginPage.getError().should("be.visible").and("include.text", "Epic sadface: You can only access '/inventory.html' when you are logged in.")
        cy.get(".error-button").should("be.visible").click()

        LoginPage.noErrors()
    })
  })
})
