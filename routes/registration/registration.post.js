const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const errors = require('../../utils/errors')
const { generateAccessToken } = require('../../utils/helpers')


const db = require('../../models');

router.post('/registration', async (req, res, next) => {
    try {
        const { login, password } = req.body;
        //проверка корректности данных
        ///проверка, есть ли пользователь с таким же логином
        ///формирование токена
        //создание пользователя


        const token = generateAccessToken(login)


        await db.User.findOne({
            where: { login: login },
        }).then(user => { if (user) throw errors.error400('Такой пользователь уже есть'); })

        const user = await db.User.create({
            login,
            password
        })

        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
});

module.exports = router;