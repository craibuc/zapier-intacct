const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

const intacct = require('../../intacct/intacct');


describe('employee_set_status', () => {

  // environment variables
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

  describe("sets active to false", () => {

    it('creates an object', async () => {

      // arrange
      const bundle = {
        inputData: {
          employeeId: 'EMP-018',
          active: false,
        },
      };

      // mock create contact
      jest.spyOn(intacct.employees, 'update_employee').mockReturnValue(
        {
          RECORDNO: '11111',
          EMPLOYEEID: bundle.inputData.employeeId
        }
      )

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_key').mockReturnValue(
        [{
          RECORDNO: "11111", 
          EMPLOYEEID: bundle.inputData.employeeId,
          STATUS: 'active'
        }]
      );

      // act
      const results = await appTester(
        App.creates['employee_set_status'].operation.perform,
        bundle
      );

      // assert
      expect(results.RECORDNO).not.toBeNull();
      expect(results.EMPLOYEEID).toBe(bundle.inputData.employeeId);
      expect(results.STATUS).toBe('active');

    });

  });

  describe("sets active to true", () => {

    it('throws an exception', async () => {

      // arrange
      const bundle = {
        inputData: {
          employeeId: 'EMP-018',
          active: true
        },
      };

      // mock create contact
      jest.spyOn(intacct.employees, 'update_employee').mockReturnValue(
        {
          RECORDNO: '11111',
          EMPLOYEEID: bundle.inputData.employeeId
        }
      )

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_key').mockReturnValue(
        [{
          RECORDNO: "11111", 
          EMPLOYEEID: bundle.inputData.employeeId,
          STATUS: 'inactive'
        }]
      );

      // act
      const results = await appTester(
        App.creates['employee_set_status'].operation.perform,
        bundle
      );

      // assert (API only returns two fields upon success)
      expect(results.RECORDNO).not.toBeNull();
      expect(results.EMPLOYEEID).toBe(bundle.inputData.employeeId);
      expect(results.STATUS).toBe('inactive');

    });

  });

});
