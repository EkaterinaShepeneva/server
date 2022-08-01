const express = require("express");
const router = express.Router();
const helpers = require("../../utils/helpers.js");
const errors = require("../../utils/errors");
const db = require("../../models");
const { generateAccessToken } = require('../../utils/helpers')

require("dotenv").config();

router.post("/signIn", async (req, res, next) => {
    try {

        const { login, password } = req.body

        const { dataValues } = await db.User.findOne({
            where: { login },
        })

        if (dataValues.password !== password) {
            res.status(200).send('Неверный пароль')
        }

        const token = generateAccessToken(login)

        res.status(200).json(token);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;