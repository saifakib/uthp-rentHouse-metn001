const { User } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const bcrypt = require('bcrypt')


exports.dashboardController = (req, res, next) => {
    res.render('pages/hw/dashboard', {
        name: req.user.fullname
    })
}

exports.changePasswordController = (req, res, next) => {
    res.render('pages/hw/changePassword', {
        error: {}
    })
}

exports.changePasswordPostController = async (req, res, next) => {

    const { oldPassword, confPassword } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/hw/changePassword',
            {
                error: errors.mapped()
            });
    }
    try {

        bcrypt.compare(oldPassword, req.user.password, async (err, result) => {

            if (err) {
                next(err)
            }
            if (!result) {
                return res.render('pages/hw/changePassword',
                    {
                        error: {
                            oldPassword: 'Incorrect Password'
                        },
                    });
            } else {
                const hashPassword = await bcrypt.hash(confPassword, 11);
                const updatePassword = await User.findByIdAndUpdate(req.user._id, { password: hashPassword })
                if (updatePassword) {
                    req.user.password = hashPassword
                }
                res.redirect('/hw/dashboard');
            }
        })

    } catch (e) {
        next(e)
    }
}
