const {
    config: authentication,
    befores = [],
    afters = [],
} = require('./authentication');

// creates
const createContact = require('./creates/contact_create.js');
const saveContact = require('./creates/contact_save.js');

const createEmployee = require('./creates/employee_create.js');
const saveEmployee = require('./creates/employee_save.js');
const setEmployeeStatus = require('./creates/employee_set_status.js');

// searches
const findContact = require('./searches/contact_find.js');
const findEmployee = require('./searches/employee_find.js');

// triggers
const getLocations = require("./triggers/get_locations");
const getDepartments = require("./triggers/get_departments");

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],
  triggers: {
    [getLocations.key]: getLocations,
    [getDepartments.key]: getDepartments
  },
  searches: {
    [findContact.key]: findContact,
    [findEmployee.key]: findEmployee
  },
  creates: {
    [createContact.key]: createContact,
    [saveContact.key]: saveContact,

    [createEmployee.key]: createEmployee,
    [saveEmployee.key]: saveEmployee,
    [setEmployeeStatus.key]: setEmployeeStatus
  },
  resources: {},
};