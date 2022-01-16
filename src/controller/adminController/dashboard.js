const { User, Location, Property, Tenant, Payment } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const createError = require('http-errors')

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

        const payments = await Payment.find()
        let totalPayment = 0
        payments.map(payment => {
            totalPayment = totalPayment + payment.amount
        })

        res.render('pages/admin/dashboard', {
            users,
            locations,
            totalProperties: propertiesC || 0,
            totalTenants: tenantC || 0,
            totalAreas: areasC || 0,
            totalPayment: totalPayment || 0
        })
    } catch (err) {
        next(createError(204, err.message))
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
        res.render('pages/admin/propertyList', {
            properties
        })
    }
    catch (err) {
        next(createError(204, err.message))
    }
}

exports.myProfileController = (req, res, next) => {
    res.render('pages/admin/profile', {
        error: {}
    })
}

exports.updateProfileController = async (req, res, next) => {

    const { fullname, mobile, email } = req.body

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
                next(createError(405, err.message))
            })
    } catch (err) {
        next(createError(304, err.message))
    }
}

exports.tenantGetController = async (req, res, next) => {
    const tenants = await Tenant.find()
        .populate({
            path: 'house'
        })
    res.render('pages/admin/tenantList', { tenants })
}

exports.paymentGetController = async (req, res, next) => {
    try {
        const paymentList = await Payment.find()
            .populate({
                path: 'tenant',
                select: 'firstName lastName'
            })
        let totalPayment = 0
        paymentList.map(payment => {
            totalPayment = totalPayment + payment.amount
        })
        res.render('pages/admin/paymentList', { paymentList, totalPayment })
    }
    catch (err) {
        next(createError(204, err.message))
    }
}