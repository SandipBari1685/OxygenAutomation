const data= require("../../../../fixtures/oxygenData.json");
const { landingPage } = require("../../../../support/page_objects/landingPage");



describe("Framework Creation and Validation Suit",()=>{
let domain;
let controlID;
let specification;
let oxygenCheck;
let frameworkName=Math.random().toString(36).substring(7);
let version=1;
    before('LogintoApplication and set tokens',()=>{
        cy.apiLogin(data.email, data.password)
        cy.saveLocalStorage();
        landingPage.getAccountDropdown().click();
        //selecting account as Cloudticiy-Fission-QA
        cy.get('#header-account-dropdown-panel').contains(data.accountNameQa).click();
    })
    beforeEach('Restore tokens before each test',()=>{
        cy.restoreLocalStorage();
    })
    
    it("Framework creation Test Case",()=>{
        cy.visit('https://oxygen-qa.cloudticity.com/configuration/oxygen/frameworks')
        cy.contains('New Framework').click();
        cy.get('.head').should('contain.text','Add Framework');
        cy.get('form').then(form=>{
            const csvFile= 'SampleCSV.csv';
            //Filling framework creation form
            cy.wrap(form).find('[formcontrolname="name"]').type(frameworkName); //Random framework name
            cy.wrap(form).find('[formcontrolname="version"]').type(version);
            //Uploading csv file
            cy.wrap(form).find('[type="file"]').attachFile(csvFile);
            cy.wrap(form).find('.p-l-10').should('contain.text',csvFile)
            cy.wrap(form).contains('Submit').click();
        })
        //Storing texts of CSV file to use later
        cy.get('tr td').eq(1).invoke('text').then(text=>{
            domain=text;
            cy.log(domain)
        })
        cy.get('tr td').eq(2).invoke('text').then(text=>{
            controlID=text;
            cy.log(controlID)
        }) 
        cy.get('tr td').eq(3).invoke('text').then(text=>{
            specification=text;
            cy.log(specification)
        })
        cy.get('tr td').eq(4).invoke('text').then(text=>{
            oxygenCheck=text;
            cy.log(oxygenCheck)
        })

        cy.contains('Confirm').click();
        cy.wait(5000);
        cy.contains('mat-row',frameworkName).then(frameworkRow=>{
            cy.wrap(frameworkRow).find('mat-cell').eq(1).should('contain.text',frameworkName)
            cy.wrap(frameworkRow).find('mat-cell').eq(3).should('contain.text',version)
        })
    })


    it("Validation of created framework in 'Events' are mapped to expected workflows",()=>{
        cy.visit('https://oxygen-qa.cloudticity.com/my-actions/open');
        //Searching the workflow by using filter icon
        cy.get('[aria-label="Filter"]').click()
        cy.get('[placeholder="Event Name"]').type(oxygenCheck);
        cy.contains(oxygenCheck).click();
        //Navigating to "compliance" for respective workfow
        cy.get('mat-row').first().find('mat-cell').last().click();
        cy.contains('View Details').click();
        cy.contains('Compliance').click();
        //Asserting workflow and framework names.
        cy.get('.italic').should('contain.text',oxygenCheck);
        cy.contains('mat-expansion-panel',frameworkName).click().then(frameworkDetails=>{
            //Framework are mapped to respective events
            cy.wrap(frameworkDetails).find('[role="region"]').should('be.visible');
            cy.wrap(frameworkDetails).find('.p-b-5').should('contain.text',controlID);
            expect(frameworkDetails).to.contain.text(specification)
        })
    })

    it.only('Validation of created framework in "Dashboards"  compliance section',()=>{
        cy.visit('https://oxygen-qa.cloudticity.com/dashboards/compliance');
        cy.get('.c-btn').eq(0).click();
        cy.contains(frameworkName).click();
        cy.get('.c-btn').eq(1).click();
        cy.contains(1).click();
        cy.wait(2000); 
        cy.get('.head').should('contain.text',frameworkName)
        cy.get('.head').should('contain.text',version)

        cy.get('mat-row').then(matRow=>{
            cy.wrap(matRow).find('mat-cell').eq(0).should('contain.text',domain);
            cy.wrap(matRow).find('mat-cell').eq(2).should('contain.text',controlID);
            cy.wrap(matRow).find('mat-cell').eq(3).should('contain.text',specification);
        })
    })
})