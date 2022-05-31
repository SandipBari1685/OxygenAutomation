const data= require('../../../../fixtures/oxygenData.json')
describe("oz-Service-Count API's",()=>{
    before('LogintoApplication and set tokens',()=>{
        cy.apiLogin(data.email, data.password)
        cy.saveLocalStorage();
    })
    beforeEach('Restore tokens before each test',()=>{
        cy.restoreLocalStorage();
    })

    it("o2-service count API, GET request",()=>{
        cy.request({
            url:'https://pi7bhbf7fe.execute-api.us-east-1.amazonaws.com/prod/oxygen-service-count',
            method:"GET",
            headers:{
                Authorization:window.localStorage.getItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.accessToken'),
                "x-header-id-token":window.localStorage.getItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.idToken'),
                "x-header-org-account":"151:203471797812"
            }
            }).then(res=>{
            console.log(res);
        })
    })

    it.only("o2-service count API, POST request",()=>{
        cy.request({
            url:'https://pi7bhbf7fe.execute-api.us-east-1.amazonaws.com/prod/oxygen-service-count',
            method:"POST",
            headers:{
                "authorizationToken":"73291ddc-7bc6-42d6-b763-a41f4857fa49",
                "x-header-id-token":window.localStorage.getItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.idToken'),
                "x-header-org-account":"151:203471797812"
            },
            body:{
                "Account Number":"840798010532"
            }
        })
    })
})