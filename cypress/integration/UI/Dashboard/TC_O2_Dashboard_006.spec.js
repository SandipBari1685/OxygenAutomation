import { landingPage } from "../../../support/page_objects/landingPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_006_Verify the UI of Dashboard page.',()=>{
        landingPage.getDashboards().invoke('attr', 'class').should('include', 'active')
        landingPage.getAllEventsbtn().invoke('attr', 'class').should('include', 'active')
        cy.get('mat-table').should('be.visible');//Need to scroll down to get this passed.
        cy.url().should('eq', 'https://oxygen-qa.cloudticity.com/dashboards/overview');

        //Pending:
        //2. Overview should be focused.
        //3. All events Analytics graph should be displayed.
    })
})