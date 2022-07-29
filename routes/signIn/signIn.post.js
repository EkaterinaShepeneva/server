const express = require("express");
const router = express.Router();
const helpers = require("../../utils/helpers.js");
const errors = require("../../utils/errors");
const db = require("../../models");
const auth = require("../../middleware/auth")

require("dotenv").config();

router.post("/signIn", async (req, res, next) => {
    try {
        //const { token } = req.params
        const { login, password, token } = req.body

        const { dataValues } = await db.User.findOne({
            where: { login: login },
        })

        if (dataValues.password !== password) {
            res.status(200).send('Неверный пароль')
        }


        res.status(200).send('hello');
    } catch (error) {
        return next(error);
    }
});

module.exports = router;