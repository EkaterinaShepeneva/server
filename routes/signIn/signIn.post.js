const express = require("express");
const router = express.Router();
const errors = require("../../utils/errors");
const db = require("../../models");
const { generateAccessToken } = require('../../utils/helpers')

require("dotenv").config();

router.post("/signIn", async (req, res, next) => {
    try {

        const { login, password } = req.body

        const user = await db.User.findOne({
            where: { login },
        })

        if (!user) {
            throw errors.error403('invalid login')
        }

        const { dataValues } = user

        if (dataValues.password !== password) {
            throw errors.error403('invalid password')
        }

        const token = generateAccessToken(login)

        res.status(200).json(token);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;