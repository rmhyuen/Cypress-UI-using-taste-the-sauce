// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

export const LoginPage = {
    getUserName() {
        return cy.get("[data-test='username']")
    },

    getPassword() {
        return cy.get("[data-test='password']")
    },

    getLoginButton() {
        return cy.get("[data-test='login-button']")
    },

    getError() {
        return cy.get("[data-test='error']")
    },

    noErrors() {
        cy.log("**Check that there are no login errors**")
        LoginPage.getUserName().should("not.have.class", "error")
        LoginPage.getPassword().should("not.have.class", "error")
        LoginPage.getError().should("not.exist")
        cy.get(".error-button").should("not.exist")
    }
}