/**
 * 
 * @param {*} z 
 * @param {*} bundle 
 * @returns 
 */
const setEmployeeStatus = async (z, bundle) => {

    const IA = require("@intacct/intacct-sdk");
    const intacct = require('../intacct/intacct');

    try {
  
      const client = intacct.get_client(bundle.authData)
  
      const keys = await intacct.employees.update_employee(client, bundle.inputData)

      // find the EMPLOYEE object for the given RECORDNO
      const employee = await intacct.get_objects_by_key(client, 'EMPLOYEE', [keys.RECORDNO], ['RECORDNO','EMPLOYEEID','STATUS'])

      // return the array's sole element
      return employee ? employee[0] : {}
  
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
    key: 'employee_set_status',
    noun: 'Employee',
    display: {
      label: 'Set Employee Status',
      description: "Toggle the employee's status between active and inactive.",
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
          key: 'active', 
          label:'Active', 
          required: true,
          type: 'boolean',
          default: 'true',
          helpText: "The employee's status."
        }
      ],
      perform: setEmployeeStatus,
      sample: {
        EMPLOYEEID: 'EMP-001',
        STATUS: 'active',
      },
      outputFields: [
        {
          key: 'EMPLOYEEID',
          label: 'Employee ID',
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
  