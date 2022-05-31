export class LandingPage{
    getOrgDropdown(){
        return  cy.get('#header-organization-dropdown');
    }

    getAccountDropdown(){
        return  cy.get('#header-account-dropdown');
    }

    getProfileDropdown(){
        return cy.get('.m-l-20').eq(1);
    }


    getGraphName(){
        return cy.get('.c-card > .head-3');
    }

    getDashboards(){
       return  cy.get('.main-side-nav mat-list-item').eq(0)
    }

    getEventsBtn(){
       return  cy.get('.main-side-nav mat-list-item').eq(1)
    }

    getOperationsBtn(){
        return  cy.get('.main-side-nav mat-list-item').eq(2)
    }
    
    getConfigurationBtn(){
        return cy.get('.main-side-nav mat-list-item').eq(3)
    }

    getOxygenBtn(){
        return cy.get('.main-side-nav mat-list-item').eq(3).find('mat-list-item').eq(0)
    }

    getAccountsBtn(){
        return cy.get('.main-side-nav mat-list-item').eq(3).find('mat-list-item').eq(1)

    }

    getReportsBtn(){
        return cy.get('.main-side-nav mat-list-item').eq(4);
    }

    getAdminbtn(){
        return cy.get(':nth-child(6) > :nth-child(1) > [appaccordiontoggle=""]')
    }

    getSupportReqbtn(){
        return cy.get('.support-btn > span');
    }

    getAllEventsbtn(){
        return cy.get('.c-nav-btn').eq(0);
    }

    getSecuritybtn(){
        return cy.get('.c-nav-btn').eq(1);
    }

    getCompliancebtn(){
        return cy.get('.c-nav-btn').eq(2);
    }

    getAvailabilitybtn(){
        return cy.get('.c-nav-btn').eq(3);
    }

    getRefreshbtn(){
        return cy.get('.c-nav-btn').eq(4);
    }

    getOpenEventsBtn(){
        return cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(0);
    }

    getClosedEventsBtn(){
        return cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(2)
    }

    getIgnoredEventBtn(){
        return cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(1)
    }
}
export const landingPage = new LandingPage()