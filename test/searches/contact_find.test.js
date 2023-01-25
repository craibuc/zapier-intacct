const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

const intacct = require('../../intacct/intacct');

describe('find_contact', () => {

  // read the `.env` file into the environment, if available
  zapier.tools.env.inject();

  const bundle = {
    authData: {
      companyId: process.env.INTACCT_COMPANY_ID,
      senderId: process.env.INTACCT_SENDER_ID,
      senderPassword: process.env.INTACCT_SENDER_PASSWORD,
      userId: process.env.INTACCT_USER_ID,
      userPassword: process.env.INTACCT_USER_PASSWORD,
    },
    inputData: {},
  };

  describe('when a contact exists', () => {

    it('returns an array with one element', async () => {

      // arrange
      bundle.inputData.name = 'First Last'

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_name').mockReturnValue(
        [{
          CONTACTNAME: 'First Last'
        }]
      );

      // act
      const results = await appTester(
        App.searches['find_contact'].operation.perform,
        bundle
      );

      // assert
      expect(results).toHaveLength(1);
      expect(results[0].CONTACTNAME).toBe(bundle.inputData.name);

    });

  });

  describe('when an contact does NOT exist', () => {

    it('returns a empty array', async () => {

      // arrange
      bundle.inputData.id = 'EMP-000'

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_name').mockReturnValue(
        []
      );

      // act
      const results = await appTester(
        App.searches['find_contact'].operation.perform,
        bundle
      );

      // assert
      expect(results).toHaveLength(0);

    });

  });

}); // describe
