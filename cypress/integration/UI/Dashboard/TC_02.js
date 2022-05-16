const data= require('../../../fixtures/oxygenData.json');
const { landingPage } = require('../../../support/page_objects/landingPage');

describe('Dashboard test Cases',()=>{
    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(data.email, data.password)
        landingPage.getAccountDropdown().click();;
        cy.get('#mat-option-11').click();
    })
    
    it("TC_O2_Dashboard_035_Verify that the functionality of Security tab in dashboard.",()=>{
        landingPage.getDashboards().invoke('attr', 'class').should('include', 'active')
        landingPage.getSecuritybtn().click()
        landingPage.getSecuritybtn().invoke('attr', 'class').should('include', 'active')
        cy.get('mat-table mat-row').should('be.visible')

        //Verifying openEvents counts with pagination count
        // cy.get('.p-b-5').eq(0).invoke('text').then(OpenEventsCount=>{
        //     cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
        //         const str=response.split(" ");
        //         const paginationCount=Number(str[5]);
        //         expect(Number(OpenEventsCount)).to.eq(paginationCount);
        //     })
        // })

        // // Verifying IgnoredEvents count with pagination count
        // cy.get('app-event-count').eq(1).click()
        // cy.get('.p-b-5').eq(1).invoke('text').then(ignoreEventsCount=>{
        // cy.get('mat-table mat-row').should('be.visible')
        //     cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
        //     const str=response.split(" ");
        //     const paginationCount=Number(str[5]);
        //     expect(Number(ignoreEventsCount)).to.eq(paginationCount);
        //     })
        // })

        //Verifying closedEvents count with pagination count
        //Verifying closedEvents count with pagination count
    cy.get('app-event-count').eq(2).click()
    cy.get('.p-b-5').eq(2).invoke('text').then(closedEventsCount=>{
        cy.log(closedEventsCount)
        cy.log("Typeof closeEvent",typeof closedEventsCount)

    cy.get('mat-table mat-row').should('be.visible')
        cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{    
        const str=response.split(" ");
        const paginationCount=parseInt(str[5]);
        expect(parseInt(closedEventsCount)).to.eq(paginationCount);
        })
    })

    })
})

