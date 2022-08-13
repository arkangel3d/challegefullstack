const { verify } = require('./jwt');

const authUser = async (req, res, next) => {
const token = req.headers.authorization?.split(' ')[1];
if (!token) {
    return res.status(401).json({ message: 'No autorization' })
    };

    try {
        await verify(token);
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'No autorization' })
    }

};

module.exports = authUser;