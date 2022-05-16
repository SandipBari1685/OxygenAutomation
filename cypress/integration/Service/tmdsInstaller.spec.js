describe('Test',()=>{
const data= require("../../fixtures/AwsCreds.json")
   
        function getService(service,subservicename){

            cy.get('.globalNav-0313',{timeout:5000}).click()
            cy.contains(service).click({force:true})
            cy.contains(subservicename).click({force:true})
        }
    function triggerLambdaFunction(lambdafunction1){
        
        cy.get('[placeholder="Filter by tags and attributes or search by keyword"]').type(lambdafunction1 +'{enter}')
        cy.get(':nth-child(2) > a').contains(lambdafunction1).click()
        cy.contains('Test').click()
       
    }

    it("tmdsInstaller",()=>{
        cy.signinAWS();
        getService("Compute","Lambda");
        triggerLambdaFunction("o2-tmds-agent-installer");
        cy.contains('Event JSON').should('contain.text','Event JSON');
        cy.get('.ace_text-layer').clear({force: true});

    })
})