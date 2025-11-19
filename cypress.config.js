const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add a task to skip tests when app is not available
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
    supportFile: false,
    specPattern: 'cypress/integration/**/*.spec.js',
  },
  video: false,
  screenshotOnRunFailure: false,
});