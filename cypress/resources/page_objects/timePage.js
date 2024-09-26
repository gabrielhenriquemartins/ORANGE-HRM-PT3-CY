/// <reference types="cypress" />

export class TimePage {

    /**
    * Command: `getAllPunchInPunchOut`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Get all records associated to the current date
    * 
    * Usage:
    * onTimePage.getAllPunchInPunchOut()
    * 
    * Parameters:
    * none
    *
    * Example:
    * onTimePage.getAllPunchInPunchOut()
    */
    getAllPunchInPunchOut(statusCode = 200) {
        const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'GET',
                url: 'web/index.php/api/v2/attendance/records?limit=50&offset=0&date=' + currentDate,
                headers: headers
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    const ids = []
                    response.body.data.forEach((item) => {
                        const id = item.id
                        ids.push(id)
                    })
                    Cypress.env('allPunchInOut', ids)
                }
            })
        })
    }

    /**
    * Command: `deleteAllPunchInOut`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete a given punch in / punch out based on date defined in getAllPunchInPunchOut.
    * 
    * Usage:
    * onTimePage.deleteAllPunchInOut()
    * 
    * Parameters:
    * None
    *
    * Example:
    * onTimePage.deleteAllPunchInOut()
    */
    deleteAllPunchInOut(statusCode = 200) {
        const ids = Cypress.env('allPunchInOut')
        const data = {
            "ids": ids
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'web/index.php/api/v2/attendance/records',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }

    /**
    * Command: `addPunchIn`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Add a punch in to my records in Orange HRM application
    * 
    * Usage:
    * onPimPage.addPunchIn('date', 'time')
    * 
    * Parameters:
    * - `date` (String): The date to be created the Punch In.
    * - `time` (String): The time to be created the Punch In
    * - `note` (optional): Note associated to the Punch In.
    * - `timezoneOffset` (optional): Based in UTC, for São Paulo UTC -3 is the default value.
    * - `timezoneName` (optional): Timezone name, for São Paulo - America/Sao_Paulo.
    * 
    * Example:
    * onPimPage.addPunchIn('2024-10-26', '18:02')
    */
    addPunchIn(date, time, note = "My Note", timezoneOffset = "-3", timezoneName = "America/Sao_Paulo", statusCode = 200) {
        const data = {
            "date": date,
            "time": time,
            "note": note,
            "timezoneOffset": timezoneOffset,
            "timezoneName": timezoneName
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'web/index.php/api/v2/attendance/records',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    expect(response.body.data).to.not.be.empty;
                }
            })
        })
    }

    /**
    * Command: `addPunchOut`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Add a punch out to my records in Orange HRM application
    * 
    * Usage:
    * onPimPage.addPunchOut('date', 'time')
    * 
    * Parameters:
    * - `date` (String): The date to be created the Punch In.
    * - `time` (String): The time to be created the Punch In
    * - `note` (optional): Note associated to the Punch In.
    * - `timezoneOffset` (optional): Based in UTC, for São Paulo UTC -3 is the default value.
    * - `timezoneName` (optional): Timezone name, for São Paulo - America/Sao_Paulo.
    * 
    * Example:
    * onPimPage.addPunchOut('2024-10-26', '18:02')
    */
    addPunchOut(date, time, note = "My Note", timezoneOffset = "-3", timezoneName = "America/Sao_Paulo", statusCode = 200) {
        const data = {
            "date": date,
            "time": time,
            "note": note,
            "timezoneOffset": timezoneOffset,
            "timezoneName": timezoneName
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'PUT',
                url: 'web/index.php/api/v2/attendance/records',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    expect(response.body.data).to.not.be.empty;
                }
            })
        })
    }
}

export const onTimePage = new TimePage()