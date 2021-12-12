const { body } = require('express-validator');

module.exports = [

    body('oldPassword')
        .isLength({ min: 1 })
        .withMessage("Old Password is Required")
    ,

    body('newPassword')
        .isLength({ min: 1 })
        .withMessage("New Password is Required")
        .isStrongPassword()
        .withMessage("New Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol")
    ,

    body('confPassword')
        .isLength({ min: 1 }).withMessage('Confirm Password is Required')
        .custom((confPassword, { req }) => {
            if (confPassword !== req.body.newPassword) {
                throw new Error('Password does not match');
            }
            return true
        })

]

