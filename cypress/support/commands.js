// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");
import inviteeBoxPage from "../fixtures/pages/inviteeBoxPage.json";
import inviteeDashboardPage from "../fixtures/pages/inviteeDashboardPage.json";
import boxPage from '../fixtures/pages/boxPage.json';



Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).type(userName);
  cy.get(loginPage.passwordField).type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});

Cypress.Commands.add("addParticipant", (inviteLink, email, password, wishes) => {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click();
  cy.login(email, password); 
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});

Cypress.Commands.add('organizeRaffle', (boxName) => {
  cy.contains('Коробки').click({ force: true });
  cy.contains(boxName).click();
  cy.contains('Перейти к жеребьевке').click({ force: true });
  cy.contains('Провести жеребьевку').click({ force: true });
  cy.contains('Да, провести жеребьевку').click({ force: true });
  cy.get('.picture-notice__title').should('exist');
});

Cypress.Commands.add('loginAsUser', (user) => {
  cy.visit("/login"); 
  cy.login(user.email, user.password);
});

Cypress.Commands.add('createBox', (boxName, minAmount, maxAmount, currency) => {
  cy.get(boxPage.boxNameField).type(boxName);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).click({ force: true });
  cy.get(boxPage.minAmount).type(minAmount);
  cy.get(boxPage.maxAmount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
});
