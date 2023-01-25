/**
 * 
 * @param {*} z 
 * @param {*} bundle 
 * @returns {object} employee
 */
const createEmployee = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");
  const intacct = require('../intacct/intacct');

  try {

    const client = intacct.get_client(bundle.authData)
    
    // remove hypens from SSN
    bundle.inputData.ssn = bundle.inputData.ssn ? bundle.inputData.ssn.replace(/-/g,'') : null
    // lower case gender
    bundle.inputData.gender = bundle.inputData.gender ? bundle.inputData.gender.toLowerCase() : null

    // successful EmployeeCreate returns RECORDNO and CONTACTNAME
    const keys = await intacct.employees.create_employee(client, bundle.inputData)

    // match the values in the outputFields
    const fields = [
      'RECORDNO','EMPLOYEEID','CONTACT_NAME','BIRTHDATE','SSN','GENDER',
      'TITLE','EMPLOYEETYPE','STARTDATE','ENDDATE',
      'LOCATIONNAME','LOCATIONID','DEPARTMENTTITLE','DEPARTMENTID','SUPERVISORNAME','SUPERVISORID',
      'STATUS'
    ]
      // find the CONTACT object for the given RECORDNO
      const employee = await intacct.get_objects_by_key(client, 'EMPLOYEE', [keys.RECORDNO], fields)

      // return the array's sole element
      return employee ? employee[0] : {}

  } 
  catch (ex) {
    z.console.error(ex.message)
    
    if (ex instanceof IA.Exceptions.ResponseException) {
      throw new z.errors.Error(ex.message, 'Bad Request', 400)
    } 
    else {
      throw new z.errors.Error(ex.message, 'Internal Server Error', 500)
    }

  }

};

module.exports = {
  key: 'employee_create',
  noun: 'Employee',
  display: {
    label: 'Create Employee',
    description: 'Create an Intacct employee.',
    hidden: false,
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'employeeId',
        label:'Employee ID', 
        required: true,
        type: 'string',
        helpText: "The employee's customer-assigned identifier."
      },
      {
        key: 'contactName',
        label:'Contact Name', 
        required: true,
        type: 'string',
        helpText: "The name of thte contact assigned to the employee."
      },
      {
        key: 'gender', 
        label:'Gender', 
        required: false,
        choices: { male: 'Male', female: 'Female' },
        type: 'string',
        helpText: "The employee's gender."
      },
      {
        key: 'birthDate', 
        label:'Birth Date', 
        required: false,
        type: 'datetime',
        helpText: "The employee's birth date."
      },
      {
        key: 'ssn', 
        label:'SSN', 
        required: false,
        type: 'string',
        helpText: "The employee's Social-Security number."
      },
      {
        key: 'title', 
        label:'Title', 
        required: false,
        type: 'string',
        helpText: "The employee's title."
      },
      {
        key: 'employeeType', 
        label:'Employee Type', 
        required: false,
        type: 'string',
        choices: { Contractor: 'Contractor', 'Full Time': 'Full Time', 'Part Time': 'Part Time' },
        helpText: "The employee's type."
      },
      {
        key: 'startDate', 
        label:'Start Date', 
        required: false,
        type: 'datetime',
        helpText: "The employee's starting date."
      },
      {
        key: 'endDate', 
        label:'End Date', 
        required: false,
        type: 'datetime',
        helpText: "The employee's ending date."
      },
      {
        key: 'managerEmployeeId', 
        label:'Manager', 
        required: false,
        type: 'string',
        helpText: "The employee's manager."
      },
      {
        key: 'departmentId', 
        label:'Department', 
        required: false,
        type: 'string',
        dynamic: 'get_departments.id.name',
        helpText: "The employee's department."
      },
      {
        key: 'locationId', 
        label:'Location', 
        required: false,
        type: 'string',
        dynamic: 'get_locations.id.name',
        helpText: "The employee's location."
      },
      {
        key: 'active', 
        label:'Active', 
        required: false,
        type: 'boolean',
        default: 'true',
        helpText: "The employee's status."
      }
    ],
    perform: createEmployee,
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
  }
};
