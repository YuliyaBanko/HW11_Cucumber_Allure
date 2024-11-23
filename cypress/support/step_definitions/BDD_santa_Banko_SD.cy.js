import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 50;
let minAmount = 10;
let currency = "Евро";
let inviteLink;
let boxKey;

Given("user is on santa login page", function () {
  cy.visit("/login");
});

When("user logs in with valid credentials 1time", function () {
    cy.loginAsUser(users.userAutor);
});

Then("user is on dashboard page", function () {
  cy.contains("Создать коробку").should('be.visible');
});

Given("user presses on create box button", function () {
  cy.contains("Создать коробку").should('be.visible').click({ force: true });
});

Then("user fills in boxname, minamount, maxamount, currency", function () {
    cy.createBox(newBoxName, minAmount, maxAmount, currency);
    cy.get(generalElements.arrowRight).click({force: true });
  });

When("box is created with new ID", function () {
  cy.url().then((url) => {
    boxKey = url.split("/").pop();
    expect(boxKey).to.not.be.empty;
    cy.log("Box Key:", boxKey);
  });
});

Then("user gets ID after slash", function () {
  cy.log("Box Key:", boxKey); 
});

Given("user gets invitation link", function () {
    cy.get('.btn-main').click({ force: true });
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
        cy.log("Invite Link:", inviteLink); 
      });
    cy.clearCookies();
  });
  
  Then("user invites participants", function (dataTable) {
    dataTable.hashes().forEach((row) => {
      cy.addParticipant(row.inviteLink || inviteLink, row.userEmail, row.userPassword, row.wishes);
    });
  });
  

  Given("user logs in with valid credentials", function () {
    cy.loginAsUser(users.userAutor);
});

When("user is organizing raffle", function () {
    cy.organizeRaffle(newBoxName);
});

Then("user is on raffle page", function () {
    cy.get('.picture-notice__title').should('exist');
});

When("user sends a DELETE request to delete the box", function () {
    cy.request({
      method: 'DELETE',
      url: `https://santa-secret.ru/api/box/${boxKey}`,
      headers: {
      Cookie: `_ym_uid=1730881242899989110; _ym_d=1730881242; __upin=juHuYxBH6v1IsHazyTwRKw; ma_prevVisId_3485699018=f97658136a081d7771479e2d5461ee6e; ma_id=3020008461719246020134; adrcid=AhBYFfLl_52LtUyi_aWGllg; _ym_isad=2; fid=c62162d3-1035-4b57-8b08-5a7867fdc3ac; _ac_oid=ff26b1026bdbb5d18be8d352a14ce171%3A1731492100613; __ai_fp_uuid=b736292bfb083397%3A2; ma_vis_id_last_sync_3485699018=1731489750882; _buzz_fpc=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJhMDJlZGNmMjhjNTEyNmEwMzc3ZTRhNDM4OTllMzgxMCUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTMwLjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzMxNDg5NzQ5Nzk2JTdEJTJDJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyVGh1JTJDJTIwMTMlMjBOb3YlMjAyMDI1JTIwMDklM0AyMiUzQTMxJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlN0Q=; _buzz_aidata=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJqdUh1WXhCSDZ2MUlzSGF6eVR3Ukt3JTIyJTJDJTIyYnJvd3NlclZlcnNpb24lMjIlM0ElMjIxMzAuMCUyMiUyMiUyQyUyMnRzQ3JlYXRlZCUyMiUzQTE3MzE0ODk3NTExMDYlN0QlMkMlMjJwYXRoJTIyJTNBJTIyJTJGJTIyJTJDJTIyZG9tYWluJTIyJTNBJTIyLnNhbnRhLXNlY3JldC5ydSUyMiUyQyUyMmV4cGlyZXMlMjIlM0ElMjJUaHUlMkMlMjAxMyUyME5vdiUyMDIwMjUlMjAwOSUzQTIyJTNBMzElMjBHTVQlMjIlMkMlMjJTYW1lU2l0ZSUyMiUzQSUyMkxheCUyMiU3RA==; _buzz_mtsa=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJmOTc2NTgxMzZhMDgxZDc3NzE0NzllMmQ1NDYxZWU2ZSUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTMwLjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzMxNDg5NzUwODg1JTdEJTJDJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyVGh1JTJDJTIwMTMlMjBOb3YlMjAyMDI1JTIwMDklM0EyMiUzQTMxJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlN0Q=; acs_3=%7B%22hash%22%3A%22261894c87994c528f5fc093a35dcf7e6de8e3e95%22%2C%22nextSyncTime%22%3A1731576192518%2C%22syncLog%22%3A%7B%22224%22%3A1731489792518%2C%221228%22%3A1731489792518%2C%221230%22%3A1731489792518%7D%7D; adrdel=1731489792594; domain_sid=-3OKYcClreK8a-yi-zjsW%3A1731490093405; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY2NTA4MjYsImlhdCI6MTczMTQ5NTEwOSwiZXhwIjoxNzM0MDg3MTA5fQ.PXoVXmhzv90Tg2DlciR0jz2HxZNCUE2YKX9tH9Bpg_E`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  
  Then("user receives a 404 response when checking the box status", function () {
    cy.request({
      method: 'GET',
      url: `https://santa-secret.ru/api/box/${boxKey}`,
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });