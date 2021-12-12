const { body } = require('express-validator');
const { Location } = require('../models');

module.exports = [

    body('location')
        .isLength({
            min: 1,
            max: 20
        })
        .withMessage("Length must be between 2 to 20 chars")
        .custom(async location => {
            let loc = await Location.findOne({ name: location })
            if (loc) {
                return Promise.reject(`${location} allready used`);
            }
            return true
        })
    ,

    body('confirm')
        .isLength({ min: 1 }).withMessage('Confirm District is Required')
        .custom((confirm, { req }) => {
            if (confirm !== req.body.location) {
                throw new Error('District name does not match');
            }
            return true
        })

]

