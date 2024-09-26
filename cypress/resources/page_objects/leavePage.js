/// <reference types="cypress" />

let randomAcronym = null;

export class LeavePage {

    /**
    * Command: `addLeaveType`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new leave type.
    * 
    * Usage:
    * onLeavePage.addLeaveType('name', 'situational')
    * 
    * Parameters:
    * - `name` (String): Leave type name.
    * - `situational` (String): True or False, this is related to the entitlement situational.
    * 
    * Example:
    * onLeavePage.addLeaveType('Carnival')
    */
    addLeaveType(name, situational = true, statusCode = 200) {
        const data = {
            "name": name,
            "situational": situational
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'web/index.php/api/v2/leave/leave-types',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('leaveId', response.body.data.id)
                }
            })
        })
    }

    /**
    * Command: `deleteLeaveType`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete the last created leave type.
    * 
    * Usage:
    * onLeavePage.deleteLeaveType()
    * 
    * Parameters:
    * - none
    * 
    * Example:
    * onLeavePage.deleteLeaveType()
    */
    deleteLeaveType(statusCode = 200) {
        const id = Cypress.env('leaveId')
        const data = {
            "ids": [id]
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'web/index.php/api/v2/leave/leave-types',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }
}

export const onLeavePage = new LeavePage()