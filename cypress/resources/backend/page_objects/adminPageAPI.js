/// <reference types="cypress" />

let randomAcronym = null;

export class AdminPage {

    /**
    * Command: `addJobTitle`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new job title with a given description and note.
    * 
    * Usage:
    * onAdminPage.addJobTitle('jobTitle', 'description', 'note')
    * 
    * Parameters:
    * - `jobTitle` (String): Job Title.
    * - `description` (String): The job title description
    * - `note` (String): The job title note.
    * 
    * Example:
    * onAdminPage.addJobTitle('Senior DevOps', 'My Description', 'My Note')
    */
    addJobTitle(jobTitle, description = "My Description", note = "My Note", statusCode = 200) {
        const data = {
            "title": jobTitle,
            "description": description,
            "note": note
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'api/v2/admin/job-titles',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('jobId', response.body.data.id)
                }
            })
        })
    }

    /**
    * Command: `deleteJobTitle`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given job title.
    * 
    * Usage:
    * onAdminPage.deleteJobTitle('jobTitle')
    * 
    * Parameters:
    * - `jobTitle` (String): Job Title to be deleted.
    * 
    * Example:
    * onAdminPage.deleteJobTitle('Senior DevOps')
    */
    deleteJobTitle(statusCode = 200) {
        const id = Cypress.env('jobId')
        const data = {
            "ids": [id]
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'api/v2/admin/job-titles',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }
    /**
    * Command: `addLocation`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new location with a given name, city, state, country, zip code, phone and fax.
    * 
    * Usage:
    * onAdminPage.addLocation('name', 'city', 'state', 'country', 'zip_code', 'phone', 'fax')
    * 
    * Parameters:
    * - `name` (String): Location identifier.
    * - `city` (String): The city.
    * - `state` (String): The state.
    * - `country` (String): The country.
    * - `zip_code` (Int): (Optional) zip code area.
    * - `phone` (Int): (Optional) phone.
    * - `fax` (Int): (Optional) fax.
    * 
    * Example:
    * onAdminPage.addLocation('R&D', 'New York', 'California', 'Brazil', '1000', '1000', '1000')
    */
    addLocation(name, city, state, country, zip_code = "1000000", phone = "11111", fax = "11111", statusCode = 200) {
        const data = {
            "address": "Address",
            "city": city,
            "countryCode": country,
            "fax": fax,
            "name": name,
            "note": "My Note",
            "phone": phone,
            "province": state,
            "zipCode": zip_code,
        }
        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'api/v2/admin/locations',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('locationId', response.body.data.id)
                }
            })
        })
    }

    /**
    * Command: `deleteLocation`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete a location.
    * 
    * Usage:
    * onAdminPage.deleteLocation()
    * 
    * Parameters:
    * - none
    * 
    * Example:
    * onAdminPage.deleteLocation()
    */
    deleteLocation(statusCode = 200) {
        const id = Cypress.env('locationId')
        const data = {
            "ids": [id]
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'api/v2/admin/locations',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }

    /**
    * Command: `sendEmailConfiguration`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Send a email from the desired email set to a deseired destination.
    * 
    * Usage:
    * onAdminPage.sendEmailConfiguration('emailSender', 'emailDestination', 'statusCode')
    * 
    * Parameters:
    * - `emailSender` (String): Email sender, must contain @.
    * - `emailDestination` (String): Email destination, must contain @.
    * 
    * Example:
    * onAdminPage.sendEmailConfiguration('test_sender@hotmail.com', 'test_destination@hotmail.com')
    */
    sendEmailConfiguration(emailSender, emailDestination, statusCode = 200) {

        const data = {
            "mailType": "sendmail",
            "sentAs": emailSender,
            "smtpHost": null,
            "smtpPort": null,
            "smtpUsername": "",
            "smtpPassword": null,
            "smtpAuthType": "none",
            "smtpSecurityType": "none",
            "testEmailAddress": emailDestination
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'PUT',
                url: 'api/v2/admin/email-configuration',
                headers: headers,
                body: data
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }

    /**
    * Command: `changeCorpBrand`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Change the website color.
    * 
    * Usage:
    * onAdminPage.changeCorpBrand('primaryColor', 'primaryFontColor', 'secondaryColor', 'secondaryFontColor', 'primaryGradStartColor', 'primaryGradEndColor', statusCode)
    * 
    * Parameters:
    * - `primaryColor` (String): The default value is set.
    * - `primaryFontColor` (String): The default value is set.
    * - `secondaryColor` (String): The default value is set.
    * - `secondaryFontColor` (String): The default value is set.
    * - `primaryGradientStartColor` (String): The default value is set.
    * - `primaryGradientEndColor` (String): The default value is set.
    * 
    * Example:
    * onAdminPage.changeCorpBrand()
    */
    changeCorpBrand(primaryColor = "#FF7B1D", primaryFontColor = "#FFFFFF", secondaryColor = "#76BC21", secondaryFontColor = "#FFFFFF",
        primaryGradStartColor = "#FF920B", primaryGradEndColor = "#F35C17", statusCode = 200) {

        const data = {
            variables: {
                "primaryColor": primaryColor,
                "primaryFontColor": primaryFontColor,
                "secondaryColor": secondaryColor,
                "secondaryFontColor": secondaryFontColor,
                "primaryGradientStartColor": primaryGradStartColor,
                "primaryGradientEndColor": primaryGradEndColor
            },
            "showSocialMediaImages": true,
            "currentClientLogo": null,
            "clientLogo": null,
            "currentClientBanner": null,
            "clientBanner": null,
            "currentLoginBanner": null,
            "loginBanner": null
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'PUT',
                url: 'api/v2/admin/theme',
                headers: headers,
                body: data
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }

    /**
    * Command: `activateDeactivateModules`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Enable or disable the modules.
    * 
    * Usage:
    * onAdminPage.activateDeactivateModules('admin', 'pim', 'leave', 'time', 'recruitment', 'performance', 'maintenance', 'mobile', 'directory', 'claim', 'buzz', 'statusCode')
    * 
    * Parameters:
    * - `admin` (String): Can be true or false.
    * - `pim` (String): Can be true or false.
    * - `leave` (String): Can be true or false.
    * - `time` (String): Can be true or false.
    * - `recruitment` (String): Can be true or false.
    * - `performance` (String): Can be true or false.
    * - `maintenance` (String): Can be true or false.
    * - `mobile` (String): Can be true or false.
    * - `directory` (String): Can be true or false.
    * - `claim` (String): Can be true or false.
    * - `buzz` (String): Can be true or false.
    * 
    * Example:
    * onAdminPage.activateDeactivateModules()
    */
    activateDeactivateModules(admin = true, pim = true, leave = true, time = true,
        recruitment = true, performance = true, maintenance = true, mobile = true, directory = true, claim = true,
        buzz = true, statusCode = 200) {

        const data = {
            "admin": admin,
            "pim": pim,
            "leave": leave,
            "time": time,
            "recruitment": recruitment,
            "performance": performance,
            "maintenance": maintenance,
            "mobile": mobile,
            "directory": directory,
            "claim": claim,
            "buzz": buzz
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'PUT',
                url: 'api/v2/admin/modules',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }

    /**
    * Command: `changeLanguage`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Change the location, consequently the language of the website.
    * 
    * Usage:
    * onAdminPage.changeLanguage('language', 'dateFormat')
    * 
    * Parameters:
    * - `language` (String): Example for english (en_US).
    * - `dateFormat` (String): The default value is Y-d-m.
    * 
    * Example:
    * onAdminPage.changeLanguage()
    */
    changeLanguage(language = "en_US", dateFormat = "Y-d-m", leave = true, statusCode = 200) {

        const data = {
            "language": language,
            "dateFormat": dateFormat
        }
        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'PUT',
                url: 'api/v2/admin/localization',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }

}

export const onAdminPage = new AdminPage()