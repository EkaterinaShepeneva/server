const express = require('express');
const router = express.Router();
const errors = require('../../utils/errors')
const db = require('../../models');

router.delete('/registration', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { login } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = await db.User.findOne({
            where: { login: login },
        })

        if (!user) {
            throw errors.error400('The user does not exist')
        }

        const { dataValues } = user

        db.Task.destroy({
            where: {
                user_id: dataValues.userId,
            },
        })

        db.User.destroy({
            where: {
                login,
            },
        })

        res.status(200).send(dataValues);
    } catch (error) {
        next(error);
    }
});

module.exports = router;