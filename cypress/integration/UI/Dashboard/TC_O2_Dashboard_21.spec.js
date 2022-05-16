const data= require('../../../fixtures/oxygenData.json')
const { eventsLists } = require('../../../support/page_objects/EventsList')
const { landingPage } = require('../../../support/page_objects/landingPage')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(data.email, data.password)
        landingPage.getAccountDropdown().click();;
        cy.get('#mat-option-11').click();
    })
    it('TC_O2_Dashboard_21_ Verify Download report option for Ignored Events.',()=>{
        Array=['As CSV','As XLSX']
        landingPage.getIgnoredEventBtn().click();
        eventsLists.getDwnldBtn().click({force: true});
        //Downloading CSV and XLSX files successfully
        for(let i=0; i<2;i++)
        {
            cy.contains(Array[i]).click();
            cy.get('.notifier__notification-message').should('contain.text','Preparing Download')
            eventsLists.getDwnldBtn().click({force: true});
        }
        //Verifying pdf download error message
        cy.contains('As PDF').click();
        cy.get('.notifier__notification-message').should('contain.text','PDF export timed out, CSV downloads are recommended for large exports')
    })
})