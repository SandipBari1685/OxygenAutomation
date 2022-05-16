/// <reference types="cypress"/>
describe("Loginto AWS using API",()=>{
    it("API login",()=>{
        cy.request({
            method:"POST",
            url:"https://cognito-idp.us-east-1.amazonaws.com/",
            headers:{
                "X-Amz-Target":"AWSCognitoIdentityProviderService.InitiateAuth",
                "Content-Type":"application/x-amz-json-1.1"
            },
            body:{
                "AuthParameters" : {
                   "USERNAME" : "shubham",
                   "PASSWORD" : "Fission@123"
                },
                "AuthFlow" : "USER_PASSWORD_AUTH",
                "ClientId" : "2sjjekabni5vdplr14s5us28hg"
             }
        }).then(resp=>{
            console.log(resp);
            cy.log(JSON.stringify(resp.body.AuthenticationResult));
        })
    })
})