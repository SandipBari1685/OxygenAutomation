import { landingPage } from "../../../support/page_objects/landingPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_004_Verify that All the required options are present in Left Menu or not.',()=>{

        //Need Clearification about Admin btn

        landingPage.getDashboards().should('have.text','Dashboards ');
        landingPage.getDashboards().find('a').should('have.attr', 'href','/dashboards');
        landingPage.getEventsBtn().should('have.text','Events ');
        landingPage.getEventsBtn().find('a').should('have.attr', 'href', '/my-actions');
        landingPage.getOperationsBtn().should('have.text','Operations ');
        landingPage.getOperationsBtn().find('a').should('have.attr', 'href', '/operations')
        landingPage.getConfigurationBtn().find('.p-l-5').should('have.text','Configuration');
        landingPage.getOxygenBtn().should('have.text','Oxygen ');
        landingPage.getOxygenBtn().find('a').should('have.attr', 'href', '/configuration/oxygen')
        landingPage.getAccountsBtn().should('have.text','Accounts ');
        landingPage.getAccountsBtn().find('a').should('have.attr', 'href', '/configuration/accounts')
        //Reports btn remaining
        //Admin btn remaining
        landingPage.getSupportReqbtn().should('have.text','Support Request')

    })
})