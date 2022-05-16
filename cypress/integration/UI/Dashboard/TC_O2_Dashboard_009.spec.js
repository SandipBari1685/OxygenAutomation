import { landingPage } from "../../../support/page_objects/landingPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_009_In All Events tab, Verify that the pie chart by clicking on Ignored Events',()=>{
        cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(1).click();
        cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(1).invoke('attr', 'class').should('include', 'active');
        landingPage.getGraphName().should('have.text','Ignored Event Type Breakdown');
      //const ignoredEventNum= cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(2).find('.tab-head').invoke('text')
    })
})