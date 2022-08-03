const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { login } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        jwt.verify(token, secret, login)
    } catch (error) {
        next(error)
    }
    next()
}

module.exports = { auth }