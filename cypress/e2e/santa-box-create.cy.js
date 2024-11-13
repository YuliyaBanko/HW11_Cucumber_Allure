const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let minAmount = 10;
  let currency = "Евро";
  let inviteLink;

  it("user logins and creates a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").should('be.visible').click({ force: true });
    cy.get(boxPage.boxNameField).type(newBoxName);
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
   
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });

  it("adds participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("approve as user1", () => {
    cy.addParticipant(inviteLink, users.user1.email, users.user1.password, wishes);
  });

  it("approve as user2", () => {
    cy.addParticipant(inviteLink, users.user2.email, users.user2.password, wishes);
  });

  it("approve as user3", () => {
    cy.addParticipant(inviteLink, users.user3.email, users.user3.password, wishes);
  });
it("organizing raffle", () => {
  cy.visit("/login");
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.contains('Коробки').click({ force: true });
  cy.contains(newBoxName).click();
  cy.contains('Перейти к жеребьевке').click({ force: true });
  cy.contains('Провести жеребьевку').click({ force: true });
  cy.contains('Да, провести жеребьевку').click({ force: true });
  cy.get('.picture-notice__title').should('exist');
});
  after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
    ).click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type("Удалить коробку");
    cy.get('.layout-row-end > .btn-service').click();
  });
});
