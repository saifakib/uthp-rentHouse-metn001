const { Property, User, Tenant } = require('../models')
const createError = require('http-errors')

exports.singleGetPropertyController = async (req, res, next) => {
    const { post_id } = req.params
    const property = await Property.findOne({ post_id: post_id })
        .populate({
            path: 'homeOwner_id',
            select: 'fullname email mobile' //avatar
        })
        .populate({
            path: 'category',
            select: 'name'
        })
        .populate({
            path: 'area_id',
            select: 'name location_name'
        })
    console.log(property)
    res.render('pages/explorer/singleProperty', {
        property
    })
}
exports.homeController = async (req, res, next) => {
    try {
        const properties = await Property.find({ status: true })
            .populate({
                path: 'category',
                select: 'name'
            })
            .populate({
                path: 'area_id',
                select: 'name location_name'
            })
            .sort('-createdAt')
            .limit(15)

        const users = await User.find()
        const totalproperties = await Property.find()
        const tenants = await Tenant.find()
        res.render('pages/explorer/home', {
            users,
            properties,
            totalproperties,
            tenants
        })
    } catch (err) {
        next(createError(400, err.message))
    }
}

exports.propertyListing = async (req, res, next) => {

    let itemPage = 21
    let skip
    let currentPage = parseInt(req.query.page) || 1
    if (currentPage == 1) {
        skip = 0
    } else {
        skip = (currentPage * itemPage) - itemPage
    }

    try {
        const properties = await Property.find({ status: true })
            .populate({
                path: 'category',
                select: 'name'
            })
            .populate({
                path: 'area_id',
                select: 'name location_name'
            })
            .skip(skip)
            .sort('-createdAt')
            .limit(itemPage)

        res.render('pages/explorer/moreProperty', {
            properties,
            currentPage
        })
    } catch (err) {
        next(createError(400, err.message))
    }
}

exports.searchPropertyListing = (req, res) => {
    res.render('pages/explorer/searchProperty', { title: 'Hey', message: 'Hello there!' })
}

exports.contactGetController = (req, res) => {
    res.render('pages/explorer/contactForm', { title: 'Hey', message: 'Hello there!' })
}

exports.profile = (req, res) => {
    res.render('pages/explorer/profile', { title: 'Hey', message: 'Hello there!' })
}

exports.profileProperty = (req, res) => {
    res.render('pages/explorer/profileProperty', { title: 'Hey', message: 'Hello there!' })
}

exports.termsAndConditionController = (req, res) => {
    res.render('pages/explorer/termsPrivacyPolicy', { title: 'Terms & Condition ' })
}

exports.privacyAndPolicyController = (req, res) => {
    res.render('pages/explorer/termsPrivacyPolicy', { title: 'Privacy Policy' })
}