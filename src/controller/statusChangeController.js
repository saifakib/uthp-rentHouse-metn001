const { Category, Area, Property } = require('../models')
const createError = require('http-errors')

exports.changeStatus = async (req, res, next) => {
    try {
        const Model = req.query.model == 'Category' ? Category : req.query.model == 'Area' ? Area : Property;
        let changes = await Model.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (changes) {
            const model = (req.query.model).toLowerCase()
            res.redirect(`/${req.user.role}/${model}/list`)
        }
    } catch (err) {
        next(createError(304, err.message))
    }
}