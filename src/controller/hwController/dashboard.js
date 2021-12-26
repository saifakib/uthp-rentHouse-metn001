const { User } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const bcrypt = require('bcrypt')


exports.dashboardController = (req, res, next) => {
    res.render('pages/hw/dashboard', {
        name: req.user.fullname
    })
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
