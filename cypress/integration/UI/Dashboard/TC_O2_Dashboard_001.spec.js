import { landingPage } from "../../../support/page_objects/landingPage"
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it.only('TC_O2_Dashboard_001_Verify the UI of Oxygen app Header.',()=>{
        landingPage.getDashboards().invoke('attr', 'class').should('include', 'active selected')
        landingPage.getOrgDropdown().find('.mat-select-value-text').should('have.text','Cloudticity Internal')
        landingPage.getAccountDropdown().find('.mat-select-value-text').should('have.text','[GOV] Cloudticity-Fission-Development')
        landingPage.getProfileDropdown().click();
        cy.get('#mat-menu-panel-0 button').then(profileDropdown=>{

            //Need Clearification about user account shortcut
            cy.wrap(profileDropdown).eq(0).should('contain.text',credentials.email);
            cy.wrap(profileDropdown).eq(1).should('contain.text','Account Security');
            cy.wrap(profileDropdown).eq(2).should('contain.text','Release Notes');
            cy.wrap(profileDropdown).eq(3).should('contain.text','Sign Out');
        })
    })
})