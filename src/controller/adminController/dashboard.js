const { User, Profile, Location, Property } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const bcrypt = require('bcrypt');


exports.dashboardController = async (req, res, next) => {
    try {
        const profiles = await Profile.find()
        let propertiesC = 0
        let tenantC = 0
        profiles.map((profile) => {
            propertiesC += profile.properties.length
            tenantC += profile.tenants.length
        })

        const locations = await Location.find()
        let areasC = 0
        locations.map((loc) => {
            areasC += loc.areas.length
        })

        res.render('pages/admin/dashboard', {
            profiles,
            locations,
            totalProperties: propertiesC || 0,
            totalTenants: tenantC || 0,
            totalAreas: areasC || 0
        })
    } catch (err) {
        next(err)
    }
}

exports.getAllPropertyController = async (req, res, next) => {
    try {
        const properties = await Property.find()
        .populate({
            path: 'homeOwner_id',
            select: 'fullname'
        })
        .populate({
            path: 'area_id',
            select: 'name'
        })
        .populate({
            path: 'category',
            select: 'name'
        })
        console.log(properties)
        res.render('pages/admin/propertyList', {
            properties
        })
    }
    catch (err) {
        next(err)
    }
}

exports.myProfileController = (req, res, next) => {
    res.render('pages/admin/profile', {
        error: {}
    })
}

exports.updateProfileController = async (req, res, next) => {

    const { fullname, mobile, email } = req.body
    console.log(req.body)

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/profile',
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
                res.redirect('/admin/profile/my')
            })
            .catch(err => {
                next(err)
            })
    } catch (err) {
        next(err)
    }
}

exports.changePasswordController = (req, res, next) => {
    res.render('pages/admin/changePassword', {
        error: {}
    })
}

exports.changePasswordPostController = async (req, res, next) => {

    const { oldPassword, confPassword } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/changePassword',
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
                return res.render('pages/admin/changePassword',
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
                res.redirect('/admin/dashboard');
            }
        })

    } catch (e) {
        next(e)
    }
}