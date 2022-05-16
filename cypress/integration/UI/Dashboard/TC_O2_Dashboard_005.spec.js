import { landingPage } from "../../../support/page_objects/landingPage";
import { supportRequest } from "../../../support/page_objects/supportRequestPage";
const credentials= require('../../../fixtures/oxygenCredentilas.json')

describe('Dashboard test Cases',()=>{

    beforeEach('LogintoApplication',()=>{
        cy.apiLogin(credentials.email, credentials.password)
    })
    it('TC_O2_Dashboard_005_Verify that the Support Request ? button in left menu.',()=>{
        //Works fine
        //All the text assertions for Support request page
        landingPage.getSupportReqbtn().should('have.text','Support Request')
        cy.contains('Support Request').should('have.prop', 'tagName').should('eq', 'BUTTON');
        cy.contains('Support Request').click();
        supportRequest.getSupportReqHead().should('contain.text','Open A Support Request');
        supportRequest.getTypeText().should('contain.text','Type *');
        supportRequest.getTypeOfRequestText().should('contain.text','Type of Request *');
        supportRequest.getServiceProviderText().should('contain.text','Service Provider *');
        supportRequest.getSeverityText().should('contain.text','Severity *');
        supportRequest.getSummaryText().should('have.text','Summary *');
        supportRequest.getDescriptionText().should('have.text','Description *');
        supportRequest.getCreateReqBtn().should('have.text',' Create Request ').and('be.disabled');

        //Filling sample form for support request
        cy.get('#mat-select-value-11').click();
        cy.contains('Problem').click();
        cy.get('#mat-select-value-13').click();
        cy.contains('Technical Support ').click();
        cy.get('#mat-select-value-15').click();
        cy.contains('Cloudticity Oxygen ').click();
        cy.get('#mat-select-value-17').click();
        cy.contains('General Guidance ').click();
        cy.get('[formcontrolname="subject"]').type('Something');
        cy.get('[formcontrolname="description"]').type('Something');
        cy.get('[type="submit"]').should('be.enabled');
    })
})