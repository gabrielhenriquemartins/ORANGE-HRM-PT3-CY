/// <reference types="cypress" />

export class MyInfoPage {

    /**
    * Command: `getPersonalDetails`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Get My Info details
    * 
    * Example:
    * onMyInfoPage.getPersonalDetails()
    */
    getPersonalDetails(statusCode = 200) {
        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'GET',
                url: 'web/index.php/api/v2/pim/employees/7/personal-details',
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

export const onMyInfoPage = new MyInfoPage()