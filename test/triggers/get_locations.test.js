const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('get_locations', () => {

  // read the `.env` file into the environment, if available
  zapier.tools.env.inject();

  it('returns an array of LOCATION records', async () => {

    // arrange
    const bundle = {
      authData: {
        companyId: process.env.INTACCT_COMPANY_ID,
        senderId: process.env.INTACCT_SENDER_ID,
        senderPassword: process.env.INTACCT_SENDER_PASSWORD,
        userId: process.env.INTACCT_USER_ID,
        userPassword: process.env.INTACCT_USER_PASSWORD,
      },   
      inputData: {} 
    };

    // act
    const results = await appTester(
      App.triggers.get_locations.operation.perform, 
      bundle
    );
    
    // assert
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    expect(results[0].id).toBeDefined();
    expect(results[0].name).toBeDefined();

  });

});
