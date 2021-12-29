const { User, Profile } = require('../models')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const createError = require('http-errors')

exports.registerGetController = async (req, res, next) => {
    try {
        res.render('pages/auth/register', {
            error: {}, value: {}
        })
    } catch (err) {
        next(createError(501, "Internal Server Error"))
    }
}



exports.registerPostController = async (req, res, next) => {

    const { fullname, email, mobile, password, confirmPassword } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        //req.flash('fail', 'Account Info invalid !!')
        return res.render('pages/auth/register.ejs',
            {
                error: errors.mapped(),
                value: {
                    fullname, email, mobile
                },
                // flashMessage: Flash.getMessage(req)
            });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 11);

        const user = new User({
            fullname,
            email,
            mobile,
            password: hashPassword
        })

        await user.save()
            .then(saveUser => {
                let profile = new Profile({
                    user: saveUser._id
                })
                profile.save()
                    .then(saveProfile => {
                        saveUser.profile = saveProfile._id
                        saveUser.save()
                            .then(savedUser => {
                                req.user = savedUser
                            })
                            .catch(err => {
                                console.log(err)
                                next(createError(501, "Internal Implementation Error!!"))
                            })
                    })
                    .catch(err => {
                        next(createError(501, "Internal Implementation Error!!"))
                    })
            })
            .catch(error => {
                next(createError(501, "Internal Implementation Error!!"))
            })

        req.isloggedIn = true
        //req.flash('success', 'User Account Created !!')

    } catch (e) {
        next(createError(400, e.message))
    }

    res.render('pages/auth/login.ejs', {
        error: {}, value: {},
        //flashMessage: Flash.getMessage(req)
    });
};




exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', { error: {}, value: {} });
};


exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        //req.flash('fail', 'Account Info invalid !!')
        res.render('pages/auth/login.ejs',
            {
                error: errors.mapped(),
                value: {
                    email
                }
                //flashMessage: Flash.getMessage(req)
            });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            //req.flash('fail', 'Invalid Creadential')
            res.render('pages/auth/login.ejs', {
                error: {},
                value: {
                    email
                },
                //flashMessage: Flash.getMessage(req),
            });

        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            //req.flash('fail', 'Invalid Creadential')
            res.render('pages/auth/login.ejs', {
                error: {},
                value: {
                    email
                },
                //flashMessage: Flash.getMessage(req),
            });
        } else {
            req.session.isloggedIn = true,
                req.session.user = user,
                //req.flash('success', 'User  login!')
                res.redirect('/dashboard')
        }
    }
    catch (e) {
        next(createError(400, e.message))
    }
};

exports.logoutController = (req, res, next) => {
    //req.flash('success', 'Logout!!')
    req.session.isloggedIn = false
    return res.redirect('/auth/login')
};

exports.changePasswordController = (req, res, next) => {
    res.render(`pages/${req.user.role}/changePassword`, {
        error: {}
    })
}

exports.changePasswordPostController = async (req, res, next) => {

    const { oldPassword, confPassword } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render(`pages/${req.user.role}/changePassword`,
            {
                error: errors.mapped()
            });
    }
    try {

        bcrypt.compare(oldPassword, req.user.password, async (err, result) => {

            if (err) {
                next(createError(501, "Internal Error!!"))
            }
            if (!result) {
                return res.render(`pages/${req.user.role}/changePassword`,
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
                res.redirect(`/${req.user.role}/dashboard`);
            }
        })

    } catch (e) {
        next(createError(400, e.message))
    }
}
