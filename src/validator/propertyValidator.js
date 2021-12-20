const { body } = require('express-validator');

module.exports = [

    body('disid')
        .isLength({ min: 1 })
        .withMessage("Must be Select a District")
    ,
    body('areaid')
        .isLength({ min: 1 })
        .withMessage("Must be Select a Area")
    ,
    body('short_address')
        .isLength({
            min: 1,
            max: 100
        })
        .withMessage("Added a Short Address between 2 to 100 chars")
    ,
    body('monthid')
        .isLength({ min: 1 })
        .withMessage("Select a month")
    ,
    body('categoryid')
        .isLength({ min: 1 })
        .withMessage("Select a Category")
    ,
    body('bedroom')
        .isLength({ min: 1 })
        .withMessage("How Many Bedroom !!")
    ,
    body('bathroom')
        .isLength({ min: 1 })
        .withMessage("How Many Bathroom !!")
    ,
    body('floor')
        .isLength({ min: 1 })
        .withMessage("Floor No")
    ,
    body('gender')
        .isLength({ min: 1 })
        .withMessage("Should be select One")
    ,
    body('price')
        .isLength({ min: 1 })
        .isInt()
        .withMessage("Give right price")
]

