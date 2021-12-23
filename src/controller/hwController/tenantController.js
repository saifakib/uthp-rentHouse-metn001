const { Tenant, Property, Location, Profile, Category, Area } = require('../../models')
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter')

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
                next(error)
            })

    } catch (e) {
        next(e)
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
        next(err)
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
                                    next(error)
                                })
                        })
                        .catch(error => {
                            next(error)
                        })
                })
                .catch(error => {
                    next(error)
                })
        }

    } catch (err) {
        next(err)
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
        next(err)
    }
}
