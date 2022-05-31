// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe';
import 'cypress-file-upload';
import "cypress-localstorage-commands";

Cypress.Commands.add('Login',(email, password)=>{
    cy.visit('https://oxygen-qa.cloudticity.com/auth/login');
    cy.get('[formcontrolname="username"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('[type="submit"]').click();
})

Cypress.Commands.add('apiLogin',(username, password)=>{
    cy.request({
        method:"POST",
        url:"https://cognito-idp.us-east-1.amazonaws.com/",
        headers:{
            "X-Amz-Target":"AWSCognitoIdentityProviderService.InitiateAuth",
            "Content-Type":"application/x-amz-json-1.1"
        },
        body:{
            "AuthParameters" : {
               "USERNAME" : username,
               "PASSWORD" : password
            },
            "AuthFlow" : "USER_PASSWORD_AUTH",
            "ClientId" : "2sjjekabni5vdplr14s5us28hg"
         }
    }).then(resp=>{
        expect(resp.status).to.eq(200);
        localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.refreshToken',resp.body.AuthenticationResult.RefreshToken)
        localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.accessToken',resp.body.AuthenticationResult.AccessToken)
        localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.idToken',resp.body.AuthenticationResult.IdToken)
        localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.LastAuthUser','shubham')
        cy.visit('https://oxygen-qa.cloudticity.com/auth/login');
        cy.wait(5000)
    })
})
Cypress.Commands.add('signinAWS',() => {
    const data = require('../fixtures/AwsCreds.json')
    cy.log('---Login to AWS---')
    cy.visit('https://cloudticity-fission-qa.signin.aws.amazon.com/console')
    cy.get('#account').clear().type(data.accountId)
        cy.get('#username').type(data.userName)
        cy.get('#password').type(data.Password)
        cy.get('#signin_button').click()
        // if(cy.contains('Continue'))
        // {
        //     cy.contains('Continue').click()
        // }
        // else{
        //     return null
        // }
})

Cypress.Commands.add('SignoutAWS',()=>{
    cy.log('---Logout AWS---')
    cy.get('[data-testid="more-menu__awsc-nav-account-menu-button"]').click()
        cy.get('#menu--account').should('contain','Sign out')
        cy.get('#menu--account').contains('Sign out').click()
        if(cy.contains('Continue'))
        {
            cy.contains('Continue').click()
        }
})