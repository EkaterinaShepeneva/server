const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;

const auth = (login, token) => {
    let result
    jwt.verify(token, secret, { login: login }, (err) => {
        if (err) {
            result = false
            return
        }
        result = true
    })
    return result
}

module.exports = { auth }