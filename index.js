const {
    config: authentication,
    befores = [],
    afters = [],
} = require('./authentication');
  
const findEmployee = require('./searches/find_employee.js');
const createEmployee = require('./creates/create_employee.js');

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {},
  searches: {
    [findEmployee.key]: findEmployee
  },
  creates: {
    [createEmployee.key]: createEmployee
  },
  resources: {},

};