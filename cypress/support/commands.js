import 'cypress-file-upload'

/**
 * Command: `getRandomString`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Generate a random string with the specified length.
 * 
 * Usage:
 * cy.getRandomString(length)
 * 
 * Parameters:
 * - `length` (String): The username of the user.
 * 
 * Example:
 * cy.getRandomString(8)
 */
Cypress.Commands.add('loginWithAuthentication', (statusCode = 200) => {
    cy.request({
        method: 'GET',
        url: 'web/index.php/auth/login',
        followRedirect: false,
    }).then((response) => {
        expect(response.status).to.eq(statusCode)
        if (statusCode == 200) {
            const tokenMatch = response.body.match(/:token="([^"]+)"/)
            const csrfToken = tokenMatch[1].replace(/&quot;/g, '')
            console.log('Token:', csrfToken)

            const setCookie = response.headers['set-cookie']
            const cookieString = setCookie[0]

            const data = {
                "_token": csrfToken,
                "username": "Admin",
                "password": "admin123"
            }
            const headers = {
                "cookie": cookieString,
                "Content-Type": "application/x-www-form-urlencoded",
                "connection": "keep-alive"
            }

            cy.request({
                method: 'POST',
                url: 'web/index.php/auth/validate',
                headers: headers,
                followRedirect: false,
                body: data
            }).then((response) => {
                expect(response.status).to.eq(302)
                const postSetCookie = response.headers['set-cookie']
                const cookie = postSetCookie[0]
                console.log('Cookie:', cookie)
                Cypress.env('cookie', cookie)
            })
        }
    })
})

/**
 * Command: `loginAsAdmin`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Login into the website as admin and store cookies and localstorage in cypress/fixtures.
 * There is no input in this command. Orange HRM is a demo website, and a single
 * username and password exists in the application.
 * 
 * Usage:
 * cy.loginAsAdmin()
 * 
 * Parameters:
 * - `none`
 * 
 * Example:
 * cy.loginAsAdmin()
 */
Cypress.Commands.add('createDictionaryHeader', (contentType = "application/json") => {
    const cookie = Cypress.env('cookie')

    const headers = {
        "cookie": cookie,
        "Content-Type": contentType,
        "connection": "keep-alive"
    }
    return headers
})