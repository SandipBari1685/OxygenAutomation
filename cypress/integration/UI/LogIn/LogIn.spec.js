describe('Dashboard test Cases',()=>{

    var credentials= require('../../../fixtures/oxygenCredentilas.json')
    it('UI of signIn page',()=>{
        cy.visit('/');
        cy.get('.head').should('contain.text','Sign In');
        cy.contains('Email').should('have.prop', 'tagName').should('eq', 'LABEL');
        cy.get('[formcontrolname="username"]').should('have.prop', 'tagName').should('eq', 'INPUT');
        cy.contains('Password').should('have.prop', 'tagName').should('eq', 'LABEL');
        cy.get('[formcontrolname="password"]').should('have.prop', 'tagName').should('eq', 'INPUT');
        cy.get('.p-b-20').should('have.text','Forgot your password?');
        cy.contains('Forgot your password?').invoke('attr', 'href')
        .should('eq', 'javascript:void(0)');
        cy.get('[type="submit"]').should('contain.text','Sign In').and('have.prop', 'tagName').should('eq', 'BUTTON');
    })
    it('Login with valid email and valid password',()=>{
        cy.Login(credentials.email,credentials.password);
        cy.contains('Skip',{timeout:15000}).click();
        cy.wait(5000);
        cy.url().should('eq', 'https://oxygen-qa.cloudticity.com/dashboards/overview')
    })

    it('Login with invalid email and valid password',()=>{
        cy.Login(credentials.invalidEmail,credentials.password);
        cy.get('notifier-notification p').should('contain.text','Incorrect username or password.')
    })

    it('Login with valid email and invalid password',()=>{
        cy.Login(credentials.email,credentials.invalidPassword);
        cy.get('notifier-notification p').should('contain.text','Incorrect username or password.')
    })

    it('Login with invalid email and invalid password',()=>{
        cy.Login(credentials.invalidEmail,credentials.invalidPassword);
        cy.get('notifier-notification p').should('contain.text','Incorrect username or password.')
    })
})