const { eventsLists } = require('../../../support/page_objects/EventsList')
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_012_Verify that the Search functionality is able to do search',()=>{
        //(Works fine)
       const seachText='versioning-not-enabled';

       eventsLists.getSearchBtn().type(seachText);
       cy.wait(500);
       cy.get('mat-table mat-row').each(tableRow=>{
           cy.wrap(tableRow).find('.cdk-column-event_name').should('contain.text',seachText);
       })
    })

})