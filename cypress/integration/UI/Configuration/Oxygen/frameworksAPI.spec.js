
const data= require('../../../../fixtures/oxygenData.json')
describe("Sample test for Framework API",()=>{
    before('LogintoApplication and set tokens',()=>{
        cy.apiLogin(data.email, data.password)
        cy.saveLocalStorage();
        // landingPage.getAccountDropdown().click();
        // //selecting account as Cloudticiy-Fission-QA
        // cy.get('#header-account-dropdown-panel').contains(data.accountNameQa).click();
    })
    beforeEach('Restore tokens before each test',()=>{
        cy.restoreLocalStorage();
    })
    it("Frameworks validation API call",()=>{
        cy.request({
            url:"https://gl16ups6v9.execute-api.us-east-1.amazonaws.com/prod/frameworks",
            method:"GET",
            headers:{
                Authorization:window.localStorage.getItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.accessToken'),
                "x-header-id-token":window.localStorage.getItem('CognitoIdentityServiceProvider.2sjjekabni5vdplr14s5us28hg.shubham.idToken'),
                "x-header-org-account":"151:203471797812"
            }
        }).then(res=>{
            console.log(res);
            expect(res.status).to.eq(200)

        })
    })

    // it("Frameworks validation API call",()=>{
    //     cy.request({
    //         url:"https://api-qa.cloudticity.com/v3/api/compliance-frameworks/controls/attach-workflows",
    //         method:"POST",
    //         body:{

    //         },
    //         headers:{
    //         Authorization:"eyJraWQiOiI5b0hFUGZaQldrbmxBQkJRUHE4M1o0Z2MwSlpxYlFKOUk5eDFkRFlCcTlzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZGQxMmIzZC1hZjEwLTQ0ZTMtOTU5Mi00YzNjN2MyNDMxZmUiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xX2Y0MjAzM2ZmLWM4YWQtNDY3Yy05NDBmLTQ0ZWMyM2NjNWUwMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTM1NTQxMTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3JabVIyemRtOCIsImV4cCI6MTY1MzU1NzcxNCwiaWF0IjoxNjUzNTU0MTE1LCJqdGkiOiIwOTVhNzAxNC0zZmVhLTQ4NjAtOTFiNy0xMzgwNjE5MGNiNzQiLCJjbGllbnRfaWQiOiIyc2pqZWthYm5pNXZkcGxyMTRzNXVzMjhoZyIsInVzZXJuYW1lIjoiZ2FuZXNoIn0.dyvBCPpPz0jmhjhV9vuF6z5cdbEzZwVdWi6VTHrrJLeYNJN53a4AbH5K28qAAyzHw-ZzhNXQ4olAJebkxJ3lsqQPgKpxnjY-eUMOK8C7ejLA139jfOBL-ppLJjluIdZBJgvIYt0Me5YSktEq1ZjEOCk9rSz7IgVveN6tOh8RZ0Q9RD9h7hLN5PjF-wdAwbTMOtbDURND5gkyqurJy5lr8qtNqigdC_gGlHQcbC4XhhHjiNofAhP8M2IlqdzJK4FdzZrZpUxUVZRRHGmEiU-2JLq_-PmR8pjqbOl9e-JwaWUwJRBElYnMsZQs6vfCFaIx7LR-UzOo7p5ySHeWsMs5Ng",
    //         "x-header-id-token":"eyJraWQiOiJlbmNwdW5BVCtnYlhxTEI0KzZFMmRUTnZyZ0F5NFpCc20zODNnTnhuOWFnPSIsImFsZyI6IlJTMjU2In0.eyJ0YW0iOiIiLCJzdWIiOiI2ZGQxMmIzZC1hZjEwLTQ0ZTMtOTU5Mi00YzNjN2MyNDMxZmUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfclptUjJ6ZG04Iiwib3h5Z2VuX3JvbGVzIjoiKjoqOm94eWdlbl9hZG1pbiIsImNvZ25pdG86dXNlcm5hbWUiOiJnYW5lc2giLCJ1c2VySWQiOiJlZjg1ZTI1Zi00NmE2LTQ1MzYtYTY4NC02NWI3MjA0ODNkZTIiLCJhdWQiOiIyc2pqZWthYm5pNXZkcGxyMTRzNXVzMjhoZyIsInRva2VuX3VzZSI6ImlkIiwib3JnYW5pemF0aW9uX2lkIjoiMTUxIiwiYXV0aF90aW1lIjoxNjUzNTU0MTE0LCJveHlnZW5fcGVyc29uYSI6Im94eWdlbl9hZG1pbiIsImV4cCI6MTY1MzU1NzcxNCwiaWF0IjoxNjUzNTU0MTE0LCJlbWFpbCI6ImdhbmVzaC5zaGFkYW1AZmlzc2lvbmxhYnMuY29tIiwidXNlcm5hbWUiOiJnYW5lc2gifQ.fRyAms2OZPiG6dqRuJX89Y8TvySRv875LbyUS56A3TmHR8cqOLRGiSynk-VFL7sqLt1x4pOB1CIq5dNGCbGOiGzLiWHKou0hq_2nKaAu9wga3sifuuCWPnIlpK2zBSQqZlro6NueqchkD-iADA29oiLDBmQfPZrD6P7wkqXPcunvmLNeKKFsqGdBDEzstbQm16DZkuB-O63ERcSPl4Kp9yZIy6y2ASnKuhcfEOMTuSXofxrlJETn3TGmwbm5_grOKvFx4daUZbLps5litBDsivSoPYYh2atMl1D7Zs363IDLekg-fFfQvgsKyNw-OhnaHZ5kV9fTZvzS8t9VTEDHoA",
    //         "Content-Type":"application/json"
    //         }
    //     }).then(res=>{
    //         console.log(res);
    //         expect(res.status).to.eq(400)
    //     })
    // })


})