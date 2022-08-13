const jwt = require('jsonwebtoken');

const sign = (payload) => {
    const token = new Promise ((resolve, reject) => {
        jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
    return token
}

const verify = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    sign,
    verify
}

