const { body } = require('express-validator');
const { User } = require('../../models');

module.exports = [
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .custom(async email => {
            let user = await User.findOne({ email })
            if (!user) {
                return Promise.reject('Email does not exits')
            }
            return true
        })
        .normalizeEmail()
    ,
    body('password')
        .notEmpty().withMessage('Password must be required')
] 