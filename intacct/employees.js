/**
 * Creates an EMPLOYEE object.
 * https://intacct.github.io/intacct-sdk-js/classes/intacct_sdk_functions_employeeexpense.employeecreate.html
 * 
 * @param {IA.OnlineClient} client 
 * @param {*} inputData
 * @returns {}
 */
exports.create_employee = async function (client, inputData) {

    const IA = require("@intacct/intacct-sdk");   

    // try {

        let employee = new IA.Functions.EmployeeExpense.EmployeeCreate();
        Object.assign(employee,inputData)

        // create employee
        const response = await client.execute(employee);

        // return first element in the array as a "creates" can only return a single object
        return response.getResult().data[0];

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
 * Updates an EMPLOYEE object.
 * https://intacct.github.io/intacct-sdk-js/classes/intacct_sdk_functions_employeeexpense.employeeupdate.html
 * 
 * @param {IA.OnlineClient} client 
 * @param {*} inputData
 * @returns {}
 */
exports.update_employee = async function (client, inputData) {

    const IA = require("@intacct/intacct-sdk");   

    // try {

        let employee = new IA.Functions.EmployeeExpense.EmployeeUpdate();
        Object.assign(employee,inputData)

        // create employee
        const response = await client.execute(employee);

        // return first element in the array as Zapier "creates" can only return a single object
        return response.getResult().data[0];

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
 * Deletes an EMPLOYEE object.
 * https://intacct.github.io/intacct-sdk-js/classes/intacct_sdk_functions_employeeexpense.employeedelete.html
 * 
 * @param {IA.OnlineClient} client 
 * @param {*} inputData - matches 
 * @returns {} - nothing
 */
exports.delete_employee = async function (client, inputData) {

    const IA = require("@intacct/intacct-sdk");   

    // try {

        let employee = new IA.Functions.EmployeeExpense.EmployeeDelete();
        employee.employeeId = inputData.employeeId

        // perform delete
        const response = await client.execute(employee);

        // EmployeeDelete does not return anything
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
