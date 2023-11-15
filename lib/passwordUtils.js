const crypto = require('crypto');

// TODO
function validPassword(password, hash, salt) {}
function genPassword(password) {
    var salt= crypto.randomBytes(32).toString('hex') //sudo random
    var genHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return{
        salt:salt,
        hash:genHash
    }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;