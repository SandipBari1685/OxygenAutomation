import { eventsLists } from "../../../support/page_objects/EventsList";
import { landingPage } from "../../../support/page_objects/landingPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_126_Verify the options in the event action icon for open event in All events page.',()=>{

        //(Works fine)
        landingPage.getOpenEventsBtn().invoke('attr', 'class').should('include', 'active');
        eventsLists.getEventActionbtn().click();
        cy.get('mat-row mat-cell').eq(5)
        cy.wait(500);
        cy.get('.mat-menu-content').eq(0).children()
        .should('contain.text', 'View Details')
        .and('contain.text', 'Add Note')
        .and('contain.text', 'Remediate')
        .and('contain.text', 'Mark Compliant')
        .and('contain.text', 'Ignore Event')
        .and('contain.text', 'Support Request')
    })
})