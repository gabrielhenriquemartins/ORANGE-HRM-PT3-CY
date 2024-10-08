/// <reference types="cypress" />

export class PerformancePage {

    /**
    * Command: `getFirstJobTitle`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Identify the first job title available
    * 
    * Usage:
    * onPerformancePage.getFirstJobTitle()
    * 
    * Parameters:
    * None
    * 
    * Example:
    * onPerformancePage.getFirstJobTitle()
    */
    getFirstJobTitle(statusCode = 200) {
        return cy.createDictionaryHeader().then((headers) => {
            return cy.request({
                method: 'GET',
                url: 'api/v2/admin/job-titles?limit=0',
                headers: headers
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    console.log(response.body.data[0].id)
                    return response.body.data[0].id
                }
            })
        })
    }

    /**
    * Command: `addKpi`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new kpi.
    * 
    * Usage:
    * onPerformancePage.addKpi('expense', 'amount')
    * 
    * Parameters:
    * - `title` (String): Key Performance indicator name.
    * - `jobTitleId` (String): Job ID to associate to the KPI.
    * - `minRating` (optional): Minimum rating.
    * - `maxRating` (optional): Maximum rating.
    * - `isDefault` (optional): The default value is set to False.
    * 
    * Example:
    * onPerformancePage.addKpi('Active Defects', '10')
    */
    addKpi(title, jobTitleId, minRating = 0, maxRating = 100, isDefault = false, statusCode = 200) {

        console.log(jobTitleId)
        const data = {
            "title": title,
            "jobTitleId": jobTitleId,
            "minRating": minRating,
            "maxRating": maxRating,
            "isDefault": isDefault
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'api/v2/performance/kpis',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('kpiId', response.body.data.id)
                }
            })
        })
    }

    /**
    * Command: `deleteKpi`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete a KPI.
    * 
    * Usage:
    * onPerformancePage.deleteKpi()
    * 
    * Parameters:
    * None
    *
    * Example:
    * onPerformancePage.deleteKpi()
    */
    deleteKpi(statusCode = 200) {
        const id = Cypress.env('kpiId')
        const data = {
            "ids": [id]
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'api/v2/performance/kpis',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }
}

export const onPerformancePage = new PerformancePage()