const findEmployee = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");

  try {

    keys=[]
    var key = parseInt(bundle.inputData.id.match(/^([0-9]+)$/), 10)
    if (key){ keys.push(key) }
    
    names=[]
    let name = bundle.inputData.id.match(/EMPLOYEEID:(?<name>.+)/);
    if (name){ names.push(name[1]) }

    // bundle.inputData.id.forEach(function (e) {

    //   let key = parseInt(e.match(/^([0-9]+)$/), 10)
    //   // key ? console.log(`key: ${key}`) : null;
    //   // let name = e.match(/EMPLOYEEID:(?<name>.+)/);
    //   // name ? console.log(`name: ${name[1]}`) : null;

    //   if (key){ keys.push(key) }
    //   // if (name){ data.names.push(name[1]) }
  
    // });

    data = []

    const bootstrap = require("../intacct/bootstrap");
    const client = bootstrap.client(bundle);

    if (keys.length) {
      console.log(`keys: ${keys}`)

      const read = new IA.Functions.Common.Read();
      read.objectName = "EMPLOYEE"
      read.fields = ['RECORDNO','EMPLOYEEID','CONTACT_NAME','STATUS']
      read.keys = keys
  
      const readResponse = await client.execute(read);
      data = [].concat(data, readResponse.getResult().data);
    }

    if (names.length) {
      console.log(`names: ${names}`)

      const read = new IA.Functions.Common.ReadByName();
      read.objectName = "EMPLOYEE"
      read.fields = ['RECORDNO','EMPLOYEEID','CONTACT_NAME','STATUS']
      read.names = names
  
      const readResponse = await client.execute(read);
      data = [].concat(data, readResponse.getResult().data);
    }

    return data

  } 
  catch (ex) {
    // z.console.log(ex.name)
    // z.console.log(ex.message)

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
    description:
      'Finds an employee by `RECORDNO` or `EMPLOYEEID`.',
    hidden: false,
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'ID',
        type: 'string',
        helpText: 'ID of the employee. This can either be the Intacct-specified, numeric `RECORDNO`, or the customer-specified, alphanumeric `EMPLOYEEID`.  To specify an `EMPLOYEEID`, use the following format: EMPLOYEEID:value. For example, `EMPLOYEEID:AB1234`',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: findEmployee,
  },
};
