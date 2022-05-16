const { eventsLists } = require('../../../support/page_objects/EventsList')
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_013_ Verify Download report option for Open Events.',()=>{
        Array=['As CSV','As PDF','As XLSX']
        eventsLists.getDwnldBtn().click({force: true});
        for(let i=0; i<3;i++)
        {
            cy.contains(Array[i]).click();
            cy.get('.notifier__notification-message').should('contain.text','Preparing Download')
            eventsLists.getDwnldBtn().click({force: true});

            //Doubt
            // if(i<2){
            //     eventsLists.getDwnldBtn().click({force: true});
            // }
        }
    })

})