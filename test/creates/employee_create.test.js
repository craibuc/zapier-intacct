const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

const intacct = require('../../intacct/intacct');

describe('employee_create', () => {

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
    inputData: {
      employeeId: 'ABCDEF',
      contactName: 'Last, First',
      gender: 'male',
      ssn: '123456789',
      title: 'Title',
      employeeType: 'Contractor',
      birthDate: new Date().toISOString().substring(0,10),
      startDate: new Date().toISOString().substring(0,10),
      endDate: new Date().toISOString().substring(0,10),
      managerEmployeeId: 'EMP-001',
      departmentId: 'SB',
      locationId: 'L-1000',
      active: true,
    },
  };

  describe("when the employee doesn't exist", () => {

    it('creates an object', async () => {

      // arrange
      // mock create contact
      jest.spyOn(intacct.employees, 'create_employee').mockReturnValue(
        {
          RECORDNO: "1234", 
          EMPLOYEEID: bundle.inputData.employeeId,
        }
      )

      // mock fetch object
      jest.spyOn(intacct, 'get_objects_by_key').mockReturnValue(
        [{
          RECORDNO: "1234", 
          EMPLOYEEID: bundle.inputData.employeeId,
          CONTACT_NAME: bundle.inputData.contactName,
          BIRTHDATE: bundle.inputData.birthDate,
          SSN: bundle.inputData.ssn,
          GENDER: bundle.inputData.gender,
          TITLE: bundle.inputData.title,
          EMPLOYEETYPE: bundle.inputData.employeeType,
          STARTDATE: bundle.inputData.startDate,
          ENDDATE: bundle.inputData.endDate,
          LOCATIONNAME: bundle.inputData,
          LOCATIONID: bundle.inputData.locationId,
          DEPARTMENTID: bundle.inputData.departmentId,
          SUPERVISORID: bundle.inputData.managerEmployeeId,
          STATUS: 'active'
        }]
      );
      // act
      const results = await appTester(
        App.creates['employee_create'].operation.perform,
        bundle
      );

      // assert
      expect(results.RECORDNO).not.toBeNull();
      expect(results.EMPLOYEEID).toBe(bundle.inputData.employeeId);
      expect(results.CONTACT_NAME).toBe(bundle.inputData.contactName);
      expect(results.GENDER).toBe(bundle.inputData.gender);
      expect(results.SSN).toBe(bundle.inputData.ssn);
      expect(results.TITLE).toBe(bundle.inputData.title);
      expect(results.EMPLOYEETYPE).toBe(bundle.inputData.employeeType);
      expect(results.BIRTHDATE).toBe(bundle.inputData.birthDate);
      expect(results.STARTDATE).toBe(bundle.inputData.startDate);
      expect(results.ENDDATE).toBe(bundle.inputData.endDate);
      expect(results.SUPERVISORID).toBe(bundle.inputData.managerEmployeeId);
      expect(results.DEPARTMENTID).toBe(bundle.inputData.departmentId);
      expect(results.LOCATIONID).toBe(bundle.inputData.locationId);
      expect(results.STATUS).toBe('active');

    });

  });

  describe("when the employee exists", () => {

    test('throws an exception', async () => {

      // arrange
      // mock
      jest.spyOn(intacct.employees, 'create_employee').mockImplementation(
          () => {
            throw new Error('Bad Request');
          }
        )

      // act/assert
      await expect(appTester(
          App.creates['employee_create'].operation.perform,
          bundle
      ))
      .rejects
      .toThrow('Bad Request');

    });

  });

  describe.skip("when the contact does not exist", () => {

    it('throws an exception', async () => {

      // arrange
      const bundle = {
        inputData: {
          employeeId: 'ABCDEF',
          contactName: 'DOES NOT EXIST',
        },
      };

      // act
      const action = async () => {
        await appTester(
          App.creates['employee_create'].operation.perform,
          bundle
        );
      };
      

      // assert
      expect(action()).rejects.toThrow();

    });

  });

});
