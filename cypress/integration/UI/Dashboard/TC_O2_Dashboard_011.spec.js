
const credentials= require('../../../fixtures/oxygenCredentilas.json')
const { eventsLists } = require('../../../support/page_objects/EventsList')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it.only('TC_O2_Dashboard_011_In All Events Page, Verify the UI of Open Events List view',()=>{

        //Doubt(I have to scroll otherwise test is failling)
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
        cy.get('.mat-paginator-container').then(paginator=>{
            //Have to scroll, otherwise getting failed
            cy.wrap(paginator).should('contain.text',' Items per page: ');
            cy.wrap(paginator).find('.mat-paginator-page-size-select').should('be.visible');
            cy.wrap(paginator).find('.mat-paginator-range-actions').should('be.visible');
        })
        eventsLists.getPreviousPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
        eventsLists.getNextPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');

    })
})