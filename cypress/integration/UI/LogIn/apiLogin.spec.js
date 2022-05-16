describe("Loginto AWS using API",()=>{
    it.only("API login",()=>{
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
           
            localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.refreshToken',resp.body.AuthenticationResult.RefreshToken)
            localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.accessToken',resp.body.AuthenticationResult.AccessToken)
            localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.idToken',resp.body.AuthenticationResult.IdToken)
            localStorage.setItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.LastAuthUser','shubham')
            cy.visit('https://oxygen-qa.cloudticity.com/auth/login')
            cy.wait(5000)
            cy.get('.main-side-nav').contains('Events').click({timeout:5000 })
           
        })
    })
})