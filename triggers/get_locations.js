/**
 * 
 * @param {*} z 
 * @param {*} bundle 
* @returns {object[]} location
 */
const getLocations = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");
  const intacct = require('../intacct/intacct');

  try {

    const client = intacct.get_client(bundle.authData)

    // get all LOCATION records
    const locations = await intacct.get_objects_by_key(client, 'LOCATION', [], ['LOCATIONID','NAME'])

    // convert Intacct's field names into canoncial keys expected by Zapier
    return locations.map((location)=>{
      return {
        id: location.LOCATIONID,
        name: location.NAME  
      }
    });

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
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#triggerschema
  key: 'get_locations',
  noun: 'Location',

  display: {
    label: 'Get Locations',
    description: 'Gets the list of locations.',
    hidden: true,
  },

  operation: {
    perform: getLocations,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    inputFields: [],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 'ACME',
      name: 'Acme, Inc.',
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      {key: 'id', label: 'Location ID'},
      {key: 'name', label: 'Location Name'}
    ]
  }
};
