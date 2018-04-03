const config = require('../config');
const Credstash = require('nodecredstash');
const request = require('request-promise');
const get = require('lodash/get');

const log = require('../vs-logger').logger;
const kmsKey = config.kmsKey;
const credstash = new Credstash({
  table: config.credstashTable,
  awsOpts: { regions: 'us-west-2' },
  kmsKey
});

const name = 'creditService.experian.password';
const USERNAME = config.experiam.username;

function logError(msg) {
  log.error(`[experian-password.js] - ${msg}`);
}

async function post(form, credentials) {
  return await request.put({
    url: config.experian.passwordResetUrl,
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': form.length
    },
    form,
    strictSSL: true,
    resolveWithFullResponse: true
  });
}

async function incrementVersion(name) {
  try {
    return await credstash.incrementVersion({ name });
  }
  catch (e) {
    logError(`error incrementing password version ${e.message}`);
    throw e;
  }
}

async function savePassword(newPassword, version) {
  try {
    return await credstash.putSecret({ name, secret: newPassword, version });
  }
  catch (e) {
    logError(`Error saving password to credstash ${e.message}`);
    throw e;
  }
}

async function resetPassword(newPassword, credentials) {
  try {
    const resetForm = `newpassword=${resetPassword}&command=resetpassword&application=netconnect`;
    return await post(resetForm, credentials);
  }
  catch (e) {
    logError(`Error while resetting password ${e.message}`);
    throw e;
  }
}

async function getNewPassword(credentials) {
  try {
    const form = '&command=requestnewpassword&application=netconnect';

    return await post(form, credentials);
  }
  catch (e) {
    logError(`Error while requesting new password ${e.message}`);
    throw e;
  }
}

module.exports.updateExperianPassword = async (event, context, callback) => {
  try {
    const PASSWORD = await credstash.getSecret({ name });
    if (!PASSWORD) {
      log.error(
        '[experian-password.js] - something was wrong with retrieving the current password'
      );
      return callback({
        status: 500,
        essage: 'Error retrieving current password'
      });
    }

    const credentials = Buffer.from(`${USERNAME}:${PASSWORD}`).toString(
      'base64'
    );

    const requestPasswordResponse = await getNewPassword(credentials);
    const newPassword = get(requestPasswordResponse, 'caseless.dict.response');

    if (!newPassword) {
      log.error(
        '[experianPassword.js] - Could not parse reset password from response'
      );
      return callback({
        status: 500,
        message: 'Could not parse Reset Password from Experian'
      });
    }

    const resetResponse = await resetPassword(newPassword, credentials);
    const status = get(resetResponse, 'caseless.dict.response');
    if (status.toLowerCase() === 'success') {
      const version = await incrementVersion(name);
      await savePassword(resetPassword, version);
      log.info(`[experian-password.js] - stored password in credstash`);
    }
  }
  catch (e) {
    return callback({
      status: 500,
      message: 'Error saving new credentials'
    });
  }
};

// const config = require('../config');
// const CredStash = require('nodecredstash');
// const request = require('request-promise');
// const _get = require('lodash.get');

// const log = require('../vs-logger').logger;
// const kmsKey = config.kmsKey;
// let credstash = new CredStash({
//   table: config.credstashTable,
//   awsOpts: { region: 'us-west-2' },
//   kmsKey
// });

// const name = 'creditService.experian.password';
// const USERNAME = config.experian.username;

// module.exports.updateExperianPassword = (event, context, callback) => {
//   //make call to retrieve password from experian
//   credstash
//     .getSecret({ name })
//     .then(secret => {
//       const PASSWORD = secret;
//       if (!PASSWORD) {
//         log.error(
//           `[experianPassword.js] - Something was wrong with retreiving the current password ${PASSWORD}`
//         );
//         return callback({
//           status: 500,
//           message: 'Error retrieving current password'
//         });
//       }

//       const form = '&command=requestnewpassword&application=netconnect';
//       const contentLength = form.length;
//       const credentials = new Buffer(`${USERNAME}:${PASSWORD}`).toString(
//         'base64'
//       );
//       const url = config.experian.passwordResetUrl;

