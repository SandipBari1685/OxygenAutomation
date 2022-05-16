import { landingPage } from "../../../support/page_objects/landingPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_010_In All Events tab, Verify that the pie chart by clicking on Closed Events.',()=>{
        landingPage.getClosedEventsBtn().click();
        landingPage.getClosedEventsBtn().invoke('attr', 'class').should('include', 'active');
        landingPage.getGraphName().should('have.text','Closed Event Type Breakdown');
    })
})