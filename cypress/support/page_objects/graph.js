export class Graph{

    getComplianceCount(){
        let complianceCount;
        cy.get('.highcharts-data-label-color-0 > text > :nth-child(4)').invoke('text').then(compliance=>{
            let pattern=/[0-9]{1,}/
            return complianceCount= +compliance.match(pattern);
        })
    }

    getSecurityCount(){
        let securityCount;
        cy.get('.highcharts-data-label-color-1 > text > :nth-child(4)').invoke('text').then(security=>{
            let pattern=/[0-9]{1,}/
            return securityCount= +security.match(pattern);
        })
    }
}

 export const graph= new Graph();