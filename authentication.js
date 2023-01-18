// https://github.com/zapier/zapier-platform/blob/master/example-apps/session-auth/authentication.js

'use strict';

// You want to make a request to an endpoint that is either specifically designed
// to test auth, or one that every user will have access to. eg: `/me`.
// By returning the entire request object, you have access to the request and
// response data for testing purposes. Your connection label can access any data
// from the returned response using the `json.` prefix. eg: `{{json.username}}`.

// const test = (z, bundle) =>
//   z.request({ url: 'https://auth-json-server.zapier-staging.com/me' });

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
 * @returns {Object}
 */
const test = async (z, bundle) => {

  const IA = require("@intacct/intacct-sdk");

  try {

    const bootstrap = require("./intacct/bootstrap");
    const client = bootstrap.client(bundle);

    // const bootstrap = require("./bootstrap");
    // let logger = bootstrap.logger();
    // const client = bootstrap.client(logger);

    const read = new IA.Functions.Common.Read();
    read.objectName = "LOCATION"
    read.fields = ['RECORDNO','LOCATIONID','NAME','STATUS']
    read.keys = [1]

    const readResponse = await client.execute(read);
    const data = readResponse.getResult().data;
    console.debug(data)

    return { 
      status: 200,
      json: data[0] // first element in the array
    }

  } 
  catch (ex) {

    z.console.log(ex.message)

    // XL03000006 Sign-in information is incorrect - bad user id
    // XL03000006 Incorrect Intacct XML Partner ID or password. - bad sender id
    // Response control status failure - invalidRequest Invalid Request - bad company id

    // if (ex instanceof IA.Exceptions.ResponseException) {
    //   console.debug('******************** A ********************')
    // } 
    // else {
    //   console.debug('******************** B ********************')
    // }

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

  const IA = require("@intacct/intacct-sdk");

  try {
  
    const bootstrap = require("./intacct/bootstrap");
    const client = bootstrap.client(bundle);
  
    // bundle.authData.client = client;

    return { client: client };

  }
  catch (ex) {

    z.console.log(ex.message)

    if (ex instanceof IA.Exceptions.ResponseException) {
        console.error("An Intacct response exception was thrown", {
            "Class": ex.constructor.name,
            "Message": ex.message,
            "API Errors": ex.errors,
        });
        console.log("Failed! " + ex.message);
    } 
    else {
        console.error("An exception was thrown", {
            "Class": ex.constructor.name,
            "Message": ex.message,
        });

    }

  } // catch

};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
// const includeSessionKeyHeader = (request, z, bundle) => {
//   if (bundle.authData.sessionKey) {
//     request.headers = request.headers || {};
//     request.headers['X-API-Key'] = bundle.authData.sessionKey;
//   }

//   return request;
// };

module.exports = {
  config: {
    // "session" auth exchanges user data for a different session token (that may be
    // periodically refreshed")
    type: 'session',
    sessionConfig: { perform: getOnlineClient },

    // Define any input app's auth requires here. The user will be prompted to enter
    // this info when they connect their account.
    fields: [
      { computed: false, key: 'sender_id', required: true, label: 'Sender ID', type: 'string', },
      { computed: false, key: 'sender_password', required: true, label: 'Sender Password', type: 'password', },
      { computed: false, key: 'user_id', required: true, label: 'User ID', type: 'string', },
      { computed: false, key: 'user_password', required: true, label: 'User Password', type: 'password', },
      { computed: false, key: 'company_id', required: true, label: 'Company ID', type: 'string', },
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
    connectionLabel: '{{json.NAME}}',
  },
  befores: [
    // includeSessionKeyHeader
  ],
  afters: [],
};