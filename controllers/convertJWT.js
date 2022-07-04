const sign = require('jwt-encode');
const decodeJWT = require('jwt-decode');
const secret = "secret";

async function handle(token) {
   return sign(token, secret);
}

function decode(token) {
   return decodeJWT(token);
}

module.exports = {
   handle,
   decode
}