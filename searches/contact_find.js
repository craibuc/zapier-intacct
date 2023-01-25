/**
 * 
 * @param {*} z 
 * @param {*} bundle 
 * @returns 
 */
const findContact = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");
  const intacct = require("../intacct/intacct");

  try {

    const client = intacct.get_client(bundle.authData)

    // match the values in the outputFields
    const fields = ['RECORDNO','CONTACTNAME','PRINTAS','LASTNAME','FIRSTNAME','PREFIX','COMPANYNAME','STATUS']

    // find the CONTACT object for the given CONTACTNAME
    const contacts = await intacct.get_objects_by_name(client, 'CONTACT', [bundle.inputData.name], fields)
    
    // return the array
    return contacts ? contacts : []

  } 
  catch (ex) {
    z.console.log(ex.message)

    if (ex instanceof IA.Exceptions.ResponseException) {
      throw new z.errors.Error(ex.message, 'Bad Request', 400)
    } 
    else {
      throw new z.errors.Error(ex.message, 'Internal Server Error', 500)
    }

  }

};

module.exports = {
  key: 'find_contact',
  noun: 'Contact',
  display: {
    label: 'Find Contact',
    description: 'Finds a contact by `CONTACTNAME`.',
    hidden: false,
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        helpText: 'The customer-specified Name of the contact.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: findContact,
    sample: {
      CONTACTNAME: 'First Last',
      PRINTAS: 'Last, First',
      FIRSTNAME: 'First',
      LASTNAME: 'Last',
      PREFIX: 'Mr.',
      COMPANYNAME: 'Acme, Inc.',
      STATUS: 'active',
    },
    outputFields: [
      {
        key: 'CONTACTNAME',
        label: 'Contact Name',
        type: 'string',
      },
      {
        key: 'PRINTAS',
        label: 'Print As',
        type: 'string',
      },
      {
        key: 'FIRSTNAME',
        label: 'First Name',
        type: 'string',
      },
      {
        key: 'LASTNAME',
        label: 'Last Name',
        type: 'string',
      },
      {
        key: 'PREFIX',
        label: 'Prefix',
        type: 'string',
      },
      {
        key: 'COMPANYNAME',
        label: 'Company Name',
        type: 'string',
      },
      {
        key: 'STATUS',
        label: 'Status',
        type: 'string',
      },
    ],
  },
};
