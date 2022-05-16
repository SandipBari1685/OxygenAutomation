import { landingPage } from "../../../support/page_objects/landingPage";
const data= require('../../../fixtures/oxygenData.json')

describe('Dashboard test Cases',()=>{

  beforeEach('LogintoApplication',()=>{
    cy.apiLogin(data.email, data.password)
    landingPage.getAccountDropdown().click();;
    cy.get('#mat-option-11').click();
  })
    it('TC_O2_Dashboard_008_In All Events tab, Verify that the Pie chart by clicking on Open Events',()=>{
      //Doubt here
      landingPage.getOpenEventsBtn().invoke('attr', 'class').should('include', 'active');
      landingPage.getGraphName().should('have.text','Open Event Type Breakdown');
      let pattern=/[0-9]{1,}/
      var total=0;
      var count1; 
      var count2; 
      var count3;
        var count4;
        var count5;
    
        cy.get('.highcharts-data-label-color-1 > text > :nth-child(4)').invoke('text').then(response=>{
          let securityCount= response.match(pattern);
          count1=Number(securityCount)
        })
        cy.get('.highcharts-data-label-color-0 > text > :nth-child(4)').invoke('text').then(response=>{
          let complianceCount= response.match(pattern);
          count2=Number(complianceCount)
        })
        cy.get('.highcharts-data-label-color-2 > text > :nth-child(4)').invoke('text').then(response=>{
          let noType= response.match(pattern);
          count3=Number(noType)
        })
        cy.get('.highcharts-data-label-color-4 > text > :nth-child(4)').invoke('text').then(response=>{
          let avaiLability=response.match(pattern);
          count4 = Number(avaiLability)
          total=count1 + count2 + count3 + count4
        })
        cy.get('.highcharts-data-label-color-3 > text > :nth-child(4)').invoke('text').then(response=>{
          let cost= response.match(pattern);
          count5= Number(cost);
          total=count1 + count2 + count3 + count4 + count5
          cy.log(total)
        })
        cy.get('.active-tab > .tab-head') .invoke('text').then(text=>{
          expect(Number(text)).to.eq(total);
          cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
           const str=response.split(" ")
           const num=parseInt(str[5]);
           expect(Number(text)).to.eq(num);
          })
        })
    })
  
})