const express = require('express');
const router = express.Router();
const errors = require('../../utils/errors')
const db = require('../../models');

router.delete('/registration', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const { dataValues } = await db.User.findOne({
            where: { user_id: userId },
        })

        if (!user) {
            throw errors.error400('The user does not exist')
        }

        db.Task.destroy({
            where: {
                user_id: userId,
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