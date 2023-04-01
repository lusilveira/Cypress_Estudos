/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.visit('src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('prenche os campos obrigatorios e envia o formulario', function () {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Luciana')
        cy.get('#lastName').type('Silveira')
        cy.get('#email').type('luciana@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um e-mail de formatação', function () {
        cy.get('#firstName').type('Luciana')
        cy.get('#lastName').type('Silveira')
        cy.get('#email').type('luciana@gmail,com')
        cy.get('#open-text-area').type('TESTE')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone')
            .type('awefgthhhhhh')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Luciana')
        cy.get('#lastName').type('Silveira')
        cy.get('#email').type('luciana@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('TESTE')
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Luciana')
            .should('have.value', 'Luciana')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Silveira')
            .should('have.value', 'Silveira')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('luciana@gmail.com')
            .should('have.value', 'luciana@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function () {
        cy.filMandatoryFieldsAndSumit()
        
        cy.get('.success').should('be.visible')
    })

    
})


