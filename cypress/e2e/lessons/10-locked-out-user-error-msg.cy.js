// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from "../lessons/10-login.page"

describe('login', () => {
  context('locked out user', () => {
    it('should validate locked out user', () => {
        cy.visit('/')
        LoginPage.getUserName()
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Username')
          .type('locked_out_user')
        LoginPage.getPassword()
          .should('be.visible')
          .and('have.attr', 'placeholder', 'Password')
          .type('secret_sauce')

        LoginPage.noErrors()
        
        LoginPage.getLoginButton().should('be.visible').click()

        cy.log("**check that the errors appear**")
        LoginPage.getUserName().should("have.class", "error")
        LoginPage.getPassword().should("have.class", "error")
        LoginPage.getError().should("be.visible").and("include.text", "Epic sadface: Sorry, this user has been locked out.")

        cy.get(".error-button").should("be.visible").click()

        LoginPage.noErrors()
    })
  })
})
