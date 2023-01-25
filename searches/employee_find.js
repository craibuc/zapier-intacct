/**
 * 
 * @param {*} z 
 * @param {*} bundle 
 * @returns 
 */
const findEmployee = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");
  const intacct = require("../intacct/intacct");

  try {

    const client = intacct.get_client(bundle.authData)

    // match the values in the outputFields
    const fields = [
      'RECORDNO','EMPLOYEEID','CONTACT_NAME','BIRTHDATE','SSN','GENDER',
      'TITLE','EMPLOYEETYPE','STARTDATE','ENDDATE',
      'LOCATIONNAME','LOCATIONID','DEPARTMENTTITLE','DEPARTMENTID','SUPERVISORNAME','SUPERVISORID',
      'STATUS'
    ]

    // find the EMPLOYEE object for the given EMPLOYEEID
    const employees = await intacct.get_objects_by_name(client, 'EMPLOYEE', [bundle.inputData.id], fields)
    
    // return the array
    return employees ? employees : []

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
  key: 'find_employee',
  noun: 'Employee',
  display: {
    label: 'Find Employee',
    description: 'Finds an employee by `EMPLOYEEID`.',
    hidden: false,
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'ID',
        type: 'string',
        helpText: 'The customer-specified ID of the employee.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: findEmployee,
    sample: {
      EMPLOYEEID: 'ABCDEF',
      CONTACT_NAME: 'First Last',
      BIRTHDATE: '2023-01-20',
      SSN: '123456789',
      GENDER: 'male',
      TITLE: 'Title',
      EMPLOYEETYPE: 'Contractor',
      STARTDATE: '2023-01-20',
      ENDDATE: '2023-01-20',
      LOCATIONNAME: 'City, ST',
      DEPARTMENTTITLE: 'School Bus',
      SUPERVISORNAME: 'Bill Lumbergh',
      STATUS: 'active',
    },
    outputFields: [
      {
        key: 'EMPLOYEEID',
        label: 'Employee ID',
        type: 'string',
      },
      {
        key: 'CONTACT_NAME',
        label: 'Contact Name',
        type: 'string',
      },
      {
        key: 'BIRTHDATE',
        label: 'Birth Date',
        type: 'datetime',
      },
      {
        key: 'SSN',
        label: 'SSN',
        type: 'string',
      },
      {
        key: 'GENDER',
        label: 'Gender',
        type: 'string',
      },
      {
        key: 'TITLE',
        label: 'Gender',
        type: 'string',
      },
      {
        key: 'EMPLOYEETYPE',
        label: 'Gender',
        type: 'string',
      },
      {
        key: 'STARTDATE',
        label: 'Gender',
        type: 'string',
      },
      {
        key: 'STARTDATE',
        label: 'Start Date',
        type: 'datetime',
      },
      {
        key: 'ENDDATE',
        label: 'End Date',
        type: 'datetime',
      },
      {
        key: 'LOCATIONNAME',
        label: 'Location',
        type: 'string',
      },
      {
        key: 'DEPARTMENTTITLE',
        label: 'Department',
        type: 'string',
      },
      {
        key: 'SUPERVISORNAME',
        label: 'Supervisor',
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
