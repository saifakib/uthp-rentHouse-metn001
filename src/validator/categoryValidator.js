const { body } = require('express-validator');
const { Category } = require('../models');

module.exports = [

    body('category')
        .isLength({
            min: 1,
            max: 30
        })
        .withMessage("Length must be between 2 to 30 chars")
        .custom(async category => {
            let cat = await Category.findOne({ name: category })
            if (cat) {
                return Promise.reject(`${category} allready used`);
            }
            return true
        })
    ,

    body('confirm')
        .isLength({ min: 1 }).withMessage('Confirm Category is Required')
        .custom((confirm, { req }) => {
            if (confirm !== req.body.category) {
                throw new Error('Category name does not match');
            }
            return true
        })

]

