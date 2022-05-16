const credentials= require('../../../fixtures/oxygenCredentilas.json')
const { eventsLists } = require('../../../support/page_objects/EventsList')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_14_Bulk Actions functionality for Open Events list',()=>{
        eventsLists.getCheckboxbtn().click();
        eventsLists.getBulkActionBtn().click();
        cy.contains('Mark As Compliant').click({force: true});
    })
})