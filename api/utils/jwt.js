const jwt = require('jsonwebtoken');

const sign = (payload) => {
    const token = new Promise ((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
    return token
};

const verify = (token) => {
    const decode = new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
            if(err) reject(err);
            resolve(decode);
        })
    })
    return decode;
};

module.exports = {sign, verify }

