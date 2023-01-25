const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

const intacct = require('../../intacct/intacct');

describe('find_employee', () => {

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

  describe('when an employee exists', () => {

    it('returns an array with one element', async () => {

      // arrange
      bundle.inputData.id = 'EMP-001'

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_name').mockReturnValue(
        [{
          EMPLOYEEID: 'EMP-001'
        }]
      );

      // act
      const results = await appTester(
        App.searches['find_employee'].operation.perform,
        bundle
      );

      // assert
      expect(results).toHaveLength(1);
      expect(results[0].EMPLOYEEID).toBe(bundle.inputData.id);

    });

  });

  describe('when an employee does NOT exist', () => {

    it('returns a empty array', async () => {

      // arrange
      bundle.inputData.id = 'EMP-000'

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_name').mockReturnValue(
        []
      );

      // act
      const results = await appTester(
        App.searches['find_employee'].operation.perform,
        bundle
      );

      // assert
      expect(results).toHaveLength(0);

    });

  });

}); // describe
