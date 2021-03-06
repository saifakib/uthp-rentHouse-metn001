const { User, Payment, Property } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const createError = require('http-errors')

exports.dashboardController = async (req, res, next) => {
    try {
        const payments = await Payment.find()
        let totalPayment = 0
        payments.map(payment => {
            totalPayment = totalPayment + payment.amount
        })
        // Also need to fine monthly payment amount

        const properties = await Property.find({ homeOwner_id: req.user._id }).count()
        res.render('pages/hw/dashboard', {
            properties,
            totalPayment: totalPayment || 0
        })
    } catch (err) {
        next(createError(400, err.message))
    }

}

exports.myProfileController = (req, res, next) => {
    res.render('pages/hw/profile', {
        error: {}
    })
}

exports.updateProfileController = async (req, res, next) => {

    const { fullname, mobile, email } = req.body

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/hw/profile',
            {
                error: errors.mapped(),
            });
    }
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                fullname,
                email,
                mobile
            }
        })
            .then(() => {
                res.redirect('/hw/profile/my')
            })
            .catch(err => {
                next(createError(205, err.message))
            })
    } catch (err) {
        next(createError(304, err.message))
    }
}

exports.changeImageController = async (req, res, next) => {
    console.log(req.file)
}


