Cypress.Commands.add('filMandatoryFieldsAndSumit', function (){
    cy.get('#firstName').type('Luciana')
    cy.get('#lastName').type('Silveira')
    cy.get('#email').type('luciana@gmail.com')
    cy.get('#open-text-area').type('TESTE')
    cy.get('button[type="submit"]').click()
})