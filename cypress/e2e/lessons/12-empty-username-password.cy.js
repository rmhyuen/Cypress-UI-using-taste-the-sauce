// enables typescript checking in javascript files
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from "./12-login.page"

describe("", () => {
    beforeEach (() => {
        cy.visit("/")
    })

    it("should show an error for empty username", () => {
        LoginPage.getLoginButton().click()
        LoginPage.showsError("Epic sadface: Username is required")
        LoginPage.getErrorButton().click()
        LoginPage.noErrors()
    })

    it.only("should show an error for empty password", () => {
        LoginPage.getUserName().type("some user")
        LoginPage.getLoginButton().click()
        LoginPage.showsError("Epic sadface: Password is required")
        LoginPage.getErrorButton().click()
        LoginPage.noErrors()
    })
})