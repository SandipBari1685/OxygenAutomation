const credentials= require('../../../fixtures/oxygenCredentilas.json')
const { eventsLists } = require('../../../support/page_objects/EventsList')
const { landingPage } = require('../../../support/page_objects/landingPage')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_20_Verify the UI of Ignored Events List view.',()=>{
        landingPage.getIgnoredEventBtn().click();
        eventsLists.getSearchBtn().should('be.visible');
        eventsLists.getDwnldBtn().should('be.visible');
        // Bulk Action button is remaining
        eventsLists.getBulkActionBtn().should('be.visible');
        eventsLists.getApplyBtn().should('be.disabled');
    
        cy.get('mat-header-row mat-header-cell').then(tableRowHead=>{
            cy.wrap(tableRowHead).eq(0).should('be.visible');
            cy.wrap(tableRowHead).eq(2).should('contain.text','Event Name');
            cy.wrap(tableRowHead).eq(3).should('contain.text','Event Type');
            cy.wrap(tableRowHead).eq(4).should('contain.text','Resource ID');
            cy.wrap(tableRowHead).eq(5).should('contain.text','Event Date');
            cy.wrap(tableRowHead).eq(6).should('contain.text','Account');
            cy.wrap(tableRowHead).eq(7).should('contain.text','Region');
        })
    })
})