module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    env: {
      users: {
        standard: {
          username: "standard_user",
          password: "secret_sauce"
        },
        lockedOut: {
          username: "locked_out_user",
          password: "secret_sauce"
        }
      }
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
