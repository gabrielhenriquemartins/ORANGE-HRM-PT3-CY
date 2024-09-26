/// <reference types="cypress" />


export class ClaimPage {

    /**
    * Command: `addExpenseType`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new expense type.
    * 
    * Usage:
    * onClaimPage.addExpenseType('name', 'description')
    * 
    * Parameters:
    * - `name` (String): Expense type name.
    * - `description` (String): Expense description.
    * - `status` (optional): Can be true or false.
    * 
    * Example:
    * onClaimPage.addExpenseType('Carnival', 'Brazilian holiday!')
    */
    addExpenseType(name, description, status = true, statusCode = 200) {

        const data = {
            "name": name,
            "description": description,
            "status": status
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'web/index.php/api/v2/claim/expenses/types',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('expenseId', response.body.data.id)
                }
            })
        })
    }

    /**
    * Command: `deleteExpenseType`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete an expense type.
    * 
    * Usage:
    * onClaimPage.deleteExpenseType()
    * 
    * Parameters:
    * None
    * 
    * Example:
    * onClaimPage.deleteExpenseType()
    */
    deleteExpenseType(statusCode = 200) {
        const id = Cypress.env('expenseId')

        const data = {
            "ids": [id]
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'web/index.php/api/v2/claim/expenses/types',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }
}

export const onClaimPage = new ClaimPage()