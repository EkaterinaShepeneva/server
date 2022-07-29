const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const errors = require('../../utils/errors')


const db = require('../../models');

router.delete('/registration', async (req, res, next) => {
    try {
        const { login } = req.query;
        const t = await db.User.findOne({
            where: { login: login },
        }).then((user) => { if (!user) throw errors.error404('такого пользователя нет') })


        db.User.destroy({
            where: {
                login,
            },
        })

        res.status(200).send(login);
    } catch (error) {
        next(error);
    }
});

module.exports = router;