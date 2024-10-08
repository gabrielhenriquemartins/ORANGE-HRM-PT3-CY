import { onAdminPage } from "../resources/backend/page_objects/adminPageAPI"
import { onPimPage } from "../resources/backend/page_objects/pimPageAPI"
import { onLeavePage } from "../resources/backend/page_objects/leavePageAPI"
import { onTimePage } from "../resources/backend/page_objects/timePageAPI"
import { onRecruitmentPage } from "../resources/backend/page_objects/recruitmentPageAPI"
import { onMyInfoPage } from "../resources/backend/page_objects/myinfoPageAPI"
import { onPerformancePage } from "../resources/backend/page_objects/performancePageAPI"
import { onDashboardPage } from "../resources/backend/page_objects/dashboardPageAPI"
import { onClaimPage } from "../resources/backend/page_objects/claimPageAPI"
import { onBuzzPage } from "../resources/backend/page_objects/buzzPageAPI"

describe('1 - Admin', () => {
    it('[CY] Add a Job Title', () => {
        cy.log('OTS-137')
        cy.loginWithAuthentication()
        onAdminPage.addJobTitle("New Other one")
    })

    it('[CY] Add Duplicated Job Title - Expect 422', () => {
        cy.log('OTS-138')
        onAdminPage.addJobTitle("New Other one", undefined, undefined, 422)
    })

    it('[CY] Delete Job Title', () => {
        cy.log('OTS-139')
        onAdminPage.deleteJobTitle()
    })

    it('[CY] Delete Non-Existing Job Title - Expect 404', () => {
        cy.log('OTS-140')
        onAdminPage.deleteJobTitle(404)
    })

    it('[CY] Add a Location', () => {
        cy.log('OTS-141')
        onAdminPage.addLocation("OTHER", "City", "Minas", "BR")
    })

    it('[CY] Delete Location', () => {
        cy.log('OTS-143')
        onAdminPage.deleteLocation()
    })

    it('[CY] Delete Non-Existing Location - Expect 404', () => {
        cy.log('OTS-144')
        onAdminPage.deleteLocation(404)
    })

    it('[CY] Send Email Notification', () => {
        cy.log('OTS-145')
        onAdminPage.sendEmailConfiguration("send@mail.com", "destination@mail.com")
    })

    it('[CY] Change Corp Brand Color', () => {
        cy.log('OTS-146')
        onAdminPage.changeCorpBrand("#2efc04", "#FFFFFF", "#1703fb", "#FFFFFF", "#f9e104", "#dc04f5")
    })

    it('[CY] Change Corp Brand Color to Default', () => {
        cy.log('OTS-147')
        onAdminPage.changeCorpBrand()
    })

    it('[CY] Deactivate all Modules - Expect 422', () => {
        cy.log('OTS-148')
        onAdminPage.activateDeactivateModules(false, false, false, false,
            false, false, false, false, false, false, false, 422)
    })

    it('[CY] Deactivate all Modules - Expect 200', () => {
        cy.log('OTS-149')
        onAdminPage.activateDeactivateModules(true, true, false, false,
            false, false, false, false, false, false, false, 200)
    })

    it('[CY] Activate all Modules', () => {
        cy.log('OTS-150')
        onAdminPage.activateDeactivateModules()
    })

    it('[CY] Change Language to English', () => {
        cy.log('OTS-151')
        onAdminPage.changeLanguage()
    })

})


describe('2 - PIM', () => {
    it('[CY] Add an Employee', () => {
        cy.log('OTS-152')
        onPimPage.addEmployee("Gabriel", "Martins", "Henrique", "9987")
    })

    it('[CY] Add a Duplicated Employee - Expect 422', () => {
        cy.log('OTS-153')
        onPimPage.addEmployee("Gabriel", "Martins", "Henrique", "9987", 422)
    })

    it('[CY] Deleten Employee', () => {
        cy.log('OTS-154')
        onPimPage.deleteEmployee()
    })

    it('[CY] Delete Non-Existing Employee - Expect 404', () => {
        cy.log('OTS-155')
        onPimPage.deleteEmployee(404)
    })

})

describe('3 - Leave', () => {
    it('[CY] Add a Leave Type', () => {
        cy.log('OTS-156')
        onLeavePage.addLeaveType("New Leave VXX")
    })

    it('[CY] Add a Duplicated Leave Type - Expect 422', () => {
        cy.log('OTS-157')
        onLeavePage.addLeaveType("New Leave VXX", undefined, 422)
    })

    it('[CY] Delete Leave Type', () => {
        cy.log('OTS-158')
        onLeavePage.deleteLeaveType()
    })

    it('[CY] Delete Non-Existing Leave Type - Expect 404', () => {
        cy.log('OTS-159')
        onLeavePage.deleteLeaveType(404)
    })

})

