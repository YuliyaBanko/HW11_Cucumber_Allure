const users = require("./cypress/fixtures/users.json");
const boxPage = require("./cypress/fixtures/pages/boxPage.json");
const generalElements = require("./cypress/fixtures/pages/general.json");
const dashboardPage = require("./cypress/fixtures/pages/dashboardPage.json");
const invitePage = require("./cypress/fixtures/pages/invitePage.json");
const inviteeBoxPage = require("./cypress/fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("./cypress/fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let minAmount = 10;
  let currency = "Евро";
  let inviteLink;
  let boxKey;

  it("user logins and creates a box", () => {
    cy.loginAsUser(users.userAutor);  // Используем кастомную команду логина
    cy.contains("Создать коробку").should('be.visible').click({ force: true });
    cy.createBox(newBoxName, minAmount, maxAmount, currency); // Используем кастомную команду для создания коробки
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);

    cy.url().then((url) => {
      boxKey = url.split('/').pop();
      cy.log("Box Key:", boxKey);
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
    cy.loginAsUser(users.userAutor);  // Используем новую кастомную команду для логина
    cy.organizeRaffle(newBoxName); // Используем кастомную команду для проведения жеребьевки
    cy.get('.picture-notice__title').should('exist');
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: `https://santa-secret.ru/api/box/${boxKey}`,
      headers: {
        Cookie: `_ym_uid=1730881242899989110; _ym_d=1730881242; __upin=juHuYxBH6v1IsHazyTwRKw; ma_prevVisId_3485699018=f97658136a081d7771479e2d5461ee6e; ma_id=3020008461719246020134; adrcid=AhBYFfLl_52LtUyi_aWGllg; _ym_isad=2; fid=c62162d3-1035-4b57-8b08-5a7867fdc3ac; _ac_oid=ff26b1026bdbb5d18be8d352a14ce171%3A1731492100613; __ai_fp_uuid=b736292bfb083397%3A2; ma_vis_id_last_sync_3485699018=1731489750882; _buzz_fpc=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJhMDJlZGNmMjhjNTEyNmEwMzc3ZTRhNDM4OTllMzgxMCUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTMwLjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzMxNDg5NzQ5Nzk2JTdEJTJDJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyVGh1JTJDJTIwMTMlMjBOb3YlMjAyMDI1JTIwMDklM0AyMiUzQTMxJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlN0Q=; _buzz_aidata=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJqdUh1WXhCSDZ2MUlzSGF6eVR3Ukt3JTIyJTJDJTIyYnJvd3NlclZlcnNpb24lMjIlM0ElMjIxMzAuMCUyMiUyMiUyQyUyMnRzQ3JlYXRlZCUyMiUzQTE3MzE0ODk3NTExMDYlN0QlMkMlMjJwYXRoJTIyJTNBJTIyJTJGJTIyJTJDJTIyZG9tYWluJTIyJTNBJTIyLnNhbnRhLXNlY3JldC5ydSUyMiUyQyUyMmV4cGlyZXMlMjIlM0ElMjJUaHUlMkMlMjAxMyUyME5vdiUyMDIwMjUlMjAwOSUzQTIyJTNBMzElMjBHTVQlMjIlMkMlMjJTYW1lU2l0ZSUyMiUzQSUyMkxheCUyMiU3RA==; _buzz_mtsa=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJmOTc2NTgxMzZhMDgxZDc3NzE0NzllMmQ1NDYxZWU2ZSUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTMwLjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzMxNDg5NzUwODg1JTdEJTJDJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyVGh1JTJDJTIwMTMlMjBOb3YlMjAyMDI1JTIwMDklM0EyMiUzQTMxJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlN0Q=; acs_3=%7B%22hash%22%3A%22261894c87994c528f5fc093a35dcf7e6de8e3e95%22%2C%22nextSyncTime%22%3A1731576192518%2C%22syncLog%22%3A%7B%22224%22%3A1731489792518%2C%221228%22%3A1731489792518%2C%221230%22%3A1731489792518%7D%7D; adrdel=1731489792594; domain_sid=-3OKYcClreK8a-yi-zjsW%3A1731490093405; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY2NTA4MjYsImlhdCI6MTczMTQ5NTEwOSwiZXhwIjoxNzM0MDg3MTA5fQ.PXoVXmhzv90Tg2DlciR0jz2HxZNCUE2YKX9tH9Bpg_E`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  
    cy.request({ //Добавляем ассершен, чтобы убедиться, что удалили нужную коробку
      method: 'GET',
      url: `https://santa-secret.ru/api/box/${boxKey}`,
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

