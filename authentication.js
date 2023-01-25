// https://github.com/zapier/zapier-platform/blob/master/example-apps/session-auth/authentication.js

'use strict';

/**
 * Tests the connection to Intacct by getting the LOCATION of RECORDNO=1.
 * 
 * A successful test returns an object a status of 200 and the location's data.
 * A failed test returns an object with a status of 401.
 * 
 * https://developer.intacct.com/api/company-console/locations/#get-location
 * 
 * @param {*} z - request/response object (unused)
 * @param {*} bundle 
 * @returns {Object} object
 */
const test = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");
  const intacct = require('./intacct/intacct');

  try {

    const client = intacct.get_client(bundle.authData)

    // get LOCAITONs; if an error isn't raised, then authentication was a success
    const location = await intacct.get_objects_by_key(client, 'LOCATION', [], ['RECORDNO','LOCATIONID','NAME','STATUS'])

    return {
      status: 200,
      json: {
          company_id: bundle.authData.company_id
        }
    }

  } 
  catch (ex) {
    z.console.error(ex.message)

    if (ex instanceof IA.Exceptions.ResponseException) {
      // XL03000006 Sign-in information is incorrect - bad user id
      // XL03000006 Incorrect Intacct XML Partner ID or password. - bad sender id
      // Response control status failure - invalidRequest Invalid Request - bad company id

      // throw new z.errors.Error(ex.message, 'Unauthorized', 401)
    } 
    else {
      // throw new z.errors.Error(ex.message, 'Internal Server Error', 500)
    }

    return { status: 401 }

  }

};

/**
 * Gets a populated Intacct OnlineClient instance.
 * 
 * @param {*} z - request/response object (unused)
 * @param {*} bundle - includes the populated fields (bundle.AuthData)
 * @returns {OnlineClient}
 */
const getOnlineClient = async (z, bundle) => {

  // z.console.log('getOnlineClient')

  const IA = require("@intacct/intacct-sdk");
  const intacct = require('./intacct/intacct');

  try {

    return {
      client: intacct.get_client(bundle.authData)
    }

  }
  catch (ex) {
    
    if (ex instanceof IA.Exceptions.ResponseException) {
      throw new z.errors.Error(ex.message, 'Bad Request', 400)
    } 
    else {
      throw new z.errors.Error(ex.message, 'Internal Server Error', 500)
    }

  }

};

module.exports = {
  config: {
    // "session" auth exchanges user data for a different session token (that may be
    // periodically refreshed")
    type: 'session',
    sessionConfig: { perform: getOnlineClient },

    // Define any input app's auth requires here. The user will be prompted to enter
    // this info when they connect their account.
    fields: [
      { computed: false, key: 'senderId', required: true, label: 'Sender ID', type: 'string',  helpText: '[Sender ID](https://developer.intacct.com/web-services/)',},
      { computed: false, key: 'senderPassword', required: true, label: 'Sender Password', type: 'password', helpText: '[Sender Password](https://developer.intacct.com/web-services/)'},
      { computed: false, key: 'userId', required: true, label: 'User ID', type: 'string', helpText: '[User ID](https://developer.intacct.com/web-services/)'},
      { computed: false, key: 'userPassword', required: true, label: 'User Password', type: 'password', helpText: '[User Password](https://developer.intacct.com/web-services/)'},
      { computed: false, key: 'companyId', required: true, label: 'Company ID', type: 'string', helpText: '[Company ID](https://developer.intacct.com/web-services/)'},
    ],

    // The test method allows Zapier to verify that the credentials a user provides
    // are valid. We'll execute this method whenever a user connects their account for
    // the first time.
    test,

    // This template string can access all the data returned from the auth test. If
    // you return the test object, you'll access the returned data with a label like
    // `{{json.X}}`. If you return `response.data` from your test, then your label can
    // be `{{X}}`. This can also be a function that returns a label. That function has
    // the standard args `(z, bundle)` and data returned from the test can be accessed
    // in `bundle.inputData.X`.
    connectionLabel: '{{json.company_id}}',
  },
  befores: [
    // includeSessionKeyHeader
  ],
  afters: [],
};