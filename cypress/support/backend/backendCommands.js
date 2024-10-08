import 'cypress-file-upload'

/**
 * Command: `loginWithAuthentication`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Login into application as Admin.
 * 
 * Usage:
 * cy.loginWithAuthentication()
 * 
 * Parameters:
 * None
 * 
 * Example:
 * cy.loginWithAuthentication(8)
 */
Cypress.Commands.add('loginWithAuthentication', (statusCode = 200) => {
    cy.request({
        method: 'GET',
        url: 'auth/login',
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
                url: 'auth/validate',
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
 * Command: `createDictionaryHeader`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Create a dictionary Header
 * 
 * Usage:
 * cy.createDictionaryHeader()
 * 
 * Parameters:
 * `none`
 * 
 * Example:
 * cy.createDictionaryHeader()
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