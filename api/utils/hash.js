const crypto = require('crypto');

const hash = (password) => {
    const hashPassword = new Promise((resolve, reject) => {
        const hash =  crypto.createHash('md5').update(password).digest('hex');
        resolve(hash);
        reject('Error');
    });
    return hashPassword;
}
module.exports = { hash };