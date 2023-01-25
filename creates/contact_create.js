/**
 * Creates a new CONTACT record.
 * 
 * @param {*} z 
 * @param {*} bundle 
 * @returns {object} contact
 */
const createContact = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");
  const intacct = require("../intacct/intacct");

    try {

      const client = intacct.get_client(bundle.authData)
      
      // successful ContactCreate returns RECORDNO and CONTACTNAME
      const keys = await intacct.contacts.create_contact(client, bundle.inputData)

      // match the values in the outputFields
      const fields = ['RECORDNO','CONTACTNAME','PRINTAS','LASTNAME','FIRSTNAME','PREFIX','COMPANYNAME','STATUS']

      // find the CONTACT object for the given RECORDNO
      const contact = await intacct.get_objects_by_key(client, 'CONTACT', [keys.RECORDNO], fields)

      // return the array's sole element
      return contact ? contact[0] : {}

    } 
    catch (ex) {
      z.console.debug(ex.message)

      if (ex instanceof IA.Exceptions.ResponseException) {
        throw new z.errors.Error(ex.message, 'Bad Request', 400)
      } 
      else {
        throw new z.errors.Error(ex.message, 'Internal Server Error', 500)
      }
  
    }
  
  };
  
  module.exports = {
    key: 'contact_create',
    noun: 'Contact',
    display: {
      label: 'Create Contact',
      description: 'Create an Intacct contact.',
      hidden: false,
      important: true,
    },
    operation: {
      inputFields: [
        {
          key: 'contactName',
          label:'Contact Name', 
          required: true,
          type: 'string',
          helpText: "The contact's name.  Must be unique in the customer's Intacct implementation."
        },
        {
            key: 'printAs',
            label:'Print As', 
            required: true,
            type: 'string',
            helpText: "The contact's printable name."
        },
        {
          key: 'firstName',
          label:'First Name', 
          required: false,
          type: 'string',
          helpText: "The contact's first name."
        },
        {
          key: 'lastName', 
          label:'Last Name', 
          required: false,
          type: 'string',
          helpText: "The contact's last name."
        },
        {
            key: 'prefix', 
            label:'Prefix', 
            required: false,
            type: 'string',
            helpText: "The contact's prefix (e.g. Mr., Ms.)."
        },
        {
            key: 'companyName', 
            label:'Company Name', 
            required: false,
            type: 'string',
            helpText: "The name of the company."
        },
        {
          key: 'active', 
          label:'Active', 
          required: false,
          type: 'boolean',
          default: 'true',
          helpText: "The contact's status."
        }
      ],
      perform: createContact,
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
      ]
    }
  };
  