const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);

const IA = require("@intacct/intacct-sdk");
// const intacct = require('../intacct/intacct');

describe('authentication', () => {

  // read the `.env` file into the environment, if available
  zapier.tools.env.inject();

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
          companyId: process.env.INTACCT_COMPANY_ID,
          senderId: process.env.INTACCT_SENDER_ID,
          senderPassword: process.env.INTACCT_SENDER_PASSWORD,
          userId: process.env.INTACCT_USER_ID,
          userPassword: process.env.INTACCT_USER_PASSWORD,
        },
      };
  
      it('returns OK [200]', async () => {
        // act
        const response = await appTester(
          App.authentication.test, 
          bundle
        );
  
        // assert
        expect(response.status).toBe(200);

      });
  
      it('returns the company_id', async () => {
        // act
        const response = await appTester(
          App.authentication.test, 
          bundle
        );
  
        // assert
        expect(response.json.company_id).toBe(bundle.authData.company_id);

      });
  
    });
  
    describe('when invalid credentials are supplied', () => {
  
      it('returns Unauthorized [401]', async () => {
  
        // arrange
        let bundle = {
          authData: {
            companyId: 'dummy',
            senderId: 'dummy',
            senderPassword: 'dummy',
            userId: 'dummy',
            userPassword: 'dummy',
            },
        };
    
        // act
        const response = await appTester(
          App.authentication.test, 
          bundle
        );
  
        // assert
        expect(response.status).toBe(401);
  
      });
  
    });
    
  });

});
