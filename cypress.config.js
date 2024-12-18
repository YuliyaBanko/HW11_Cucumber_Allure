const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://santa-secret.ru",
    testIsolation: false,
    
    setupNodeEvents(on, config) {
      on("file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      preprocessor.addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      return config; 
    }, 
    env: {
      allureReuseAfterSpec: true, 
    },
    specPattern: "**/*.feature", 
  },
});

