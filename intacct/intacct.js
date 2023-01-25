/**
 * @param {object} bundle
 * @return {OnlineClient}
 */
exports.get_client = function (authData) {

    // console.debug('intacct.get_client()')

    const IA = require("@intacct/intacct-sdk");

    const clientConfig = new IA.ClientConfig();
    Object.assign(clientConfig, authData);

    return new IA.OnlineClient(clientConfig);

};

/**
 * Returns an array of objects with a matching RECORDNO
 * 
 * @param {IA.OnlineClient} client
 * @param {string} objectName
 * @param {int[]} keys
 * @param {string[]} fields
 * @returns {object[]} objects
 */
exports.get_objects_by_key = async function (client, objectName, keys = [], fields = ['*']) {

    // console.debug('intacct.get_objects_by_key()')

    const IA = require("@intacct/intacct-sdk");   

    // try {

        let read = new IA.Functions.Common.Read();
        read.objectName = objectName;
        read.fields = fields;
        read.keys = keys;

        const readResponse = await client.execute(read);
        
        return readResponse.getResult().data;

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
 * Returns an array of objects with a matching ID
 * 
 * @param {IA.OnlineClient} client
 * @param {string} objectName
 * @param {string[]} names
 * @param {string[]} fields
 * @returns {object[]} objects
 */
exports.get_objects_by_name = async function (client, objectName, names, fields = ['*']) {
    
    // console.debug('intacct.get_objects_by_name()')

    const IA = require("@intacct/intacct-sdk");   

    // try {
    
        let read = new IA.Functions.Common.ReadByName();
        read.objectName = objectName;
        read.fields = fields;
        read.names = names;

        const response = await client.execute(read);

        return response.getResult().data;
        
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

exports.contacts = require("./contacts");
exports.employees = require("./employees");
