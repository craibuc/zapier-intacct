/**
 * @param {object} bundle
 * @return {OnlineClient}
 */
exports.client = function (bundle) {

    const IA = require("@intacct/intacct-sdk");

    let clientConfig = new IA.ClientConfig();
    clientConfig.senderId = bundle.authData.sender_id
    clientConfig.senderPassword = bundle.authData.sender_password
    clientConfig.userId = bundle.authData.user_id
    clientConfig.userPassword = bundle.authData.user_password
    clientConfig.companyId = bundle.authData.company_id

    return new IA.OnlineClient(clientConfig);

};