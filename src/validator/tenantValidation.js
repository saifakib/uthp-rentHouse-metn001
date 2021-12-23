const { body } = require('express-validator');

module.exports = [

    body('firstName')
        .isLength({
            min: 1,
            max: 30
        })
        .withMessage("First Name Length must be between 2 to 30 chars")
    ,

    body('lastName')
        .isLength({
            min: 1,
            max: 30
        })
        .withMessage("Last Name Length must be between 2 to 30 chars")
    ,
    body('email')
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .normalizeEmail()
    ,

    body('mobile')
        .isMobilePhone("bn-BD", {
            strictMode: true
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .trim()
    ,

]

