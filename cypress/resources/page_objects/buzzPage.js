/// <reference types="cypress" />

export class BuzzPage {

    /**
    * Command: `addPost`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Publish a given message on buzz feed.
    * 
    * Usage:
    * onBuzzPage.addPost('message')
    * 
    * Parameters:
    * - `text` (String): Message to be published.
    * - `type` (optional): Type of content.
    * 
    * Example:
    * onBuzzPage.addPost('Hi everyone!')
    */
    addPost(text, type = "text", statusCode = 200) {
        const data = {
            "type": type,
            "text": text
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'POST',
                url: 'web/index.php/api/v2/buzz/posts',
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
                if (statusCode == 200) {
                    Cypress.env('postId', response.body.data.post.id)
                }
            })
        })
    }

    /**
    * Command: `deleteAPost`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Delete a post.
    * 
    * Usage:
    * onClaimPage.deleteAPost()
    * 
    * Parameters:
    * None
    * 
    * Example:
    * onClaimPage.deleteAPost()
    */
    deleteAPost(statusCode = 200) {
        const id = Cypress.env('postId')

        const data = {
            "id": id
        }

        cy.createDictionaryHeader().then((headers) => {
            cy.request({
                method: 'DELETE',
                url: 'web/index.php/api/v2/buzz/shares/' + id,
                headers: headers,
                body: data,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(statusCode)
            })
        })
    }
}

export const onBuzzPage = new BuzzPage()