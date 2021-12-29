const { User, Payment } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')


exports.dashboardController = async (req, res, next) => {
    try {
        const payments = await Payment.find()
        let totalPayment = 0
        payments.map(payment => {
            totalPayment = totalPayment + payment.amount
        })
        // Also need to fine monthly payment amount
        res.render('pages/hw/dashboard', {
            totalPayment
        })
    } catch (err) {
        next(err)
    }

}

exports.myProfileController = (req, res, next) => {
    res.render('pages/hw/profile', {
        error: {}
    })
}

exports.updateProfileController = async (req, res, next) => {

    const { fullname, mobile, email } = req.body
    console.log(req.body)

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
                next(err)
            })
    } catch (err) {
        next(err)
    }
}

exports.changeImageController = async (req, res, next) => {
    console.log(req.file)
}


