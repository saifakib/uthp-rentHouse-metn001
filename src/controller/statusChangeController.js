const { Category, Area } = require('../models')

exports.changeStatus = async (req, res, next) => {
    try {
        const Model = req.query.model == 'Category' ? Category : req.query.model == 'Area' ? Area : '';
        let changes = await Model.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (changes) {
            const model = (req.query.model).toLowerCase()
            res.redirect(`/admin/${model}/list`)
        }
    } catch (err) {
        next(err)
    }
}