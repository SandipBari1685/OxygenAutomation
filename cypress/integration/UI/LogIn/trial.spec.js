
var data= require('../../../fixtures/oxygenData.json');
const { eventsLists } = require('../../../support/page_objects/EventsList');
const { landingPage } = require('../../../support/page_objects/landingPage');
describe('Trial',()=>{


    beforeEach('login',()=>{
        cy.apiLogin(data.email,data.password)
        landingPage.getAccountDropdown().click();
        cy.get('#header-account-dropdown-panel').contains(data.accountNameQa).click();
    })
  
  it('Trial3',()=>{

    //IMPORTANT
    let num;
    cy.get('.active-tab > .tab-head').should($Number=>{
      num= +$Number.text().trim();
      expect(num).to.eq(674);
    })
    cy.get('.mat-select-arrow').eq(4).click();
    let array=[10,25,100]
    for(let i=0; i>3;i++)
    {
      cy.contains(array[i]).click();
      if(num>array[i])
                 {
                  cy.get('mat-header-row').should('have.length',array[i]);
                 }
    }
  })

  it('TC-008_Count Matching TC',()=>{
    //Doubt here
    let pattern=/[0-9]{1,}/
    var total=0;
    var count1; 
    var count2; 
    var count3;
    var count4;
    var count5;

    cy.get('.highcharts-data-label-color-1 > text > :nth-child(4)').invoke('text').then(response=>{
      let securityCount= response.match(pattern);
      count1=Number(securityCount)
    })
    cy.get('.highcharts-data-label-color-0 > text > :nth-child(4)').invoke('text').then(response=>{
      let complianceCount= response.match(pattern);
      count2=Number(complianceCount)
    })
    cy.get('.highcharts-data-label-color-2 > text > :nth-child(4)').invoke('text').then(response=>{
      let noType= response.match(pattern);
      count3=Number(noType)
    })
    cy.get('.highcharts-data-label-color-3 > text > :nth-child(4)').invoke('text').then(response=>{
      let avaiLability=response.match(pattern);
      count4 = Number(avaiLability)
      total=count1 + count2 + count3 + count4
    })
    cy.get('.highcharts-data-label-color-4 > text > :nth-child(4)').invoke('text').then(response=>{
      let cost= response.match(pattern);
      count5= Number(cost);
      total=count1 + count2 + count3 + count4 + count5
      cy.log(total)
    })
    cy.get('.active-tab > .tab-head') .invoke('text').then(text=>{
      expect(Number(text)).to.eq(total);
      cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
       const str=response.split(" ");
       const num=parseInt(str[5]);
       expect(Number(text)).to.eq(num);
      })
    })
  })

  it('TC_Pagination number and events number', ()=>{
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

  it("Selected number of count should display in eventslist for openEvents",()=>{

    //Works fine
    let totalOpenEvents;
    let selectedPageCount;
    cy.get('mat-table mat-row').should('be.visible')
    cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
      const str=response.split(" ")
      totalOpenEvents=parseInt(str[5])
      let array=[10,25,100]
    for(let i=0; i<3;i++)
    {
      cy.get(".mat-select-arrow").eq(4).click();
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

  it("TC_O2_Dashboard_035_Verify that the functionality of Security tab in dashboard.",()=>{
    landingPage.getSecuritybtn().click()
    landingPage.getSecuritybtn().invoke('attr', 'class').should('include', 'active')
    cy.get('mat-table mat-row').should('be.visible')

    // Verifying openEvents counts with pagination count
    cy.get('.p-b-5').eq(0).invoke('text').then(OpenEventsCount=>{
        cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
            const str=response.split(" ");
            const paginationCount=Number(str[5]);
            expect(Number(OpenEventsCount)).to.eq(paginationCount);
        })
    })

    // Verifying IgnoredEvents count with pagination count
    cy.get('app-event-count').eq(1).click()
    cy.get('.p-b-5').eq(1).invoke('text').then(ignoreEventsCount=>{
    cy.get('mat-table mat-row').should('be.visible')
        cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
        const str=response.split(" ");
        const paginationCount=Number(str[5]);
        expect(Number(ignoreEventsCount)).to.eq(paginationCount);
        })
    })

    //Verifying closedEvents count with pagination count
    cy.get('app-event-count').eq(2).click()
    cy.get('.p-b-5').eq(2).invoke('text').then(closedEventsCount=>{
        cy.log(closedEventsCount)
        cy.log("Typeof closeEvent",typeof closedEventsCount)

    cy.get('mat-table mat-row').should('be.visible')
        cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{    
        const str=response.split(" ");
        const paginationCount=Number(str[5]);
        cy.log(paginationCount)
        expect(parseInt(closedEventsCount)).to.eq(paginationCount);
        })
    })
  })

  it("Selected number of count should display in eventslist for ignored Events",()=>{

    //Works fine
    landingPage.getIgnoredEventBtn().click()
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

  it("Next button and previous button test",()=>{
    cy.get('[aria-label="Previous page"]');
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
})

