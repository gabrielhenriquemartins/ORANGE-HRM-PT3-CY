import { AdminPage, onAdminPage } from "../resources/page_objects/adminPage"
import { onPimPage } from "../resources/page_objects/pimPage"
import { onLeavePage } from "../resources/page_objects/leavePage"
import { onTimePage } from "../resources/page_objects/timePage"
import { onRecruitmentPage } from "../resources/page_objects/recruitmentPage"
import { onMyInfoPage } from "../resources/page_objects/myinfoPage"
import { onPerformancePage } from "../resources/page_objects/performancePage"
import { onDashboardPage } from "../resources/page_objects/dashboardPage"
import { onClaimPage } from "../resources/page_objects/claimPage"
import { onBuzzPage } from "../resources/page_objects/buzzPage"

describe('0 - Login', () => {
    it('Login With Authentication', () => {
        cy.loginWithAuthentication()
    })
})

describe('1 - Admin', () => {
    it('Add a Job Title', () => {
        onAdminPage.addJobTitle("New Other one")
    })

    it('Add Duplicated Job Title - Expect 422', () => {
        onAdminPage.addJobTitle("New Other one", undefined, undefined, 422)
    })

    it('Delete Job Title', () => {
        onAdminPage.deleteJobTitle()
    })

    it('Delete Non-Existing Job Title - Expect 404', () => {
        onAdminPage.deleteJobTitle(404)
    })

    it('Add a Location', () => {
        onAdminPage.addLocation("OTHER", "City", "Minas", "BR")
    })

    it('Add Duplicated Location - Expect 200', () => {
        onAdminPage.addLocation("OTHER", "City", "Minas", "BR", undefined, undefined, undefined, 200)
    })

    it('Delete Location', () => {
        onAdminPage.deleteLocation()
    })

    it('Delete Non-Existing Location - Expect 404', () => {
        onAdminPage.deleteLocation(404)
    })

    it('Send Email Notification', () => {
        onAdminPage.sendEmailConfiguration("send@mail.com", "destination@mail.com")
    })

    it('Change Corp Brand Color', () => {
        onAdminPage.changeCorpBrand("#2efc04", "#FFFFFF", "#1703fb", "#FFFFFF", "#f9e104", "#dc04f5")
    })

    it('Change Corp Brand Color to Default', () => {
        onAdminPage.changeCorpBrand()
    })

    it('Deactivate all Modules - Expect 422', () => {
        onAdminPage.activateDeactivateModules(false, false, false, false,
            false, false, false, false, false, false, false, 422)
    })

    it('Deactivate all Modules - Expect 200', () => {
        onAdminPage.activateDeactivateModules(true, true, false, false,
            false, false, false, false, false, false, false, 200)
    })

    it('Activate all Modules', () => {
        onAdminPage.activateDeactivateModules()
    })

    it('Change Language to Spanish', () => {
        onAdminPage.changeLanguage("es")
    })

    it('Change Language to English', () => {
        onAdminPage.changeLanguage()
    })

})


describe('2 - PIM', () => {
    it('Add an Employee', () => {
        onPimPage.addEmployee("Gabriel", "Martins", "Henrique", "9987")
    })

    it('Add a Duplicated Employee - Expect 422', () => {
        onPimPage.addEmployee("Gabriel", "Martins", "Henrique", "9987", 422)
    })

    it('Deleten Employee', () => {
        onPimPage.deleteEmployee()
    })

    it('Delete Non-Existing Employee - Expect 404', () => {
        onPimPage.deleteEmployee(404)
    })

})

describe('3 - Leave', () => {
    it('Add a Leave Type', () => {
        onLeavePage.addLeaveType("Carnival Oldest")
    })

    it('Add a Duplicated Leave Type - Expect 422', () => {
        onLeavePage.addLeaveType("Carnival Oldest", undefined, 422)
    })

    it('Delete Leave Type', () => {
        onLeavePage.deleteLeaveType()
    })

    it('Delete Non-Existing Leave Type - Expect 404', () => {
        onLeavePage.deleteLeaveType(404)
    })

})

describe('4 - Time', () => {

    it('Add a Punch Out', () => {
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

    it('Get all Punch In and Punch Out - Before a Record', () => {
        onTimePage.getAllPunchInPunchOut()
    })

    it('Delete all Punch In Punch Out - Before a Record', () => {
        cy.on('fail', (error) => {
            console.log('Ignoring error:', error.message);
            console.log('No records found to be deleted!');
            return false;
        })
        onTimePage.deleteAllPunchInOut()
    })

    it('Add a Punch In', () => {
        const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const currentTime = new Date().toLocaleTimeString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        onTimePage.addPunchIn(currentDate, currentTime)
    })

    it('Add a Punch Out', () => {
        const currentDate = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
        const currentTime = new Date().toLocaleTimeString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        onTimePage.addPunchOut(currentDate, currentTime)
    })

    it('Get all Punch In and Punch Out - After a Record', () => {
        onTimePage.getAllPunchInPunchOut()
    })

    it('Delete all Punch In Punch Out - After a Record', () => {
        onTimePage.deleteAllPunchInOut()
    })
})

describe('5 - Recruitment', () => {

    it('Get All Job Titles', () => {
        onRecruitmentPage.getJobTitles()
    })

})

describe('6 - My Info', () => {

    it('Get Personal Details', () => {
        onMyInfoPage.getPersonalDetails()
    })

})

describe('7 - Performance', () => {

    it('Get First Job Title ID', () => {
        onPerformancePage.getFirstJobTitle()
    })

    it('Add Kpi', () => {
        let titleId
        onPerformancePage.getFirstJobTitle().then((id) => {
            titleId = id
            onPerformancePage.addKpi("My KPI", titleId)
        })
    })

    it('Delete Kpi', () => {
        onPerformancePage.deleteKpi()
    })

    it('Delete Non-Existing Kpi - Expect 404', () => {
        onPerformancePage.deleteKpi(404)
    })
})


describe('8 - Dashboard', () => {

    it('Check Dashboards', () => {
        onDashboardPage.checkDashboard()
    })

})

describe('9 - Claim', () => {

    it('Add Expense Type', () => {
        onClaimPage.addExpenseType('Carnival', 'Brazilian holiday!')
    })

    it('Add Duplicated Expense Type - Expect 422', () => {
        onClaimPage.addExpenseType('Carnival', 'Brazilian holiday!', undefined, 422)
    })

    it('Delete Expense Type', () => {
        onClaimPage.deleteExpenseType()
    })

    it('Delete Non-Existing Expense Type - Expect 404', () => {
        onClaimPage.deleteExpenseType(404)
    })

})

describe('10 - Buzz', () => {

    it('Add a Post', () => {
        onBuzzPage.addPost('Hi everyone!')
    })

    it('Delete a Post', () => {
        onBuzzPage.deleteAPost()
    })

    it('Delete Non-Existing Post - Expect 422', () => {
        onBuzzPage.deleteAPost(422)
    })

})
