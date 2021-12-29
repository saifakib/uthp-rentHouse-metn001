const { User, Profile, Location, Property, Tenant } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')


exports.dashboardController = async (req, res, next) => {
    try {
        const users = await User.find({ role: 'hw' })
            .populate({
                path: 'profile'
            })
        let propertiesC = 0
        let tenantC = 0
        users.map((user) => {
            propertiesC += user.profile.properties.length
            tenantC += user.profile.tenants.length
        })

        const locations = await Location.find()
        let areasC = 0
        locations.map((loc) => {
            areasC += loc.areas.length
        })

        res.render('pages/admin/dashboard', {
            users,
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
                res.redirect('/admin/profile')
            })
            .catch(err => {
                next(err)
            })
    } catch (err) {
        next(err)
    }
}

exports.tenantGetController = async (req, res, next) => {
    const tenants = await Tenant.find()
        .populate({
            path: 'house'
        })
    console.log(tenants)
    res.render('pages/admin/tenantList', { tenants })
}