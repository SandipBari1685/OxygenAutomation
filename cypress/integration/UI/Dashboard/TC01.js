const { eventsLists } = require('../../../support/page_objects/EventsList');
const { landingPage } = require('../../../support/page_objects/landingPage');
const { supportRequest } = require('../../../support/page_objects/supportRequestPage');

const data= require('../../../fixtures/oxygenData.json')

describe('Dashboard test Cases',()=>{
    before('LogintoApplication',()=>{
        cy.apiLogin(data.email, data.password)
        cy.saveLocalStorage();
    })
    beforeEach('LogintoApplication',()=>{
        cy.restoreLocalStorage();
        cy.visit('https://oxygen-qa.cloudticity.com/dashboards/overview')  
        landingPage.getAccountDropdown().click();
        //selecting account as Cloudticiy-Fission-QA
        cy.get('#header-account-dropdown-panel').contains(data.accountNameQa).click();
    })

    it('TC_O2_Dashboard_001_Verify the UI of Oxygen app Header.',()=>{
        landingPage.getDashboards().invoke('attr', 'class').should('include', 'active')
        landingPage.getOrgDropdown().find('.mat-select-value-text').should('have.text','Cloudticity Internal')
        landingPage.getAccountDropdown().find('.mat-select-value-text').should('have.text',data.accountNameQa)
        landingPage.getProfileDropdown().click();
        cy.get('#mat-menu-panel-0 button').then(profileDropdown=>{

            //Need Clearification about user account shortcut
            cy.wrap(profileDropdown).eq(0).should('contain.text',data.email);
            cy.wrap(profileDropdown).eq(1).should('contain.text','Account Security');
            cy.wrap(profileDropdown).eq(2).should('contain.text','Release Notes');
            cy.wrap(profileDropdown).eq(3).should('contain.text','Sign Out');
        })
    })

    it('TC_O2_Dashboard_002_Verify that the functionality of Release Notes Button.',()=>{
        landingPage.getProfileDropdown().click();
        cy.contains('Release Notes').click();
        cy.get('.head').should('contain.text','Release Notes');
        cy.get('.circle-icon').should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
    })
    it('TC_O2_Dashboard_004_Verify that All the required options are present in Left Menu or not.',()=>{

        //Need Clearification about Admin btn

        landingPage.getDashboards().should('have.text','Dashboards ');
        landingPage.getDashboards().find('a').should('have.attr', 'href','/dashboards');
        landingPage.getEventsBtn().should('have.text','Events ');
        landingPage.getEventsBtn().find('a').should('have.attr', 'href', '/my-actions');
        landingPage.getOperationsBtn().should('have.text','Operations ');
        landingPage.getOperationsBtn().find('a').should('have.attr', 'href', '/operations')
        landingPage.getConfigurationBtn().find('.p-l-5').should('have.text','Configuration');
        landingPage.getOxygenBtn().should('have.text','Oxygen ');
        landingPage.getOxygenBtn().find('a').should('have.attr', 'href', '/configuration/oxygen')
        landingPage.getAdminbtn().find('.p-l-5').should('have.text','Admin');
        landingPage.getSupportReqbtn().should('have.text','Support Request')
    })

    it('TC_O2_Dashboard_005_Verify that the Support Request ? button in left menu.',()=>{
        //Works fine
        //All the text assertions for Support request page
        landingPage.getSupportReqbtn().should('have.text','Support Request')
        cy.contains('Support Request').should('have.prop', 'tagName').should('eq', 'BUTTON');
        cy.contains('Support Request').click();
        supportRequest.getSupportReqHead().should('contain.text','Open A Support Request');
        supportRequest.getTypeText().should('contain.text','Type *');
        supportRequest.getTypeOfRequestText().should('contain.text','Type of Request *');
        supportRequest.getServiceProviderText().should('contain.text','Service Provider *');
        supportRequest.getSeverityText().should('contain.text','Severity *');
        supportRequest.getSummaryText().should('have.text','Summary *');
        supportRequest.getDescriptionText().should('have.text','Description *');
        supportRequest.getCreateReqBtn().should('have.text',' Create Request ').and('be.disabled');

        //Filling sample form for support request
        cy.get('#mat-select-value-11').click();
        cy.contains('Problem').click();
        cy.get('#mat-select-value-13').click();
        cy.contains('Technical Support ').click();
        cy.get('#mat-select-value-15').click();
        cy.contains('Cloudticity Oxygen ').click();
        cy.get('#mat-select-value-17').click();
        cy.contains('General Guidance ').click();
        cy.get('[formcontrolname="subject"]').type('Something');
        cy.get('[formcontrolname="description"]').type('Something');
        cy.get('[type="submit"]').should('be.enabled');
    })

    it('TC_O2_Dashboard_006_Verify the UI of Dashboard page.',()=>{
        landingPage.getDashboards().invoke('attr', 'class').should('include', 'active')
        landingPage.getAllEventsbtn().invoke('attr', 'class').should('include', 'active')
        cy.get('mat-table').should('be.visible');//Need to scroll down to get this passed.
        cy.url().should('eq', 'https://oxygen-qa.cloudticity.com/dashboards/overview');

        //Pending:
        //2. Overview should be focused.
        //3. All events Analytics graph should be displayed.
    })

    it('TC_O2_Dashboard_007_Verify the events count in dashboard by selecting Organization and account.',()=>{
        landingPage.getOrgDropdown().click({force: true});
        cy.contains('Cloudticity Internal').click({force: true});
        landingPage.getOrgDropdown().should('have.text','Cloudticity Internal');
        landingPage.getAccountDropdown().click({force: true});
        cy.contains('[GOV] Cloudticity-Fission-Development ').click({force: true});    
        landingPage.getAccountDropdown().should('have.text','[GOV] Cloudticity-Fission-Development');

    })

    it('TC_O2_Dashboard_008_In All Events tab, Verify that the Pie chat by clicking on Open Events',()=>{
        landingPage.getOpenEventsBtn().invoke('attr', 'class').should('include', 'active');
        landingPage.getGraphName().should('have.text','Open Event Type Breakdown');
    })

    it('TC_O2_Dashboard_009_In All Events tab, Verify that the pie chart by clicking on Ignored Events',()=>{
        cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(1).click();
        cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(1).invoke('attr', 'class').should('include', 'active');
        landingPage.getGraphName().should('have.text','Ignored Event Type Breakdown');
      //const ignoredEventNum= cy.get('[fxlayoutalign="space-between"]').find('[fxlayout="column"]').eq(2).find('.tab-head').invoke('text')
    })

    it('TC_O2_Dashboard_010_In All Events tab, Verify that the pie chart by clicking on Closed Events.',()=>{
        landingPage.getClosedEventsBtn().click();
        landingPage.getClosedEventsBtn().invoke('attr', 'class').should('include', 'active');
        landingPage.getGraphName().should('have.text','Closed Event Type Breakdown');

    })

    it.only('TC_O2_Dashboard_011_In All Events Page, Verify the UI of Open Events List view',()=>{

        //Doubt(I have to scroll otherwise test is failling)
        eventsLists.getSearchBtn().should('be.visible');
        eventsLists.getDwnldBtn().should('be.visible');
        
        eventsLists.getBulkActionBtn().should('be.visible');
        eventsLists.getApplyBtn().should('be.disabled');
    
        cy.get('mat-header-row mat-header-cell').then(tableRowHead=>{
            cy.wrap(tableRowHead).eq(0).should('be.visible');
            cy.wrap(tableRowHead).eq(2).should('contain.text','Event Name');
            cy.wrap(tableRowHead).eq(3).should('contain.text','Event Type');
            cy.wrap(tableRowHead).eq(4).should('contain.text','Resource ID');
            cy.wrap(tableRowHead).eq(5).should('contain.text','Event Date');
            cy.wrap(tableRowHead).eq(6).should('contain.text','Account');
            cy.wrap(tableRowHead).eq(7).should('contain.text','Region');
        })

        cy.get('.mat-paginator-container').then(paginator=>{
            //Have to scroll, otherwise getting failed
            cy.wrap(paginator).should('contain.text',' Items per page: ');
            //Verifying items per page dropdown is present 
            cy.wrap(paginator).find('.mat-paginator-page-size-select').scrollIntoView().should('be.visible');
            //Verifying (1 – 3 of 3) is present
            cy.wrap(paginator).find('.mat-paginator-range-actions').should('be.visible');
        })

        //Verify default value of items per page is 25
        cy.get('[aria-label="Items per page:"]').invoke('text').then(response=>{
           let selectedPageCount=parseInt(response)
            expect(selectedPageCount).to.eq(25)
        })
        eventsLists.getPreviousPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
        eventsLists.getNextPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
    })

    it('TC_O2_Dashboard_012_Verify that the Search functionality is able to do search for open events',()=>{
        //(Works fine)
       const searchText='versioning-not-enabled';

       eventsLists.getSearchBtn().type(searchText);
       cy.wait(500);
       cy.get('mat-table').then(table=>{
        if(table.find('mat-row').is(':visible'))
        {
         cy.get('mat-table mat-row').each(tableRow=>{
             cy.wrap(tableRow).find('.cdk-column-event_name').should('contain.text',searchText);
         })
        }
        else{
         cy.get('.no-data').should('contain.text','NO DATA')
        }
     })
    })

    it('TC_O2_Dashboard_013_ Verify Download report option for Open Events.',()=>{
        Array=['As CSV','As XLSX']
        landingPage.getIgnoredEventBtn().click();
        eventsLists.getDwnldBtn().click({force: true});
        //Downloading CSV and XLSX files successfully
        for(let i=0; i<2;i++)
        {
            cy.contains(Array[i]).click();
            cy.get('.notifier__notification-message').should('contain.text','Preparing Download')
            eventsLists.getDwnldBtn().click({force: true});
        }
        //Verifying pdf download error message
        cy.contains('As PDF').click();
        cy.get('.notifier__notification-message').should('contain.text','PDF export timed out, CSV downloads are recommended for large exports')
    })

    it('TC_O2_Dashboard_14_Bulk Actions functionality for Open Events list',()=>{
        eventsLists.getCheckboxbtn().click();
        eventsLists.getBulkActionBtn().click();
        cy.contains('Mark As Compliant').click({force: true});
    })
    it('TC_O2_Dashboard_015_Verify the functionality of event action icon for open Events list.',()=>{
        cy.url().should('include', '/dashboards/overview')
        eventsLists.getEventActionbtn().click();
        cy.contains('View Details').click();
        cy.get('.head-35').should('contain.text','Event Details');
       //Verifying EventName
        cy.get('.cdk-column-event_name').eq(1).invoke('text').then(response=>{
        const EventName= response.trim();
            cy.get('.italic').should('contain.text',EventName);
        })
        //Verifying EventDate
        cy.get('.cdk-column-event_dt').eq(1).invoke('text').then(response=>{
            const EventDate=response.trim();
            cy.get('.p-t-15').should('contain.text',EventDate);
        })
       // Verifying ResourceID
       cy.get('.mat-column-resource_id').eq(1).invoke('text').then(response=>{
            cy.log(response);
            const resourceID=response.trim();
            cy.get('.break-all').should('contain.text',resourceID)
        })
        cy.get('.close-icon ').should('be.visible');
        cy.get('.relative > :nth-child(1) > .font-medium').should('contain.text','Account Name');
        cy.get('.relative > :nth-child(1) > [fxflex="60"]').should('contain.text',data.accountNameQa)
        cy.get('.relative > :nth-child(2) > .font-medium').should('contain.text','Region');
        cy.get('.relative > :nth-child(2) > [fxflex="60"]').invoke('text').then(response=>{
            cy.log(response);
            const resourceID=response.trim();
        })
        cy.get('[mattooltip="click to view JSON"]').should('have.prop', 'tagName').should('eq', 'BUTTON');
        cy.get('.f-s-14').eq(0).should('be.visible');
        cy.get('.f-s-14').eq(1).find('div').should('contain.text','Assigned to');
        cy.get('.f-s-14').eq(2).find('div').should('contain.text','Remediation Type');
        cy.get('.f-s-14').eq(3).find('div').should('contain.text','Support Ticket ID');
        cy.get('.f-s-14').eq(4).find('div').should('contain.text','Current Status');
        cy.get('.f-s-14').eq(5).find('div').should('contain.text','Remediation Detail');
    })

    it('TC_O2_Dashboard_17_Verify that the Support Request ? page.',()=>{
        //Works fine
        landingPage.getSupportReqbtn().click();

        //Filling sample form for support request
        cy.get('#mat-select-value-11').click();
        cy.contains('Problem').click();
        cy.get('#mat-select-value-13').click();
        cy.contains('Technical Support ').click();
        cy.get('#mat-select-value-15').click();
        cy.contains('Cloudticity Oxygen ').click();
        cy.get('#mat-select-value-17').click();
        cy.contains('General Guidance ').click();
        cy.get('[formcontrolname="subject"]').type('Something');
        cy.get('[formcontrolname="description"]').type('Something');
        cy.get('[type="submit"]').should('be.enabled');
    })

    it('TC_O2_Dashboard_018_Verify the functionality of "Items per page" dropdown in Pagination bar for Open events list.', ()=>{
    //Verifying if events are displayed according to  range selected per page.
    let totalOpenEvents;
    let selectedPageCount;
    cy.get('mat-table mat-row').should('be.visible')
    cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
        const str=response.split(" ")
        totalOpenEvents=parseInt(str[5])
        let array=[10,25,100]
      for(let i=0; i<3;i++)
      {
        cy.get('[aria-label="Items per page:"]').eq(0).click();
        cy.get('#mat-select-8-panel').contains(array[i]).click();
        cy.get('mat-table mat-row').should('be.visible')
        cy.get('[aria-label="Items per page:"]').invoke('text').then(response=>{
        selectedPageCount=parseInt(response)
        if(totalOpenEvents > selectedPageCount)
        {
        cy.get('mat-table mat-row').its('length').should('eq', selectedPageCount)
        }
        else
        {
        cy.get('mat-table mat-row').its('length').should('eq', totalOpenEvents)
        }
      }) 
      }
    })
    })

    it.only('TC_O2_Dashboard_20_Verify the UI of Ignored Events List view.',()=>{
        landingPage.getIgnoredEventBtn().click();
        eventsLists.getSearchBtn().should('be.visible');
        eventsLists.getDwnldBtn().should('be.visible');
        // Bulk Action button is remaining
        eventsLists.getBulkActionBtn().should('be.visible');
        eventsLists.getApplyBtn().should('be.disabled');
    
        cy.get('mat-header-row mat-header-cell').then(tableRowHead=>{
            cy.wrap(tableRowHead).eq(0).should('be.visible');
            cy.wrap(tableRowHead).eq(2).should('contain.text','Event Name');
            cy.wrap(tableRowHead).eq(3).should('contain.text','Event Type');
            cy.wrap(tableRowHead).eq(4).should('contain.text','Resource ID');
            cy.wrap(tableRowHead).eq(5).should('contain.text','Event Date');
            cy.wrap(tableRowHead).eq(6).should('contain.text','Account');
            cy.wrap(tableRowHead).eq(7).should('contain.text','Region');
        })
        cy.get('.mat-paginator-container').then(paginator=>{
            //Have to scroll, otherwise getting failed
            cy.wrap(paginator).should('contain.text',' Items per page: ');
            //Verifying items per page dropdown is present 
            cy.wrap(paginator).find('.mat-paginator-page-size-select').scrollIntoView().should('be.visible');
            //Verifying (1 – 3 of 3) is present
            cy.wrap(paginator).find('.mat-paginator-range-actions').should('be.visible');
        })

        //Verify default value of items per page is 25
        cy.get('[aria-label="Items per page:"]').invoke('text').then(response=>{
           let selectedPageCount=parseInt(response)
            expect(selectedPageCount).to.eq(25)
        })
        eventsLists.getPreviousPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
        eventsLists.getNextPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
    })

    it('TC_O2_Dashboard_21_Verify that the Search functionality is able to do search for ignored events',()=>{
        //(Works fine)
       landingPage.getIgnoredEventBtn().click()
       const searchText='logging';

       eventsLists.getSearchBtn().type(searchText);
       cy.wait(500);
       cy.get('mat-table').then(table=>{
        if(table.find('mat-row').is(':visible'))
        {
         cy.get('mat-table mat-row').each(tableRow=>{
             cy.wrap(tableRow).find('.cdk-column-event_name').should('contain.text',searchText);
         })
        }
        else{
         cy.get('.no-data').should('contain.text','NO DATA')
        }
     })
    })

    it('TC_O2_Dashboard_22_ Verify Download report option for Ignored Events.',()=>{
        Array=['As CSV','As XLSX']
        landingPage.getIgnoredEventBtn().click();
        eventsLists.getDwnldBtn().click({force: true});
        //Downloading CSV and XLSX files successfully
        for(let i=0; i<2;i++)
        {
            cy.contains(Array[i]).click();
            cy.get('.notifier__notification-message').should('contain.text','Preparing Download')
            eventsLists.getDwnldBtn().click({force: true});
        }
        //Verifying pdf download error message
        cy.contains('As PDF').click();
        cy.get('.notifier__notification-message').should('contain.text','PDF export timed out, CSV downloads are recommended for large exports')
    })

    it('TC_O2_Dashboard_024_ Verify the functionality of event action icon for Ignored Events list.',()=>{
        landingPage.getClosedEventsBtn().click();
        eventsLists.getEventActionbtn().click();
        cy.contains('View Details').click();
        cy.get('.head-35').should('contain.text','Event Details');
        //Verifying EventName
        cy.get('.cdk-column-event_name').eq(1).invoke('text').then(response=>{
            const EventName= response.trim();
                cy.get('.italic').should('contain.text',EventName);
            })
            //Verifying EventDate
            cy.get('.cdk-column-event_dt').eq(1).invoke('text').then(response=>{
                const EventDate=response.trim();
                cy.get('.p-t-15').should('contain.text',EventDate);
            })
           // Verifying ResourceID
           cy.get('.mat-column-resource_id').eq(1).invoke('text').then(response=>{
                cy.log(response);
                const resourceID=response.trim();
                cy.get('.break-all').should('contain.text',resourceID)
            })
        cy.get('.close-icon ').should('be.visible');
        cy.get('.relative > :nth-child(1) > .font-medium').should('contain.text','Account Name')
        cy.get('.relative > :nth-child(1) > [fxflex="60"]').should('contain.text',data.accountNameQa)
        cy.get('.relative > :nth-child(2) > .font-medium').should('contain.text','Region');
        cy.get('.relative > :nth-child(2) > [fxflex="60"]').invoke('text').then(response=>{
            cy.log(response);
            const resourceID=response.trim();
        });
        cy.get('[mattooltip="click to view JSON"]').should('have.prop', 'tagName').should('eq', 'BUTTON');
        cy.get('.f-s-14').eq(0).should('be.visible');
        cy.get('.f-s-14').eq(1).find('div').should('contain.text','Assigned to');
        cy.get('.f-s-14').eq(2).find('div').should('contain.text','Remediation Type');
        cy.get('.f-s-14').eq(3).find('div').should('contain.text','Support Ticket ID');
        cy.get('.f-s-14').eq(4).find('div').should('contain.text','Current Status');
        cy.get('.f-s-14').eq(5).find('div').should('contain.text','Resource Status');
        cy.get('.f-s-14').eq(6).find('div').should('contain.text','Remediation Detail');
    });

    it('TC_O2_Dashboard_027_Verify the "Items per page" dropdown in Pagination bar for Ignored events list.',()=>{
        let totalOpenEvents=0;
    let selectedPageCount=0;
  
    cy.get('mat-table mat-row').should('be.visible')
    cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
      const str=response.split(" ")
      totalOpenEvents=parseInt(str[5])
      cy.log(totalOpenEvents)
      cy.get('[aria-label="Items per page:"]').invoke('text').then(response=>{
        selectedPageCount=parseInt(response)
        cy.log(selectedPageCount)
        if(totalOpenEvents > selectedPageCount)
        {
        cy.get('mat-table mat-row').its('length').should('eq', selectedPageCount)
        }
        else
        {
        cy.get('mat-table mat-row').its('length').should('eq', totalOpenEvents)
        } 
      })
    })
    })

    it.only('TC_O2_Dashboard_29_Verify the UI of Closed Events List view.',()=>{
        landingPage.getClosedEventsBtn().click();
        eventsLists.getSearchBtn().should('be.visible');
        eventsLists.getDwnldBtn().should('be.visible');
    
        cy.get('mat-header-row mat-header-cell').then(tableRowHead=>{
            cy.wrap(tableRowHead).eq(0).should('contain.text','Event Name');
            cy.wrap(tableRowHead).eq(2).should('contain.text','Event Type');
            cy.wrap(tableRowHead).eq(3).should('contain.text','Resource ID');
            cy.wrap(tableRowHead).eq(4).should('contain.text','Event Date');
            cy.wrap(tableRowHead).eq(5).should('contain.text','Account');
            cy.wrap(tableRowHead).eq(6).should('contain.text','Region');
        })
        cy.get('.mat-paginator-outer-container').then(paginator=>{
            //Have to scroll, otherwise getting failed
            cy.wrap(paginator).should('contain.text',' Items per page: ');
            //Verifying items per page dropdown is present 
            cy.wrap(paginator).find('.mat-paginator-page-size-select').scrollIntoView().should('be.visible');
            //Verifying (1 – 3 of 3) is present
            cy.wrap(paginator).find('.mat-paginator-range-actions').should('be.visible');
        })
        //Verify default value of items per page is 25
        cy.get('[aria-label="Items per page:"]').invoke('text').then(response=>{
           let selectedPageCount=parseInt(response)
            expect(selectedPageCount).to.eq(25)
        })
        eventsLists.getPreviousPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
        eventsLists.getNextPagebtn().should('be.visible').and('have.prop', 'tagName').should('eq', 'BUTTON');
    })

    it('TC_O2_Dashboard_30_Verify that the Search functionality is able to do search for Closed events',()=>{
        //(Works fine)
       landingPage.getClosedEventsBtn().click()
       const searchText='increase';

       eventsLists.getSearchBtn().type(searchText);
       cy.wait(500);
       cy.get('mat-table').then(table=>{
        if(table.find('mat-row').is(':visible'))
        {
         cy.get('mat-table mat-row').each(tableRow=>{
             cy.wrap(tableRow).find('.cdk-column-event_name').should('contain.text',searchText);
         })
        }
        else{
         cy.get('.no-data').should('contain.text','NO DATA')
        }
     })
    })

    it('TC_O2_Dashboard_031_ Verify Download report option for Closed Events.',()=>{
        Array=['As CSV','As XLSX']
        landingPage.getIgnoredEventBtn().click();
        eventsLists.getDwnldBtn().click({force: true});
        //Downloading CSV and XLSX files successfully
        for(let i=0; i<2;i++)
        {
            cy.contains(Array[i]).click();
            cy.get('.notifier__notification-message').should('contain.text','Preparing Download')
            eventsLists.getDwnldBtn().click({force: true});
        }
        //Verifying pdf download error message
        cy.contains('As PDF').click();
        cy.get('.notifier__notification-message').should('contain.text','PDF export timed out, CSV downloads are recommended for large exports')
    })

    it('TC_O2_Dashboard_032_ Verify the functionality of event action icon for Closed Events list.',()=>{
        landingPage.getClosedEventsBtn().click();
        eventsLists.getEventActionbtn().click();
        cy.contains('View Details').click();
        cy.get('.head-35').should('contain.text','Event Details');
        //Verifying EventName
        cy.get('.cdk-column-event_name').eq(1).invoke('text').then(response=>{
        const EventName= response.trim();
            cy.get('.italic').should('contain.text',EventName);
        })
        //Verifying EventDate
        cy.get('.cdk-column-event_dt').eq(1).invoke('text').then(response=>{
            const EventDate=response.trim();
            cy.get('.p-t-15').should('contain.text',EventDate);
        })
       // Verifying ResourceID
       cy.get('.mat-column-resource_id').eq(1).invoke('text').then(response=>{
            cy.log(response);
            const resourceID=response.trim();
            cy.get('.break-all').should('contain.text',resourceID)
        })
        cy.get('.close-icon ').should('be.visible');
        cy.get('.relative > :nth-child(1) > .font-medium').should('contain.text','Account Name')
        cy.get('.relative > :nth-child(1) > [fxflex="60"]').should('contain.text',data.accountNameQa)
        cy.get('.relative > :nth-child(2) > .font-medium').should('contain.text','Region')
        cy.get('.relative > :nth-child(2) > [fxflex="60"]').invoke('text').then(response=>{
            cy.log(response);
            const resourceID=response.trim();
        })
        cy.get('[mattooltip="click to view JSON"]').should('have.prop', 'tagName').should('eq', 'BUTTON');
        cy.get('.f-s-14').eq(0).should('be.visible');
        cy.get('.f-s-14').eq(1).find('div').should('contain.text','Assigned to');
        cy.get('.f-s-14').eq(2).find('div').should('contain.text','Remediation Type');
        cy.get('.f-s-14').eq(3).find('div').should('contain.text','Support Ticket ID');
        cy.get('.f-s-14').eq(4).find('div').should('contain.text','Current Status');
        cy.get('.f-s-14').eq(5).find('div').should('contain.text','Resource Status');
        cy.get('.f-s-14').eq(6).find('div').should('contain.text','Remediation Detail');
    })

    it('TC_O2_Dashboard_033_Verify the "Items per page" dropdown in Pagination bar for closed events list.',()=>{
        //Works fine
    landingPage.getClosedEventsBtn().click()
    let totalOpenEvents;
    let selectedPageCount;
    cy.get('mat-table mat-row').should('be.visible')
    cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
      const str=response.split(" ")
      totalOpenEvents=parseInt(str[5])
      let array=[10,25,100]
    for(let i=0; i<3;i++)
    {
      cy.get('[aria-label="Items per page:"]').eq(0).click();
      cy.get('#mat-select-8-panel').contains(array[i]).click();
      cy.get('mat-table mat-row').should('be.visible')
      cy.get('[aria-label="Items per page:"]').invoke('text').then(response=>{
        selectedPageCount=parseInt(response)
        if(totalOpenEvents > selectedPageCount)
        {
        cy.get('mat-table mat-row').its('length').should('eq', selectedPageCount)
        }
        else
        {
        cy.get('mat-table mat-row').its('length').should('eq', totalOpenEvents)
        }
      }) 
    }
    })
    })
    
    it('TC_O2_Dashboard_126_Verify the options in the event action icon for open event in All events page.',()=>{

        //(Works fine)
        landingPage.getOpenEventsBtn().invoke('attr', 'class').should('include', 'active');
        eventsLists.getEventActionbtn().click();
        cy.get('mat-row mat-cell').eq(5)
        cy.wait(500);
        cy.get('.mat-menu-content').eq(0).children()
        .should('contain.text', 'View Details')
        .and('contain.text', 'Add Note')
        .and('contain.text', 'Remediate')
        .and('contain.text', 'Mark Compliant')
        .and('contain.text', 'Ignore Event')
    })

    it('TC_O2_Dashboard_127_Verify the options in the event action icon for ignored event in All events page.',()=>{

        //(Works fine)
        landingPage.getIgnoredEventBtn().click()
        landingPage.getIgnoredEventBtn().invoke('attr', 'class').should('include', 'active');
        eventsLists.getEventActionbtn().click();
        cy.get('mat-row mat-cell').eq(5)
        cy.wait(500);
        cy.get('.mat-menu-content').eq(0).children()
        .should('contain.text', 'View Details')
        .and('contain.text', 'Add Note')
        .and('contain.text', 'Reopen Event')
    })
    it('TC_O2_Dashboard_128_Verify the options in the event action icon for closed event in All events page.',()=>{

        //(Works fine)
        landingPage.getClosedEventsBtn().click()
        landingPage.getClosedEventsBtn().invoke('attr', 'class').should('include', 'active');
        eventsLists.getEventActionbtn().click();
        cy.get('mat-row mat-cell').eq(5)
        cy.wait(500);
        cy.get('.mat-menu-content').eq(0).children()
        .should('contain.text', 'View Details')
        .and('contain.text', 'Add Note')
    })
    
})

