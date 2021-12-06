const { Category } = require('../../models')

module.exports = () => {
    return async (req, res, next) => {
        try {
            const categories = await Category.find({ status: true })
            res.locals.categories = categories
            next()

        } catch (err) {
            next(err)
        }
    }

}