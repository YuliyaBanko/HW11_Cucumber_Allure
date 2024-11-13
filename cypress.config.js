const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://santa-secret.ru",
    testIsolation: false,
    setupNodeEvents(on, config) {
    },
  },
});
