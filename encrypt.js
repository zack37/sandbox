const crypto = require('crypto');

const alg = 'aes-128-ecb';
const secret = 'myVeryTopSecretK';
const planText = 'This is an example';
const cipher = crypto.createCipheriv(alg, secret, '');
const decipher = crypto.createDecipheriv(alg, secret, '');

const encrypted =
  cipher.update(planText, 'utf8', 'base64') + cipher.final('base64');

const decrypted =
  decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');

console.log('original', planText);
console.log('encrypted', encrypted);
console.log('decrypted', decrypted);
