export class SupporRequest{

    getTypeText()
    {
        return cy.get(':nth-child(1) > .font-medium');
    }

    getTypeOfRequestText(){
        return cy.get('[fxlayout="row"] > :nth-child(2) > .font-medium');
    }

    getServiceProviderText()
    {
        return cy.get('[fxlayout="row"] > :nth-child(3) > .font-medium');
    }

    getSeverityText(){
        return cy.get('[fxlayout="row"] > :nth-child(4) > .font-medium');
    }

    getSummaryText(){
        return cy.get('[fxlayout="column"] > :nth-child(2) > .font-medium');
    }

    getDescriptionText(){
        return cy.get('[fxlayout="column"] > :nth-child(3) > .font-medium');
    }

    getCreateReqBtn(){
        return cy.get('[type="submit"]');
    }
    getSupportReqHead(){
        return cy.get('.head-2')
    }
    getSupportReqbtn(){
        return cy.get('.support-btn pointer-events');
    }

}
export const supportRequest= new SupporRequest