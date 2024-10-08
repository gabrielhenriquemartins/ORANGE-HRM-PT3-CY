/// <reference types="cypress" />

export class PimPage {

    /**
    * Command: `addEmployee`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new employee with an unique id.
    * Must be specified the first, middle and last name.
    * 
    * Usage:
    * onPimPage.addEmployee('firstName', 'lastName', 'middleName', 'employeeId')
    * 
    * Parameters:
    * - `firstName` (String): Employee first name.
    * - `lastName` (String): Employee last name.
    * - `middleName` (String): Employee last name.
    * - `employeeId` (Int): Employee identifier.
    * 
    * Example:
    * onPimPage.addEmployee('Gabriel', 'Martins', 'Henrique', '8884')
    */
    addEmployee(firstName, lastName, middleName, employeeId, statusCode = 200) {
        const data = {
            "employeeId": employeeId,
            "firstName": firstName,
            "lastName": lastName,
            "middleName": middleName
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'api/v2/pim/employees',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('employeeId', response.body.data.empNumber)
                }
            })
        })
    }

    /**
    * Command: `deleteEmployee`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete the last created employee.
    * 
    * Usage:
    * onPimPage.deleteEmployee()
    * 
    * Example:
    * onPimPage.deleteEmployee()
    */
    deleteEmployee(statusCode = 200) {
        const id = Cypress.env('employeeId')
        const data = {
            "ids": [id]
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'api/v2/pim/employees',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }
}

export const onPimPage = new PimPage()