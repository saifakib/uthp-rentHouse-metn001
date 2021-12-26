const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [

    body('fullname')
        .isLength({
            min: 5,
            max: 30
        })
        .withMessage("Username must be between 2 to 15 chars")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim()
    ,

    body('email')
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .custom(async (email) => {
            try {
                const user = await User.findOne({ email })
                if (user) {
                    if (user.email != email) {
                        return Promise.reject('Email allready used');
                    }
                    else {
                        return true
                    }
                }
            } catch (err) {
                return Promise.reject(err.message);
            }
        })
        .normalizeEmail()
    ,

    body('mobile')
        .isMobilePhone("bn-BD", {
            strictMode: true
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value })
                if (user) {
                    if (user.mobile != value) {
                        return Promise.reject("This number already is use !")
                    }
                    else {
                        return true
                    }
                } else {
                    return true
                }
            } catch (err) {
                return Promise.reject(err.message)
            }
        })
        .trim()

]

