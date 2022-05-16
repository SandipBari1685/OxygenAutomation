const { eventsLists } = require('../../../support/page_objects/EventsList');
const { landingPage } = require('../../../support/page_objects/landingPage');

describe('Trial',()=>{
var data= require('../../../fixtures/oxygenData.json')
before('LogintoApplication',()=>{
    cy.apiLogin(data.email, data.password)
    cy.saveLocalStorage();
})
beforeEach('LogintoApplication',()=>{
    cy.restoreLocalStorage();
    cy.visit('https://oxygen-qa.cloudticity.com/dashboards/overview')  
    landingPage.getAccountDropdown().click();
    //selecting account as Cloudticiy-Fission-QA
    cy.get('#header-account-dropdown-panel').contains(data.accountNameQa).click();
})

    it('TC_O2_Dashboard_012_Verify that the Search functionality is able to do search for open events',()=>{
        //(Works fine)
       landingPage.getIgnoredEventBtn().click();
       const searchText='versioning-not-enabled';
       eventsLists.getSearchBtn().type(searchText);
       cy.wait(500);
       cy.get('mat-table').then(table=>{
           if(table.find('mat-row').is(':visible'))
           {
            cy.get('mat-table mat-row').each(tableRow=>{
                cy.wrap(tableRow).find('.cdk-column-event_name').should('contain.text',searchText);
            })
           }
           else{
            cy.get('.no-data').should('contain.text','NO DATA')
           }
        })
    })

    it.only('Counting test if present',()=>{
        let pattern=/[0-9]{1,}/
        var total=0;
        var count1; 
        var count2; 
        var count3;
        var count4;
        var count5;
        cy.wait(500);
        cy.get('.highcharts-data-labels').then(totalChart=>{
            console.log(totalChart);
            if(totalChart.find('.highcharts-data-label-color-1 > text > :nth-child(4)').is(':visible'))
            {
                cy.get('.highcharts-data-label-color-1 > text > :nth-child(4)').invoke('text').then(response=>{
                    let securityCount= response.match(pattern);
                    count1=Number(securityCount)
                })
            }
            if(totalChart.find('.highcharts-data-label-color-0 > text > :nth-child(4)').is(':visible'))
            {
                cy.get('.highcharts-data-label-color-0 > text > :nth-child(4)').invoke('text').then(response=>{
                    let complianceCount= response.match(pattern);
                    count2=Number(complianceCount)
                })
            }

            if(totalChart.find('.highcharts-data-label-color-2 > text > :nth-child(4)').is(':visible'))
            {
                cy.get('.highcharts-data-label-color-2 > text > :nth-child(4)').invoke('text').then(response=>{
                    let noType= response.match(pattern);
                    count3=Number(noType)
                    total=count1 + count2 + count3
                    cy.log(total)
                })
            }

            if(totalChart.find('.highcharts-data-label-color-3 > text > :nth-child(4)').is(':visible'))
            {
                cy.get('.highcharts-data-label-color-3 > text > :nth-child(4)').invoke('text').then(response=>{
                    let avaiLability=response.match(pattern);
                    count4 = Number(avaiLability)
                    total=count1 + count2 + count3 + count4
                    cy.log(total)
                  })
            }

            if(totalChart.find('.highcharts-data-label-color-4 > text > :nth-child(4)').is(':visible'))
            {
                cy.get('.highcharts-data-label-color-4 > text > :nth-child(4)').invoke('text').then(response=>{
                    let cost= response.match(pattern);
                    count5= Number(cost);
                    total=count1 + count2 + count3 + count4 + count5
                    cy.log(total)
                })
            }

        })
    })
})