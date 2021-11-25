const { body } = require('express-validator');
const { User } = require('../../models');

module.exports = [

    body('fullname')
        .isLength({
            min: 5,
            max: 30
        })
        .withMessage("Username must be between 2 to 15 chars")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .custom(async fullname => {
            let user = await User.findOne({ fullname })
            if (user) {
                return Promise.reject(`${fullname} allready used`);
            }
            return true
        })
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
                    return Promise.reject('Email allready used');
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
                    return Promise.reject("This number already is use !")
                } else {
                    return true
                }
            } catch (err) {
                return Promise.reject(err.message)
            }
        })
        .trim()
    ,

    body('password')
        .isLength({ min: 1 })
        .withMessage("Password is Required")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol")
    ,

    body('confirmPassword')
        .isLength({ min: 1 }).withMessage('Confirm Password is Required')
        .custom((confirmpassword, { req }) => {
            if (confirmpassword !== req.body.password) {
                throw new Error('Password does not match');
            }
            return true
        })

]

