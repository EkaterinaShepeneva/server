const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;


const db = require('../../models');

router.post('/registration', async (req, res, next) => {
    try {
        const { login, password } = req.body;
        //проверка корректности данных
        ///проверка, есть ли пользователь с таким же логином
        ///формирование токена
        //создание пользователя


        const token = jwt.sign({ login }, secret)

        const t = await db.User.findOne({
            where: { login: login },
        }).then((user) => { if (user) throw errors.error422('такой пользователь есть') })

        await db.User.create({
            login: login,
            password: password
        }).catch((err) => { console.log(err); });

        jwt.verify(token, secret, { login }, (err) => {
            if (err) {
                console.log('nooo');
                return res.status(401).send({
                    message: "это не наш токен!"
                });
            }
        })

        res.status(200).send(token);
    } catch (error) {
        next(error);
    }
});

module.exports = router;