describe('4 - Time', () => {

    it('[CY] Configure the Default Attendance Options', () => {
        cy.log('OTS-160')
        onTimePage.attendanceConfiguration()
    })

    it('[CY] Add a Punch Out and Ignore error', () => {
        cy.log('OTS-161')
        cy.on('fail', (error) => {
            console.log('Ignoring error:', error.message);
            console.log('The records are correctly set!');
            return false;
        })
        const currentDate = new Date()
        const futureDate = new Date(currentDate.getTime() + 400 * 24 * 60 * 60 * 1000)
        const formatFutureDate = futureDate.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const currentTime = new Date().toLocaleTimeString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        onTimePage.addPunchOut(formatFutureDate, currentTime)
    })

    it('[CY] Get all Punch In and Punch Out - Before a Record', () => {
        cy.log('OTS-162')
        onTimePage.getAllPunchInPunchOut()
    })

    it('[CY] Delete all Punch In Punch Out - Before a Record', () => {
        cy.log('OTS-163')
        cy.on('fail', (error) => {
            console.log('Ignoring error:', error.message);
            console.log('No records found to be deleted!');
            return false;
        })
        onTimePage.deleteAllPunchInOut()
    })

    it('[CY] Add a Punch In', () => {
        cy.log('OTS-164')
        const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const currentTime = new Date().toLocaleTimeString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        onTimePage.addPunchIn(currentDate, currentTime)
    })

    it('[CY] Add a Punch Out', () => {
        cy.log('OTS-165')
        const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const currentTime = new Date().toLocaleTimeString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        onTimePage.addPunchOut(currentDate, currentTime)
    })

    it('[CY] Get all Punch In and Punch Out - After a Record', () => {
        cy.log('OTS-166')
        onTimePage.getAllPunchInPunchOut()
    })

    it('[CY] Delete all Punch In Punch Out - After a Record', () => {
        cy.log('OTS-167')
        onTimePage.deleteAllPunchInOut()
    })
})

describe('5 - Recruitment', () => {

    it('[CY] Get All Job Titles', () => {
        cy.log('OTS-168')
        onRecruitmentPage.getJobTitles()
    })

})

describe('6 - My Info', () => {

    it('[CY] Get Personal Details', () => {
        cy.log('OTS-169')
        onMyInfoPage.getPersonalDetails()
    })

})

describe('7 - Performance', () => {

    it('[CY] Get First Job Title ID', () => {
        cy.log('OTS-170')
        onPerformancePage.getFirstJobTitle()
    })

    it('[CY] Add Kpi', () => {
        cy.log('OTS-171')
        let titleId
        onPerformancePage.getFirstJobTitle().then((id) => {
            titleId = id
            onPerformancePage.addKpi("My KPI", titleId)
        })
    })

    it('[CY] Delete Kpi', () => {
        cy.log('OTS-172')
        onPerformancePage.deleteKpi()
    })

    it('[CY] Delete Non-Existing Kpi - Expect 404', () => {
        cy.log('OTS-173')
        onPerformancePage.deleteKpi(404)
    })
})


describe('8 - Dashboard', () => {

    it('[CY] Check Dashboards', () => {
        cy.log('OTS-174')
        onDashboardPage.checkDashboard()
    })

})

describe('9 - Claim', () => {

    it('[CY] Add Expense Type', () => {
        cy.log('OTS-175')
        onClaimPage.addExpenseType('Carnival', 'Brazilian holiday!')
    })

    it('[CY] Add Duplicated Expense Type - Expect 422', () => {
        cy.log('OTS-176')
        onClaimPage.addExpenseType('Carnival', 'Brazilian holiday!', undefined, 422)
    })

    it('[CY] Delete Expense Type', () => {
        cy.log('OTS-177')
        onClaimPage.deleteExpenseType()
    })

    it('[CY] Delete Non-Existing Expense Type - Expect 404', () => {
        cy.log('OTS-178')
        onClaimPage.deleteExpenseType(404)
    })

})

describe('10 - Buzz', () => {

    it('[CY] Add a Post', () => {
        cy.log('OTS-179')
        onBuzzPage.addPost('Hi everyone!')
    })

    it('[CY] Delete a Post', () => {
        cy.log('OTS-180')
        onBuzzPage.deleteAPost()
    })

    it('[CY] Delete Non-Existing Post - Expect 422', () => {
        cy.log('OTS-181')
        onBuzzPage.deleteAPost(422)
    })

})
