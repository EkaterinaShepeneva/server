const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const auth = async (req, res, next) => {
    try {
        const { login } = (req.method === 'PATCH') ? (req.body) : (req.query);
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, login)
    } catch (error) {
        next(error)
    }
    next()
}

module.exports = { auth }