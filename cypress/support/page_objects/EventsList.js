export class Listview{
 
    getSearchBtn(){
        return cy.get('.c-card [placeholder="Search"]');
    }

    getDwnldBtn(){
        return cy.get('[mattooltip="Download Report"]');
    }

    getBulkActionBtn()
    {
        return cy.get('[placeholder="Bulk Actions"]')
    }

    getApplyBtn(){
        return cy.contains('Apply')
    }

    getEventActionbtn(){
        return cy.get('mat-row').eq(0).find('mat-cell').last();
    }

    getCheckboxbtn(){
        return cy.get('mat-row').eq(1).find('mat-cell').eq(0)
    }

    getTotalEventsCount(){
        cy.get('.mat-paginator-container > .mat-paginator-range-actions').invoke('text').then(response=>{
            const str=response.split(" ")
            const num=parseInt(str[5]);
            return num;
        })
    }

    getNextPagebtn(){
        return cy.get('.mat-paginator-container').find('[aria-label="Next page"]') 
    }

    getPreviousPagebtn(){
        return cy.get('.mat-paginator-container').find('[aria-label="Previous page"]') 
    }
}

export const eventsLists= new Listview();