/// <reference types="cypress" />

export class RecruitmentPage {

    /**
    * Command: `getJobTitles`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Get All Job Titles
    * 
    * Example:
    * onMyInfoPage.getJobTitles()
    */
    getJobTitles(statusCode = 200) {
        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'GET',
                url: 'api/v2/admin/job-titles?limit=0',
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

export const onRecruitmentPage = new RecruitmentPage()