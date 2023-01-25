const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

const intacct = require('../../intacct/intacct');

describe('contact_create', () => {

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
      lastName: 'Last',
      firstName: 'First',
      prefix: 'Ms.',
      contactName: 'First Last',
      printAs: 'Last, First',
      companyName: 'Company Name',
      active: true
    },
  };

  describe("when the contact doesn't exist", () => {

    it('creates the employee and returns its representation', async () => {

      // arrange
      // mock create contact
      jest.spyOn(intacct.contacts, 'create_contact').mockReturnValue(
        {
          RECORDNO: "1234", 
          CONTACTNAME: bundle.inputData.contactName,
        }
      )

      // mock fetch contact
      jest.spyOn(intacct, 'get_objects_by_key').mockReturnValue(
        [{
          RECORDNO: "1234", 
          COMPANYNAME: bundle.inputData.companyName,
          CONTACTNAME: bundle.inputData.contactName,
          FIRSTNAME: bundle.inputData.firstName,
          LASTNAME: bundle.inputData.lastName,
          PREFIX: bundle.inputData.prefix,
          PRINTAS: bundle.inputData.printAs,
          STATUS: 'active'
        }]
      );

      // act
      const results = await appTester(
        App.creates['contact_create'].operation.perform,
        bundle
      );
      
      // assert
      expect(results.RECORDNO).not.toBeNull();
      expect(results.CONTACTNAME).toBe(bundle.inputData.contactName);
      expect(results.PRINTAS).toBe(bundle.inputData.printAs);
      expect(results.LASTNAME).toBe(bundle.inputData.lastName);
      expect(results.FIRSTNAME).toBe(bundle.inputData.firstName);
      expect(results.PREFIX).toBe(bundle.inputData.prefix);
      expect(results.COMPANYNAME).toBe(bundle.inputData.companyName);
      expect(results.STATUS).toBe('active');

    });

  });

  describe("when the contact exists", () => {

    test('throws an exception', async () =>  {

    // arrange
    // mock
    jest.spyOn(intacct.contacts, 'create_contact').mockImplementation(
        () => {
          throw new Error('Bad Request');
        }
      )

      // act/assert
      await expect(appTester(
          App.creates['contact_create'].operation.perform,
          bundle
      ))
      .rejects
      .toThrow('Bad Request');

    });

  });

});
