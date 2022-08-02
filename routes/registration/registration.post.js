const express = require('express');
const router = express.Router();
const errors = require('../../utils/errors')
const { generateAccessToken } = require('../../utils/helpers')
const db = require('../../models');
const passwordHash = require('password-hash');

router.post('/registration', async (req, res, next) => {
    try {
        const { login, password } = req.body;

        await db.User.findOne({
            where: { login: login },
        }).then(user => { if (user) throw errors.error401('A user with this username already exists'); })

        if (login.length < 5 || login.length >= 30) {
            throw errors.error401('The length of the login must be more than 5 and less than 30 characters');
        }

        if (login.match(/[^0-9^a-z^а-я^-]/gi)) {
            throw errors.error401(`Invalid syntax login: ${login.match(/[^0-9^a-z^а-я^-]/gi)}`)
        }

        if (password.match(/[^0-9^a-z^а-я^(~ ! ? @ # $ % ^ & * _ - = + <> " . , : ; / |)]/gi)) {
            throw errors.error401(`Invalid syntax password: ${password.match(/[^0-9^a-z^а-я^(/ | ~ ! ? <> @ # $ % ^ & * _ - = + " . , : ;)]/gi)}`)
        }

        if (!(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{8,128}$/g.test(password))) {
            throw errors.error401(`The password must contain one small, one capital letter, one digit. The password must be between 8 and 128 characters long`)
        }

        const token = generateAccessToken(login)
        const user = await db.User.create({
            login,
            password: passwordHash.generate(password)
        })

        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;