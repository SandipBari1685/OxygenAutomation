import { landingPage } from "../../../support/page_objects/landingPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_007_Verify the events count in dashboard by selecting Organization and account.',()=>{
        landingPage.getOrgDropdown().click({force: true});
        cy.contains('Cloudticity Internal').click({force: true});
        landingPage.getOrgDropdown().should('have.text','Cloudticity Internal');
        landingPage.getAccountDropdown().click({force: true});
        cy.contains('[GOV] Cloudticity-Fission-Development ').click({force: true});    
        landingPage.getAccountDropdown().should('have.text','[GOV] Cloudticity-Fission-Development');

    })
})