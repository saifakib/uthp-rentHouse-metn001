const { Tenant, Property, Payment, Profile } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')
const createError = require('http-errors')

exports.tenantCreateGetController = (req, res) => {
    res.render('pages/hw/tenantCreate', {
        error: {},
        value: {}
    })
}

exports.tenantCreatePostController = async (req, res, next) => {

    const { firstName, lastName, email, mobile, property_id } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.render('pages/hw/tenantCreate',
            {
                error: errors.mapped(),
                value: {
                    firstName,
                    lastName,
                    email,
                    mobile
                }
            });
    }

    try {
        const newtenant = new Tenant({
            firstName,
            lastName,
            email,
            mobile,
            house: property_id
        })

        await newtenant.save()
            .then(async (savedtenant) => {
                await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    {
                        $push: { tenants: savedtenant._id }
                    })
                await Property.findByIdAndUpdate(property_id, { status: false })
                res.redirect('/hw/tenant/list')
            })
            .catch(error => {
                next(createError(400, error.message))
            })

    } catch (e) {
        next(createError(400, e.message))
    }
}


exports.tenantListController = (req, res) => {
    res.render('pages/hw/tenantList')
}


exports.tenantUpdatePageController = async (req, res, next) => {
    try {
        const targettenant = await Tenant.findById(req.query.id)
        res.render('pages/hw/updateTenant', {
            value: {
                targettenant
            }
        })
    } catch (err) {
        next(createError(400, err.message))
    }
}

exports.tenantUpdateController = async (req, res, next) => {

    const { firstName, lastName, email, mobile, property_id } = req.body;

    try {
        const privious = await Tenant.findById(req.query.id)
        let updateObj = {
            firstName,
            lastName,
            email,
            mobile
        }

        if (privious.house == property_id || privious.house == "") {
            await Tenant.findByIdAndUpdate(req.query.id, { $set: updateObj })
                .then(() => {
                    res.redirect('/hw/tenant/list')
                })
                .catch(error => {
                    next(error)
                })
        } else {
            updateObj.house = property_id
            await Tenant.findByIdAndUpdate(req.query.id, { $set: updateObj })
                .then(async (savedtenant) => {
                    await Property.findByIdAndUpdate(privious.house, { status: true })
                        .then(async () => {
                            await Property.findByIdAndUpdate(savedtenant.house, { status: false })
                                .then(() => {
                                    res.redirect('/hw/tenant/list')
                                })
                                .catch(error => {
                                    next(createError(304, error.message))
                                })
                        })
                        .catch(error => {
                            next(createError(304, error.message))
                        })
                })
                .catch(error => {
                    next(createError(304, error.message))
                })
        }

    } catch (err) {
        next(createError(500, err.message))
    }
}

exports.removeController = async (req, res, next) => {
    try {
        await Property.findByIdAndUpdate(req.query.property_id, { status: true })
        let remove = await Tenant.findByIdAndDelete(req.query.id)
        if (remove) {
            res.redirect(`/hw/tenant/list`)
        }
    } catch (err) {
        next(createError(500, err.message))
    }
}

exports.viewController = async (req, res, next) => {
    try {
        const targetTenant = await Tenant.findById(req.query.id)
            .populate({
                path: 'house',
                populate: {
                    path: 'area_id category'
                }
            })

        const registation = targetTenant.createdAt.getTime()
        const present = new Date().getTime()
        const diff = present - registation
        const months = diff / 1000 / 60 / 60 / 24 / 30
        const totalTargetPayment = Math.floor(months) * targetTenant.house.price

        const totalPaymentList = await Payment.find({ $in: { '_id': targetTenant.payments } })
        let totalPaymentAmount = 0
        totalPaymentList.map(tp => {
            totalPaymentAmount = totalPaymentAmount + tp.amount
        })
        let dues = (totalTargetPayment - totalPaymentAmount)
        
        res.render('pages/hw/tenantView', {
            targetTenant,
            totalMonth: months,
            totalTargetPayment,
            totalPaymentList,
            totalPaymentAmount,
            dues
        })
    } catch (err) {
        next(createError(500))
    }
}