//       if (!url) {
//         log.error(
//           "[experianPassword.js] - couldn't retreive url for password reset"
//         );
//         return callback({
//           status: 500,
//           message: 'Error retrieving password reset url'
//         });
//       }

//       const options = {
//         url,
//         headers: {
//           Authorization: `Basic ${credentials}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Content-Length': contentLength
//         },
//         form,
//         strictSSL: true,
//         resolveWithFullResponse: true
//       };
//       request
//         .post(options)
//         .then(result => {
//           const resetPassword = _get(result, 'caseless.dict.response');

//           if (!resetPassword) {
//             log.error(
//               '[experianPassword.js] - Could not parse reset password from response'
//             );
//             return callback({
//               status: 500,
//               message: 'Could not parse Reset Password from Experian'
//             });
//           }

//           //send password back to experian
//           const resetForm = `newpassword=${resetPassword}&command=resetpassword&application=netconnect`;
//           const resetContentLength = resetForm.length;
//           const resetOptions = {
//             url,
//             headers: {
//               Authorization: `Basic ${credentials}`,
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Content-Length': resetContentLength
//             },
//             form: resetForm,
//             strictSSL: true,
//             resolveWithFullResponse: true
//           };

//           request
//             .post(resetOptions)
//             .then(response => {
//               const status = _get(response, 'caseless.dict.response');
//               if (status.toLowerCase() === 'success') {
//                 credstash
//                   .incrementVersion({ name })
//                   .then(version => {
//                     let secret = { name, secret: resetPassword, version };
//                     credstash.putSecret(secret).then(response => {
//                       log.info(
//                         '[experianPassword.js] - stored password in credstash'
//                       );
//                       if (config.experian.secondPasswordTable) {
//                         //We need to update the second table locally or on stage
//                         let secondKmsKey = config.experian.secondKmsKey;
//                         credstash = new CredStash({
//                           table: config.experian.secondPasswordTable,
//                           awsOpts: { region: 'us-west-2' },
//                           kmsKey: secondKmsKey
//                         });
//                         credstash
//                           .incrementVersion({ name })
//                           .then(version => {
//                             let secret = {
//                               name,
//                               secret: resetPassword,
//                               version
//                             };
//                             credstash
//                               .putSecret(secret)
//                               .then(response => {
//                                 log.info(
//                                   '[experianPassword.js] - stored password in second credstash'
//                                 );

//                                 return callback(null, {
//                                   status: 200,
//                                   message:
//                                     'Successfully reset Experian password'
//                                 });
//                               })
//                               .catch(error => {
//                                 log.error(
//                                   `[experianPassword.js] - error saving password ${error}`
//                                 );

//                                 return callback({
//                                   status: 500,
//                                   message: 'Error saving new credentials'
//                                 });
//                               });
//                           })
//                           .catch(error => {
//                             log.error(
//                               `[experianPassword.js] - error getting password version ${error}`
//                             );

//                             return callback({
//                               status: 500,
//                               message: 'Error saving new credentials'
//                             });
//                           });
//                       }
//                       if (!config.experian.secondPasswordTable) {
//                         log.info(
//                           '[experianPassword.js] - stored password in only credstash'
//                         );

//                         return callback(null, {
//                           status: 200,
//                           message: 'Successfully reset Experian password'
//                         });
//                       }
//                     });
//                   })
//                   .catch(error => {
//                     log.error(
//                       `[experianPassword.js] - error getting password version ${error}`
//                     );

//                     return callback({
//                       status: 500,
//                       message: 'Error saving new credentials'
//                     });
//                   });
//               }
//             })
//             .catch(error => {
//               log.error(
//                 `[experianPassword.js] - error saving password ${error}`
//               );

//               return callback({
//                 status: 500,
//                 message: 'Error saving new credentials'
//               });
//             });
//         })
//         .catch(error => {
//           log.error(
//             `[experianPassword.js] - error returned from Experian ${error}`
//           );

//           return callback({
//             status: 500,
//             message: 'Error returned from Experian'
//           });
//         });
//     })
//     .catch(error => {
//       log.error(
//         `[experianPassword.js] - Received Error from credstash: ${error}`
//       );

//       return callback({
//         status: 500,
//         message: 'Error retrieving current credentials'
//       });
//     });
// };
