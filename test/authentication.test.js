/* globals describe, it, expect */

const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);

// read the `.env` file into the environment, if available
zapier.tools.env.inject();

const IA = require("@intacct/intacct-sdk");

describe('getOnlineClient', () => {

  it('creates an OnlineClient instance', async () => {

    // arrange
    let bundle = {
      authData: {},
    };

    // act
    const newAuthData = await appTester(
      App.authentication.sessionConfig.perform,
      bundle
    );

    // assert
    expect(newAuthData.client).toBeInstanceOf(IA.OnlineClient);

  });

});

describe('test', () => {

  describe('when valid credentials are supplied', () => {

    // arrange
    let bundle = {
      authData: {
        company_id: process.env.INTACCT_COMPANY_ID,
        sender_id: process.env.INTACCT_SENDER_ID,
        sender_password: process.env.INTACCT_SENDER_PASSWORD,
        user_id: process.env.INTACCT_USER_ID,
        user_password: process.env.INTACCT_USER_PASSWORD,
      },
    };

    it('returns OK [200]', async () => {
      // act
      const response = await appTester(App.authentication.test, bundle);

      // assert
      expect(response.status).toBe(200);
    });

    it('returns RECORDNO 1', async () => {
      // act
      const response = await appTester(App.authentication.test, bundle);

      // assert
      expect(response.json.RECORDNO).toBe('1');
    });

  });

  describe('when invalid credentials are supplied', () => {

    it('returns Unauthorized [401]', async () => {

      // arrange
      let bundle = {
        authData: {
          company_id: 'dummy',
          sender_id: 'dummy',
          sender_password: 'dummy',
          user_id: 'dummy',
          user_password: 'dummy',
          },
      };
  
      // act
      const response = await appTester(App.authentication.test, bundle);

      // assert
      expect(response.status).toBe(401);

    });

  });

  // it('has auth details added to every request', async () => {
  //   const bundle = {
  //     authData: {
  //       sessionKey: 'secret',
  //     },
  //   };

  //   const response = await appTester(App.authentication.test, bundle);

  //   expect(response.status).toBe(200);
  //   expect(response.request.headers['X-API-Key']).toBe('secret');
  // });

});