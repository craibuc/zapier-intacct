/**
* Creates an CONTACT object.
 * https://intacct.github.io/intacct-sdk-js/classes/intacct_sdk_functions_company.contactcreate.html
 * 
 * @param {IA.OnlineClient} client 
 * @param {*} inputData
 * @returns {}
 */
exports.create_contact = async function (client, inputData) {

    const IA = require("@intacct/intacct-sdk");

    // try {

        let contact = new IA.Functions.Company.ContactCreate();
        Object.assign(contact, inputData);

        // create contact
        const response = await client.execute(contact);

        // return first element in the array as a "creates" can only return a single object
        return  response.getResult().data[0];

    // }
    // catch (ex) {
    //     if (ex instanceof IA.Exceptions.ResponseException) {
    //         console.error("An Intacct response exception was thrown", {
    //             "Class": ex.constructor.name,
    //             "Message": ex.message,
    //             "API Errors": ex.errors,
    //         });
    //     } 
    //     else {
    //         console.error("An exception was thrown", {
    //             "Class": ex.constructor.name,
    //             "Message": ex.message,
    //         });
    //     }
    // }

}

/**
* Updates an CONTACT object.
 * https://intacct.github.io/intacct-sdk-js/classes/intacct_sdk_functions_company.classupdate.html
 * 
 * @param {IA.OnlineClient} client 
 * @param {*} inputData
 * @returns {}
 */
exports.update_contact = async function (client, inputData) {

    const IA = require("@intacct/intacct-sdk");

    // try {

        let contact = new IA.Functions.Company.ContactUpdate();
        Object.assign(contact, inputData);

        // create contact
        const response = await client.execute(contact);

        // return first element in the array as a "creates" can only return a single object
        return  response.getResult().data[0];

    // }
    // catch (ex) {
    //     if (ex instanceof IA.Exceptions.ResponseException) {
    //         console.error("An Intacct response exception was thrown", {
    //             "Class": ex.constructor.name,
    //             "Message": ex.message,
    //             "API Errors": ex.errors,
    //         });
    //     } 
    //     else {
    //         console.error("An exception was thrown", {
    //             "Class": ex.constructor.name,
    //             "Message": ex.message,
    //         });
    //     }
    // }

}

/**
* Deletes a CONTACT object.
 * https://intacct.github.io/intacct-sdk-js/classes/intacct_sdk_functions_company.contactdelete.html
 * 
 * @param {IA.OnlineClient} client 
 * @param {*} inputData
 * @returns {}
 */
exports.delete_contact = async function (client, inputData) {

    const IA = require("@intacct/intacct-sdk");

    // try {

        let contact = new IA.Functions.Company.ContactDelete();
        contact.employeeId = inputData.contactName

        // perform delete
        const response = await client.execute(contact);

        // ContactDelete does not return anything
        return {};

    // }
    // catch (ex) {
    //     if (ex instanceof IA.Exceptions.ResponseException) {
    //         console.error("An Intacct response exception was thrown", {
    //             "Class": ex.constructor.name,
    //             "Message": ex.message,
    //             "API Errors": ex.errors,
    //         });
    //     } 
    //     else {
    //         console.error("An exception was thrown", {
    //             "Class": ex.constructor.name,
    //             "Message": ex.message,
    //         });
    //     }
    // }

}