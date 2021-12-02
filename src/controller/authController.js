const { User, Profile } = require('../models')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const Flash = require('../utils/FLash');

exports.registerGetController = async (req, res, next) => {
    try {
        res.render('pages/auth/register', {
            error: {}, value: {}
        })
    } catch (err) {
        console.log(err)
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
            .then(savedUser => {
                let profile = new Profile({
                    user: savedUser._id
                })
                profile.save()
                    .then(success => {
                        req.user = savedUser
                        console.log("Also Profile Created")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(error => {
                res.json({ error })
            })

        req.isloggedIn = true
        //req.flash('success', 'User Account Created !!')

    } catch (e) {
        next(e)
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
        next(e);
    }
};

exports.logoutController = (req, res, next) => {
    //req.flash('success', 'Logout!!')
    req.session.isloggedIn = false
    return res.redirect('/auth/login')
};