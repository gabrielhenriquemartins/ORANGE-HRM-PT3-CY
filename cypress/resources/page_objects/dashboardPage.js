/// <reference types="cypress" />

export class DashboardPage {

    /**
    * Command: `checkDashboard`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Verify the dashboard request.
    * 
    * Usage:
    * onAdminPage.checkDashboard()
    * 
    * Parameters:
    * None
    * 
    * Example:
    * onDashboardPage.checkDashboard()
    */
    checkDashboard(statusCode = 200) {
        const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const currentTime = new Date().toLocaleTimeString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'GET',
                url: 'web/index.php/api/v2/dashboard/employees/time-at-work?timezoneOffset=-3&currentDate=' + currentDate + '&currentTime=' + currentTime,
                headers: headers
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    expect(response.body.data).to.not.be.empty;
                }
            })
        })
    }
}


export const onDashboardPage = new DashboardPage()