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

    getErrorButton() {
        return cy.get(".error-button")
    },

    noErrors() {
        cy.log("**Check that there are no login errors**")
        LoginPage.getUserName().should("not.have.class", "error")
        LoginPage.getPassword().should("not.have.class", "error")
        LoginPage.getError().should("not.exist")
        LoginPage.getErrorButton().should("not.exist")
    },

    showsError(text) {
        cy.log("**Check that there are login errors**")
        LoginPage.getUserName().should("have.class", "error")
        LoginPage.getPassword().should("have.class", "error")
        LoginPage.getErrorButton().should("be.visible")
        LoginPage.getError().should('have.text', text).and("be.visible")
    },
    /**
     * 
     * @param {*} username 
     * @param {*} password 
     */
    login(username, password){
        cy.session(`user ${username} session`, () => {
            cy.visit("/")
            LoginPage.getUserName().type(username);
            LoginPage.getPassword().type(password, {log: false});
            LoginPage.getLoginButton().click();
            cy.location("pathname").should("equal", "/inventory.html")
        })
    }
}